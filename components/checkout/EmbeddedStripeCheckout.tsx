"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
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
  type CheckoutOrderSummary,
} from "@/lib/checkout";
import { formatPrice } from "@/lib/catalog";
import { IconBox, IconCart, IconLock, IconShield } from "@/components/Icons";

const publishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() || "";
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

interface CheckoutSessionResponse {
  clientSecret: string;
  sessionId: string;
  order: CheckoutOrderSummary;
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

    if (
      !response.ok ||
      !data?.clientSecret ||
      !data?.sessionId ||
      !Array.isArray(data?.order?.items)
    ) {
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
      order: data.order as CheckoutOrderSummary,
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
  order,
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
    <>
      <OrderSummary order={order} />

      <div className="border-b border-line bg-cloud px-5 py-4 sm:px-7">
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-navy">
            <IconLock width={17} height={17} className="text-trust" />
            Payment and shipping details
          </p>
          <span className="hidden items-center gap-1.5 text-xs font-semibold text-trust sm:inline-flex">
            <IconShield width={15} height={15} /> Encrypted by Stripe
          </span>
        </div>
      </div>
      <div className="px-1 py-4 sm:px-4 sm:py-6">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout className="min-h-[520px]" />
        </EmbeddedCheckoutProvider>
      </div>
    </>
  );
}

function OrderSummary({ order }: { order: CheckoutOrderSummary }) {
  return (
    <section aria-labelledby="order-summary-title">
      <div className="flex items-center justify-between gap-4 border-b border-line bg-ice px-5 py-4 sm:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
            <IconBox width={18} height={18} />
          </span>
          <div className="min-w-0">
            <h2
              id="order-summary-title"
              className="font-heading text-base font-bold text-navy sm:text-lg"
            >
              Review your order
            </h2>
            <p className="text-xs text-slate-soft">
              Confirm your products before payment
            </p>
          </div>
        </div>
        <span className="badge flex-shrink-0 bg-white text-navy shadow-ring">
          {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      <ul className="divide-y divide-line px-4 sm:px-7">
        {order.items.map((item) => (
          <li
            key={item.sku}
            className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 py-4 sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:gap-4 sm:py-5"
          >
            <Link
              href={`/products/${item.productSlug}`}
              className="relative h-16 w-16 overflow-hidden rounded-xl border border-line bg-ice sm:h-[72px] sm:w-[72px]"
              aria-label={`View ${item.productName}`}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-contain p-1.5"
                />
              ) : (
                <span className="flex h-full items-center justify-center text-cyan">
                  <IconBox width={24} height={24} />
                </span>
              )}
            </Link>

            <div className="min-w-0 self-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-pill bg-cyan/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan">
                  {item.refrigerantCode}
                </span>
                <span className="text-xs text-slate-soft">
                  {item.variantLabel}
                </span>
              </div>
              <Link
                href={`/products/${item.productSlug}`}
                className="mt-1 line-clamp-2 block text-sm font-semibold leading-5 text-navy hover:text-cyan sm:text-[15px]"
              >
                {item.productName}
              </Link>
              <div className="mt-2 flex items-center justify-between gap-3 sm:justify-start">
                <span className="text-xs text-slate-soft">
                  Qty {item.quantity} × {formatPrice(item.unitPrice, item.currency)}
                </span>
                <strong className="text-sm tabular-nums text-navy sm:hidden">
                  {formatPrice(item.lineTotal, item.currency)}
                </strong>
              </div>
            </div>

            <strong className="hidden self-center whitespace-nowrap text-right text-sm tabular-nums text-navy sm:block">
              {formatPrice(item.lineTotal, item.currency)}
            </strong>
          </li>
        ))}
      </ul>

      <div className="border-t border-line bg-cloud px-5 py-4 sm:px-7">
        <dl className="ml-auto grid max-w-sm gap-2 text-sm">
          <div className="flex items-center justify-between gap-6">
            <dt className="text-slate-soft">Subtotal</dt>
            <dd className="font-semibold tabular-nums text-navy">
              {formatPrice(order.subtotal, order.currency)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-6">
            <dt className="text-slate-soft">Shipping</dt>
            <dd className="font-semibold text-trust">FREE</dd>
          </div>
          <div className="mt-1 flex items-center justify-between gap-6 border-t border-line pt-3">
            <dt className="font-heading text-base font-bold text-navy">Total</dt>
            <dd className="font-heading text-xl font-bold tabular-nums text-navy">
              {formatPrice(order.total, order.currency)}
            </dd>
          </div>
        </dl>
        <p className="mt-4 flex items-start gap-2 border-t border-line pt-3 text-xs leading-5 text-slate-soft">
          <IconShield
            width={15}
            height={15}
            className="mt-0.5 flex-shrink-0 text-trust"
          />
          Product details stay on Air Refrigerant. Stripe receives SKU references only.
        </p>
      </div>
    </section>
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

    stripePromise
      .then((stripe) => {
        if (!active) return;
        if (!stripe) {
          throw new Error(
            "Stripe could not load. Check your publishable key and try again.",
          );
        }
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

    requestCheckoutSession(items)
      .then((session) => {
        if (!active) return;
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
