import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { SNAPSHOT_PRODUCTS } from "@/lib/snapshot";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { EpaNotice } from "@/components/EpaNotice";
import { OfferBanner } from "@/components/OfferBanner";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { SITE } from "@/lib/site";
import { IconDoc, IconChart } from "@/components/Icons";

export const dynamicParams = true;

export function generateStaticParams() {
  return SNAPSHOT_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.images[0] ? [product.images[0]] : undefined,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all
    .filter((p) => p.slug !== product.slug && (p.refrigerantCode === product.refrigerantCode || p.applications.some((a) => product.applications.includes(a))))
    .slice(0, 4);

  const inStock = product.variants.some((v) => v.available !== false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.variants[0]?.sku,
    brand: { "@type": "Brand", name: SITE.name },
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      price: v.price,
      priceCurrency: v.currency,
      availability: v.available === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: `${SITE.url}/products/${product.slug}`,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "USD" },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="border-b border-line bg-ice">
        <div className="container-px py-3.5">
          <Breadcrumbs
            items={[
              { label: "All Refrigerants", href: "/collections/all" },
              { label: product.refrigerantCode, href: `/collections/${product.refrigerantCode.toLowerCase()}` },
              { label: product.name.length > 32 ? product.name.slice(0, 32) + "…" : product.name },
            ]}
          />
        </div>
      </div>

      {/* Top: gallery + purchase */}
      <section className="container-px grid gap-10 py-12 lg:grid-cols-2">
        <ProductGallery product={product} />

        <div className="min-w-0">
          <p className="eyebrow">
            <span className="h-px w-6 bg-cyan/50" aria-hidden="true" />
            {product.refrigerantCode} Refrigerant
          </p>
          <h1 className="mt-2 font-heading text-2xl font-bold leading-tight text-navy break-words text-balance sm:text-3xl">
            {product.name}
          </h1>
          <div className="mt-6">
            <ProductPurchase product={product} />
          </div>
          <OfferBanner className="mt-6" />
        </div>
      </section>

      {/* Overview + At a glance */}
      <section className="container-px grid gap-12 pb-16 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <h2 className="text-h2 text-navy">Overview</h2>
          <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-soft">{product.description}</p>

          <div className="mt-8">
            <EpaNotice />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href="/safety-data-sheets" className="flex items-center gap-3 rounded-card border border-line bg-white p-4 shadow-card transition-colors hover:border-cyan">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan/10 text-cyan"><IconDoc width={20} height={20} /></span>
              <span className="text-sm font-semibold text-navy">Download Safety Data Sheet (SDS)</span>
            </Link>
            <Link href="/pressure-temp-chart" className="flex items-center gap-3 rounded-card border border-line bg-white p-4 shadow-card transition-colors hover:border-cyan">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan/10 text-cyan"><IconChart width={20} height={20} /></span>
              <span className="text-sm font-semibold text-navy">Pressure–Temperature Chart</span>
            </Link>
          </div>
        </div>

        <aside>
          <div className="sticky top-24 rounded-card border border-line bg-ice p-6">
            <h2 className="font-heading text-xl font-bold text-navy">At a glance</h2>
            <dl className="mt-4 divide-y divide-line text-sm">
              <SpecRow label="Refrigerant" value={product.refrigerantCode} />
              <SpecRow label="Net weight" value={`${product.sizeLb} lb`} />
              <SpecRow label="Purity" value="99.9%+ (AHRI-700 virgin)" />
              <SpecRow label="Cylinder" value="DOT-approved steel" />
              {product.blendNote && <SpecRow label="Composition" value={product.blendNote} />}
              {product.gwp && <SpecRow label="GWP" value={product.gwp} />}
              <SpecRow label="Availability" value={inStock ? "In stock" : "Sold out"} />
              <SpecRow label="Shipping" value="Free FedEx/UPS" />
            </dl>
            <Link href="/request-a-quote" className="btn-outline mt-6 w-full">
              Request a bulk quote
            </Link>
          </div>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-ice section-tight">
          <div className="container-px">
            <h2 className="text-h2 text-navy">Related Refrigerants</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spacer so the sticky mobile buy bar never covers the footer */}
      <div aria-hidden className="h-24 lg:hidden" />
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5">
      <dt className="text-slate-soft">{label}</dt>
      <dd className="text-right font-semibold text-navy">{value}</dd>
    </div>
  );
}
