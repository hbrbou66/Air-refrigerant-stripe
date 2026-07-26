"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  CHECKOUT_STORAGE_KEY,
  type CheckoutItem,
} from "@/lib/checkout";
import { IconCart, IconLock } from "@/components/Icons";

const publishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() || "";
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

interface CheckoutSessionResponse {
  clientSecret: string;
  sessionId: string;
}

interface CheckoutRequest {
  fingerprint: string;
  promise: Promise<CheckoutSessionResponse>;
}

let activeCheckoutRequest: CheckoutRequest | null = null;

function parseCheckoutItems(raw: string | null): CheckoutItem[] {
  if (!raw) return [];

  try {
    const value = JSON.parse(raw);
    if (!Array.isArray(value)) return [];

    return value.flatMap((item): CheckoutItem[] => {
      if (!item || typeof item !== "object") return [];
      const record = item as Record<string, unknown>;
      if (
        typeof record.variantId !== "string" ||
        typeof record.quantity !== "number" ||
        !Number.isInteger(record.quantity) ||
        record.quantity < 1
      ) {
        return [];
      }
      return [{ variantId: record.variantId, quantity: record.quantity }];
    });
  } catch {
    return [];
  }
}

async function requestCheckoutSession(
  items: CheckoutItem[],
): Promise<CheckoutSessionResponse> {
  const fingerprint = JSON.stringify(items);

  if (
    activeCheckoutRequest &&
    activeCheckoutRequest.fingerprint === fingerprint
  ) {
    return activeCheckoutRequest.promise;
  }

  const promise = fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  }).then(async (response) => {
    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.clientSecret || !data?.sessionId) {
      if (data?.error === "stripe_not_configured") {
        throw new Error(
          "Stripe checkout is not configured. Add STRIPE_SECRET_KEY in Vercel, then redeploy.",
        );
      }
      if (data?.error === "invalid_cart") {
        throw new Error(
          "One or more cart items are no longer available. Return to your cart and try again.",
        );
      }
      throw new Error(
        "Secure checkout is temporarily unavailable. Please try again.",
      );
    }

    return {
      clientSecret: data.clientSecret as string,
      sessionId: data.sessionId as string,
    };
  });

  activeCheckoutRequest = { fingerprint, promise };
  return promise;
}

function CheckoutLoader() {
  return (
    <div
      className="flex min-h-[520px] flex-col items-center justify-center px-6 text-center"
      role="status"
      aria-live="polite"
    >
      <span className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-cyan/10 text-cyan">
        <IconLock width={22} height={22} />
      </span>
      <p className="mt-4 font-heading text-lg font-bold text-navy">
        Loading secure payment
      </p>
      <p className="mt-1 text-sm text-slate-soft">
        Stripe is preparing your encrypted checkout form.
      </p>
    </div>
  );
}

function CheckoutError({
  message,
  retryable,
  onRetry,
}: {
  message: string;
  retryable: boolean;
  onRetry: () => void;
}) {
  return (
    <div
      className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center"
      role="alert"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber/15 text-amber-ink">
        <IconLock width={22} height={22} />
      </span>
      <h2 className="mt-4 font-heading text-xl font-bold text-navy">
        Checkout needs attention
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-soft">
        {message}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {retryable && (
          <button type="button" onClick={onRetry} className="btn-navy">
            Try again
          </button>
        )}
        <Link href="/cart" className="btn-outline">
          <IconCart width={17} height={17} />
          Return to cart
        </Link>
      </div>
    </div>
  );
}

function CheckoutFrame({
  clientSecret,
  sessionId,
}: CheckoutSessionResponse) {
  const router = useRouter();
  const handleComplete = useCallback(() => {
    activeCheckoutRequest = null;
    sessionStorage.removeItem(CHECKOUT_STORAGE_KEY);
    router.replace(
      `/checkout/success?session_id=${encodeURIComponent(sessionId)}`,
    );
  }, [router, sessionId]);
  const options = useMemo(
    () => ({ clientSecret, onComplete: handleComplete }),
    [clientSecret, handleComplete],
  );

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout className="min-h-[520px]" />
    </EmbeddedCheckoutProvider>
  );
}

export function EmbeddedStripeCheckout() {
  const [checkoutSession, setCheckoutSession] =
    useState<CheckoutSessionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryable, setRetryable] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    if (!publishableKey || !stripePromise) {
      setError(
        "Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in Vercel, then redeploy the site.",
      );
      return () => {
        active = false;
      };
    }

    const items = parseCheckoutItems(
      sessionStorage.getItem(CHECKOUT_STORAGE_KEY),
    );

    if (!items.length) {
      setError("Your checkout is empty. Add a product before continuing.");
      return () => {
        active = false;
      };
    }

    setError(null);
    setRetryable(false);
    setCheckoutSession(null);

    Promise.all([stripePromise, requestCheckoutSession(items)])
      .then(([stripe, session]) => {
        if (!active) return;
        if (!stripe) {
          throw new Error(
            "Stripe could not load. Check your publishable key and try again.",
          );
        }
        setCheckoutSession(session);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setRetryable(true);
        setError(
          reason instanceof Error
            ? reason.message
            : "Secure checkout is temporarily unavailable. Please try again.",
        );
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    activeCheckoutRequest = null;
    setAttempt((value) => value + 1);
  }, []);

  if (error) {
    return (
      <CheckoutError
        message={error}
        retryable={retryable}
        onRetry={retry}
      />
    );
  }

  if (!checkoutSession) return <CheckoutLoader />;

  return <CheckoutFrame {...checkoutSession} />;
}
