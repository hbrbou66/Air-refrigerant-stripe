import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SITE, GUARANTEES } from "@/lib/site";
import { IconCheck, IconPin, IconTruck, IconStack, IconLock, IconHeadset } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About Us",
  description: "Air Refrigerant is an EPA-certified refrigerant & Freon wholesale supplier with U.S. warehouses and factory-direct supply.",
  alternates: { canonical: "/about" },
};

const ICONS = { truck: IconTruck, stack: IconStack, lock: IconLock, headset: IconHeadset } as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="EPA-Certified Refrigerant Supply, Built for HVAC Pros"
        description="Air Refrigerant is a bulk wholesale distributor of 100% virgin, factory-sealed refrigerants — shipped fast and free from U.S. warehouses."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="container-px py-12">
        <div className="prose-brand max-w-3xl">
          <p>
            Air Refrigerant supplies genuine, EPA-compliant refrigerants to the professionals who keep America
            cool — from homeowners servicing a legacy AC unit to contractors and industrial buyers ordering by
            the pallet. Every cylinder is 100% virgin gas, certified to AHRI-700 purity standards and sealed at
            the factory in DOT-approved steel.
          </p>
          <p>
            We keep deep inventory in EPA-certified U.S. warehouses for immediate dispatch, and we ship free via
            FedEx/UPS with no hazmat fees. Because we buy factory-direct — eliminating multiple layers of
            distributors — we pass wholesale pricing straight to you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-card border border-line/70 bg-mist-soft p-7">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <h2 className="font-heading text-xl font-bold text-navy">Our U.S. Warehouses</h2>
              <ul className="mt-4 space-y-3 text-slate">
                {SITE.warehouses.map((w) => (
                  <li key={w} className="flex items-center gap-2.5">
                    <IconPin width={18} height={18} className="text-cyan" /> {w}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-soft">100% virgin refrigerant, ready for same-stock dispatch.</p>
            </div>
          </div>
          <div className="rounded-card border border-line bg-white p-7 shadow-card">
            <h2 className="font-heading text-xl font-bold text-navy">Factory-Direct Partner</h2>
            <p className="mt-3 text-slate-soft">
              Our manufacturing partner operates a 4,000㎡ BSCI-certified facility with 100+ employees, 40
              automated production lines, and 20,000-ton annual capacity — the backbone of our genuine-product
              guarantee and consistent supply.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[{n:"4,000㎡",l:"Facility"},{n:"40",l:"Lines"},{n:"20k-ton",l:"Capacity"}].map((s)=>(
                <div key={s.l} className="rounded-lg bg-ice/70 p-3">
                  <p className="font-heading font-bold text-navy">{s.n}</p>
                  <p className="text-xs text-slate-soft">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-navy">Why HVAC pros choose us</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map((g) => (
              <FeatureCard
                key={g.title}
                icon={ICONS[g.icon as keyof typeof ICONS]}
                title={g.title}
                body={g.body}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-12 flex flex-col items-center gap-4 overflow-hidden rounded-xl2 border border-line/70 bg-mist-soft px-6 py-12 text-center">
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-amber/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col items-center gap-4">
            <p className="flex items-center gap-2 font-semibold text-trust"><IconCheck width={18} height={18} /> {SITE.social}</p>
            <h2 className="text-h2 text-navy">Ready to stock up?</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/collections/all" className="btn-amber">Shop All Refrigerants</Link>
              <Link href="/request-a-quote" className="btn-outline">Request a Bulk Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
