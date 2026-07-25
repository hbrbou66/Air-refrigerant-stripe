import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { TYPE_COLLECTIONS, APPLICATION_COLLECTIONS, BULK_OPTIONS, filterByCollection } from "@/lib/catalog";
import { SITE, HERO_BULLETS, GUARANTEES } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { TrustStrip } from "@/components/TrustStrip";
import { SectionHeading, Stars } from "@/components/ui/Section";
import { IconBadge } from "@/components/ui/IconBadge";
import { FeatureCard } from "@/components/ui/FeatureCard";
import {
  IconCheck, IconTruck, IconStack, IconLock, IconHeadset, IconPin, IconBolt, IconCylinder, IconBox, IconShield,
} from "@/components/Icons";

const GUARANTEE_ICONS = { truck: IconTruck, stack: IconStack, lock: IconLock, headset: IconHeadset } as const;

export default async function HomePage() {
  const products = await getAllProducts();
  const smallCans = filterByCollection(products, "small-cylinders").slice(0, 4);
  const bestSellers = products.slice(0, 8);

  return (
    <>
      {/* HERO — light & airy */}
      <section className="relative overflow-hidden bg-hero-light">
        {/* Soft decorative glows on the light backdrop */}
        <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-24 h-[22rem] w-[22rem] rounded-full bg-amber/10 blur-3xl" aria-hidden="true" />
        <div className="container-px relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-fade-up">
            <span className="badge border border-cyan/20 bg-cyan/10 text-cyan-hover">
              <IconShield width={13} height={13} /> EPA-Certified Refrigerant Distributor
            </span>
            <h1 className="mt-5 text-display text-balance text-navy">
              Refrigerant &amp; Freon, Shipped Free — Bulk Wholesale Prices
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
              100% virgin gas in factory-sealed cylinders, dispatched fast from U.S. warehouses.
              R-22, R-410A, R-404A, R-32, R-454B &amp; more — no hazmat fees, ever.
            </p>

            <ul className="mt-7 grid max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
              {HERO_BULLETS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm font-semibold text-navy">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-trust text-white">
                    <IconCheck width={13} height={13} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/collections/all" className="btn-amber text-base">
                Shop All Refrigerants
              </Link>
              <Link href="/request-a-quote" className="btn-outline text-base">
                Request a Bulk Quote
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-slate">
              <Stars size={15} />
              <span className="font-semibold text-navy">4.9/5</span>
              <span aria-hidden="true" className="text-slate-soft">·</span>
              <span>{SITE.social}</span>
            </div>
          </div>

          {/* Product cards — clean white tiles */}
          <div className="relative animate-fade-up">
            <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
              {["R-410A", "R-22", "R-32", "R-134A"].map((code, i) => (
                <div
                  key={code}
                  className={`rounded-card border border-line/70 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    i % 2 ? "sm:mt-8" : ""
                  }`}
                >
                  <IconBadge icon={IconCylinder} size="md" tone="cyan" />
                  <p className="mt-4 font-heading text-2xl font-bold text-navy">{code}</p>
                  <p className="text-sm text-slate-soft">Virgin · AHRI-700</p>
                  <p className="mt-3 inline-flex items-center gap-1 rounded-pill bg-trust-soft px-2.5 py-1 text-xs font-semibold text-trust">
                    <IconTruck width={12} height={12} /> Free shipping
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* GUARANTEES */}
      <section className="container-px section">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((g) => (
            <FeatureCard
              key={g.title}
              icon={GUARANTEE_ICONS[g.icon as keyof typeof GUARANTEE_ICONS]}
              title={g.title}
              body={g.body}
              iconSize="lg"
              hover
            />
          ))}
        </div>
      </section>

      {/* SMALL CANS */}
      <section className="container-px section-tight">
        <SectionHeading
          eyebrow="Easy to use"
          title="Small Cans for On-Site Service"
          description="2.5–10 lb cylinders for quick recharges and top-ups."
          cta={{ label: "Shop small cylinders", href: "/collections/small-cylinders" }}
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {smallCans.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* BULK OPTIONS */}
      <section className="container-px section">
        <SectionHeading
          eyebrow="Wholesale"
          title="Shop by Bulk Options"
          description="Direct-factory supply with wholesale pricing on cylinder packs."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BULK_OPTIONS.map((b) => (
            <Link
              key={b.qty}
              href="/collections/bulk-cylinders"
              className="card-hover group flex flex-col items-center p-6 text-center"
            >
              <IconBadge icon={IconBox} size="lg" />
              <span className="mt-3 font-heading text-2xl font-bold text-navy">{b.qty}</span>
              <span className="text-sm font-semibold text-slate-soft">Cylinders</span>
              <span className="mt-2 text-xs font-semibold text-amber-ink group-hover:underline">Bulk pricing →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* TYPE GRID */}
      <section className="border-y border-line bg-ice section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Find your gas"
            title="Shop by Refrigerant Type"
            cta={{ label: "View all", href: "/collections/all" }}
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {TYPE_COLLECTIONS.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group flex flex-col items-center justify-center rounded-card border border-line bg-white px-3 py-7 text-center shadow-card transition-all hover:-translate-y-0.5 hover:border-cyan hover:shadow-lift"
              >
                <span className="font-heading text-xl font-bold text-navy group-hover:text-cyan">
                  {c.title.split(" ")[0]}
                </span>
                <span className="mt-1 text-xs text-slate-soft">Refrigerant</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION GRID */}
      <section className="container-px section">
        <SectionHeading
          eyebrow="By use case"
          title="Shop by Application"
          description="Available in bulk cylinders and small cans for on-site service."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {APPLICATION_COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="card-hover group flex flex-col p-6"
            >
              <IconBadge icon={IconBolt} size="md" tone="cyan" />
              <h3 className="mt-4 font-heading text-lg font-bold text-navy">{c.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-soft line-clamp-3">{c.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-amber-ink group-hover:underline">
                Shop now →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container-px section-tight">
        <SectionHeading
          eyebrow="Top rated"
          title="Best Sellers"
          cta={{ label: "Shop all refrigerants", href: "/collections/all" }}
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* WAREHOUSES */}
      <section className="container-px section">
        <div className="relative grid items-center gap-10 overflow-hidden rounded-xl2 border border-line/70 bg-mist-soft px-6 py-12 sm:px-10 lg:grid-cols-2">
          <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow">
              <span className="h-px w-6 bg-cyan/50" aria-hidden="true" />
              U.S. stock, ready to ship
            </p>
            <h2 className="mt-3 text-h2 text-balance text-navy">
              EPA-Certified Warehouses, Factory-Direct Supply
            </h2>
            <p className="mt-4 leading-relaxed text-slate">
              We hold 100% virgin refrigerant in U.S. warehouses for immediate dispatch — backed by a 4,000㎡
              BSCI-certified factory partner running 40 automated lines with 100+ employees and 20,000-ton annual capacity.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {SITE.warehouses.map((w) => (
                <span key={w} className="flex items-center gap-1.5 rounded-pill border border-line bg-white px-3.5 py-2 text-sm font-semibold text-navy shadow-soft">
                  <IconPin width={16} height={16} className="text-cyan" /> {w}
                </span>
              ))}
            </div>
            <Link href="/about" className="btn-amber mt-7">
              Learn about us
            </Link>
          </div>
          <div className="relative grid grid-cols-3 gap-4 text-center">
            {[
              { n: "99.9%+", l: "Purity (AHRI-700)" },
              { n: "1,200+", l: "HVAC pros served" },
              { n: "20k-ton", l: "Annual capacity" },
              { n: "Free", l: "FedEx/UPS shipping" },
              { n: "$0", l: "Hazmat fees" },
              { n: "24/7", l: "Support" },
            ].map((s) => (
              <div key={s.l} className="rounded-card border border-line/70 bg-white p-4 shadow-soft">
                <p className="font-heading text-xl font-bold text-cyan-hover">{s.n}</p>
                <p className="mt-1 text-xs text-slate-soft">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-line bg-ice section">
        <div className="container-px">
          <SectionHeading
            center
            eyebrow="Reviews"
            title="Trusted by HVAC Professionals"
            description="Real feedback from homeowners, contractors, and industrial buyers."
          />
          <Testimonials />
        </div>
      </section>

      <Newsletter />
    </>
  );
}
