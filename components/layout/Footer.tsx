import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SITE } from "@/lib/site";
import { TYPE_COLLECTIONS } from "@/lib/catalog";
import { IconPhone, IconMail, IconPin, IconWhatsApp, IconFacebook, IconTruck } from "@/components/Icons";

const QUICK = [
  { label: "Request a Quote", href: "/request-a-quote" },
  { label: "Contact", href: "/contact" },
  { label: "Track Order", href: "/track-order" },
  { label: "About Us", href: "/about" },
  { label: "Safety Data Sheets", href: "/safety-data-sheets" },
  { label: "Pressure-Temp Chart", href: "/pressure-temp-chart" },
];

const POLICIES = [
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Shipping Policy", href: "/policies/shipping-policy" },
  { label: "Refund Policy", href: "/policies/refund-policy" },
  { label: "Terms of Service", href: "/policies/terms-of-service" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-cloud text-slate">
      <div className="border-b border-line bg-mist">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-3.5 text-center text-sm font-semibold text-navy sm:flex-row sm:text-left">
          <span className="flex items-center gap-2">
            <IconTruck width={18} height={18} className="text-cyan" /> Free Shipping on All Orders — Fast FedEx/UPS Delivery, No Hazmat Fees
          </span>
          <a href={SITE.phoneHref} className="flex items-center gap-1.5 hover:text-cyan">
            <IconPhone width={16} height={16} className="text-cyan" /> {SITE.phone}
          </a>
        </div>
      </div>

      <div className="container-px grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-soft">
            EPA-certified refrigerants for HVAC, home AC &amp; automotive. 100% virgin gas (AHRI-700) in
            DOT-approved cylinders, shipped fast from U.S. warehouses with free delivery on every order.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="rounded-full border border-line bg-white p-2.5 text-navy shadow-soft transition-colors hover:border-cyan hover:bg-cyan hover:text-white">
              <IconWhatsApp width={18} height={18} />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full border border-line bg-white p-2.5 text-navy shadow-soft transition-colors hover:border-cyan hover:bg-cyan hover:text-white">
              <IconFacebook width={18} height={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-navy">Quick Access</h3>
          <ul className="space-y-2 text-sm text-slate-soft">
            {QUICK.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-cyan">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-navy">Refrigerants</h3>
          <ul className="space-y-2 text-sm text-slate-soft">
            {TYPE_COLLECTIONS.slice(0, 8).map((c) => (
              <li key={c.slug}><Link href={`/collections/${c.slug}`} className="hover:text-cyan">{c.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-navy">Privacy Pages</h3>
          <ul className="space-y-2 text-sm text-slate-soft">
            {POLICIES.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-cyan">{l.label}</Link></li>
            ))}
          </ul>
          <h3 className="mb-3 mt-6 font-heading text-sm font-bold uppercase tracking-wide text-navy">Contact</h3>
          <ul className="space-y-2 text-sm text-slate-soft">
            <li className="flex items-start gap-2"><IconPin width={16} height={16} className="mt-0.5 flex-shrink-0 text-cyan" />{SITE.address.line1}, {SITE.address.city} {SITE.address.state} {SITE.address.zip}</li>
            <li className="flex items-center gap-2"><IconPhone width={16} height={16} className="text-cyan" /><a href={SITE.phoneHref} className="hover:text-cyan">{SITE.phone}</a></li>
            <li className="flex items-center gap-2"><IconMail width={16} height={16} className="text-cyan" /><a href={`mailto:${SITE.email}`} className="hover:text-cyan">{SITE.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-soft sm:flex-row">
          <p>© {year} Air Refrigerant. All rights reserved.</p>
          <div className="flex items-center gap-2" role="group" aria-label="Accepted payment methods">
            {["VISA", "MC", "AMEX", "PayPal", "Stripe"].map((p) => (
              <span key={p} className="rounded border border-line bg-white px-2 py-1 text-[10px] font-bold tracking-wide text-slate">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
