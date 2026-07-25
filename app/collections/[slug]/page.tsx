import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import {
  findCollection, filterByCollection, allCollections, BULK_OPTIONS,
} from "@/lib/catalog";
import { CollectionView } from "@/components/CollectionView";
import { PageHero } from "@/components/ui/PageHero";
import { EpaNotice } from "@/components/EpaNotice";
import Link from "next/link";

export const dynamicParams = true;

export function generateStaticParams() {
  return allCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = findCollection(slug);
  if (!c) return { title: "Collection" };
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/collections/${c.slug}` },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = findCollection(slug);
  if (!collection) notFound();

  const all = await getAllProducts();
  const products = filterByCollection(all, slug);

  const crumbs = [{ label: "Collections", href: "/collections/all" }, { label: collection.title }];

  return (
    <>
      <PageHero title={collection.title} description={collection.description} breadcrumbs={crumbs} />
      <div className="container-px py-10">
        {collection.slug === "bulk-cylinders" && (
          <div className="mb-6 flex flex-wrap gap-2">
            {BULK_OPTIONS.map((b) => (
              <span key={b.qty} className="badge bg-ice text-navy">{b.label}</span>
            ))}
            <span className="badge bg-amber/15 text-amber-ink">Wholesale · Direct Factory Supply</span>
          </div>
        )}
        <CollectionView products={products} />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><EpaNotice /></div>
          <Link href="/request-a-quote" className="flex flex-col justify-center rounded-card bg-navy p-5 text-white">
            <span className="font-heading text-lg font-bold">Need a bulk quote?</span>
            <span className="mt-1 text-sm text-white/75">Volume pricing on 5–40 cylinder packs, shipped free.</span>
            <span className="mt-3 text-sm font-semibold text-amber">Request a quote →</span>
          </Link>
        </div>
      </div>
    </>
  );
}
