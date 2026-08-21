"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CHECKOUT_STORAGE_KEY, type CheckoutItem } from "@/lib/checkout";
import { IconCart, IconLock, IconShield } from "@/components/Icons";

interface CheckoutSessionResponse {
  url: string;
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

    if (!response.ok || typeof data?.url !== "string" || !data?.sessionId) {
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
      url: data.url as string,
      sessionId: data.sessionId as string,
    };
  });

  activeCheckoutRequest = { fingerprint, promise };
  return promise;
}

function CheckoutLoader() {
  return (
    <div
      className="flex min-h-[380px] flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[440px] sm:px-10"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-cyan/10 text-cyan">
        <span className="absolute inset-0 animate-ping rounded-full bg-cyan/10" />
        <IconLock width={27} height={27} className="relative" />
      </span>
      <p className="mt-6 font-heading text-xl font-bold text-navy sm:text-2xl">
        Opening Stripe Checkout
      </p>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-soft sm:text-base">
        Your products, quantities, shipping details, and total will appear on
        Stripe&apos;s secure payment page.
      </p>
      <div className="mt-6 flex items-center gap-2 rounded-pill border border-trust/20 bg-trust-soft px-4 py-2 text-xs font-semibold text-trust">
        <IconShield width={16} height={16} />
        Secure redirect in progress
      </div>
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
      className="flex min-h-[380px] flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[440px] sm:px-10"
      role="alert"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber/15 text-amber-ink">
        <IconLock width={24} height={24} />
      </span>
      <h2 className="mt-5 font-heading text-xl font-bold text-navy">
        Checkout needs attention
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-soft">
        {message}
      </p>
      <div className="mt-6 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
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

export function StripeCheckoutRedirect() {
  const [error, setError] = useState<string | null>(null);
  const [retryable, setRetryable] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
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

    requestCheckoutSession(items)
      .then((session) => {
        if (!active) return;
        window.location.assign(session.url);
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

  return <CheckoutLoader />;
}
