import type { Metadata } from "next";
import Link from "next/link";
import {
  checkoutShippingAddress,
  isStripeConfigured,
  retrieveCheckoutSession,
} from "@/lib/stripe";
import { formatPrice } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { ClearCartAfterCheckout } from "@/components/cart/ClearCartAfterCheckout";
import { MetaPurchaseTracker } from "@/components/MetaPurchaseTracker";
import { IconCheck, IconMail, IconTruck } from "@/components/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order Confirmation",
  robots: { index: false, follow: false },
};

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(timestamp * 1000));
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const sessionId = session_id?.trim() || "";
  const session =
    isStripeConfigured() && sessionId
      ? await retrieveCheckoutSession(sessionId)
      : null;

  if (!session) {
    return (
      <div className="container-px py-16">
        <div className="mx-auto max-w-2xl rounded-card border border-line bg-white p-8 text-center shadow-card">
          <h1 className="font-heading text-3xl font-bold text-navy">
            We couldn&apos;t load this confirmation
          </h1>
          <p className="mt-3 text-slate-soft">
            Use the link in your Stripe receipt, or contact us and we&apos;ll
            locate the payment.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/collections/all" className="btn-navy">
              Continue shopping
            </Link>
            <a href={`mailto:${SITE.email}`} className="btn-outline">
              Contact support
            </a>
          </div>
        </div>
      </div>
    );
  }

  const paid =
    session.payment_status === "paid" ||
    session.payment_status === "no_payment_required";
  const address = checkoutShippingAddress(session);
  const email = session.customer_details?.email;

  return (
    <div className="container-px py-16">
      {paid && <ClearCartAfterCheckout />}
      {paid && session.amount_total != null && session.currency && (
        <MetaPurchaseTracker
          sessionId={session.id}
          value={session.amount_total / 100}
          currency={session.currency}
        />
      )}
      <div className="mx-auto max-w-3xl overflow-hidden rounded-card border border-line bg-white shadow-card">
        <div className="bg-navy px-6 py-10 text-center text-white sm:px-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-trust text-white">
            <IconCheck width={30} height={30} />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-cyan-soft">
            {paid ? "Payment confirmed" : "Payment processing"}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold">
            {paid ? "Thank you for your order" : "We’re confirming your payment"}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            {paid
              ? "Your refrigerant order is in. We’ll email shipping and certification-verification updates."
              : "Your order will be prepared as soon as Stripe confirms the payment."}
          </p>
        </div>

        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="font-heading text-lg font-bold text-navy">
              Order details
            </h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="text-slate-soft">Stripe checkout reference</dt>
                <dd className="mt-1 break-all rounded-lg bg-ice px-3 py-2 font-mono text-xs font-semibold text-navy">
                  {session.id}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-soft">Placed</dt>
                <dd className="text-right font-semibold text-navy">
                  {formatDate(session.created)}
                </dd>
              </div>
              {session.amount_total != null && session.currency && (
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-soft">Total</dt>
                  <dd className="font-semibold text-navy">
                    {formatPrice(
                      session.amount_total / 100,
                      session.currency.toUpperCase(),
                    )}
                  </dd>
                </div>
              )}
              {(address?.city || address?.state) && (
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-soft">Shipping to</dt>
                  <dd className="text-right font-semibold text-navy">
                    {[address.city, address.state].filter(Boolean).join(", ")}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <aside className="rounded-card bg-ice p-5">
            <h2 className="font-heading text-lg font-bold text-navy">
              What happens next
            </h2>
            <ul className="mt-4 grid gap-4 text-sm text-slate">
              <li className="flex gap-3">
                <IconMail
                  width={18}
                  height={18}
                  className="mt-0.5 flex-shrink-0 text-cyan"
                />
                <span>
                  Your checkout email is
                  {email ? (
                    <>
                      {" "}
                      to <strong className="text-navy">{email}</strong>
                    </>
                  ) : null}
                  . Enable Stripe receipt emails in the Stripe Dashboard if you want an automatic receipt.
                </span>
              </li>
              <li className="flex gap-3">
                <IconTruck
                  width={18}
                  height={18}
                  className="mt-0.5 flex-shrink-0 text-cyan"
                />
                <span>
                  We prepare the order and email tracking after dispatch.
                </span>
              </li>
            </ul>
            <Link href="/track-order" className="btn-navy mt-6 w-full">
              Track this order
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
