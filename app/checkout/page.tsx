import type { Metadata } from "next";
import Link from "next/link";
import { EmbeddedStripeCheckout } from "@/components/checkout/EmbeddedStripeCheckout";
import {
  IconCheck,
  IconHeadset,
  IconLock,
  IconShield,
  IconTruck,
} from "@/components/Icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description: "Complete your Air Refrigerant order securely with Stripe.",
  robots: { index: false, follow: false },
};

const checkoutBenefits = [
  {
    icon: IconLock,
    title: "Secure on-site payment",
    body: "Card details are encrypted and handled directly by Stripe.",
  },
  {
    icon: IconTruck,
    title: "Free U.S. delivery",
    body: "FedEx or UPS shipping is included on every order.",
  },
  {
    icon: IconShield,
    title: "EPA-aware fulfillment",
    body: "We may request Section 608 verification before shipment.",
  },
] as const;

export default function CheckoutPage() {
  return (
    <div className="bg-mist-soft py-8 sm:py-12 lg:py-16">
      <div className="container-px">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/cart"
              className="text-sm font-semibold text-cyan hover:text-cyan-hover"
            >
              ← Return to cart
            </Link>
            <h1 className="mt-3 font-heading text-3xl font-bold text-navy sm:text-4xl">
              Secure checkout
            </h1>
            <p className="mt-2 max-w-2xl text-slate-soft">
              Complete your order without leaving Air Refrigerant.
            </p>
          </div>
          <span className="badge border border-trust/20 bg-trust-soft text-trust">
            <IconCheck width={15} height={15} />
            Stripe protected
          </span>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-8">
          <section
            className="min-w-0 overflow-hidden rounded-card border border-line bg-white shadow-card"
            aria-label="Payment and shipping details"
          >
            <div className="border-b border-line bg-cloud px-5 py-4 sm:px-7">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                <IconLock width={17} height={17} className="text-trust" />
                Payment and shipping details
              </p>
            </div>
            <div className="px-1 py-4 sm:px-4 sm:py-6">
              <EmbeddedStripeCheckout />
            </div>
          </section>

          <aside className="grid gap-5 lg:sticky lg:top-28">
            <div className="rounded-card bg-navy p-6 text-white shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-soft">
                Protected checkout
              </p>
              <h2 className="mt-2 font-heading text-xl font-bold text-white">
                Your details stay private
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Stripe securely processes payment information inside the form.
                Air Refrigerant never stores your full card number.
              </p>
            </div>

            <div className="rounded-card border border-line bg-white p-5 shadow-card">
              <h2 className="font-heading text-lg font-bold text-navy">
                Order assurances
              </h2>
              <ul className="mt-5 grid gap-5">
                {checkoutBenefits.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-3">
                    <span className="icon-badge-sm">
                      <Icon width={19} height={19} />
                    </span>
                    <span>
                      <strong className="block text-sm text-navy">
                        {title}
                      </strong>
                      <span className="mt-0.5 block text-xs leading-5 text-slate-soft">
                        {body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-line bg-ice p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                <IconHeadset width={18} height={18} className="text-cyan" />
                Need checkout help?
              </p>
              <a
                href={SITE.phoneHref}
                className="mt-2 block text-sm font-bold text-cyan hover:text-cyan-hover"
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 block break-all text-xs text-slate-soft hover:text-navy"
              >
                {SITE.email}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
