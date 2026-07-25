import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { PageHero } from "@/components/ui/PageHero";
import Link from "next/link";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: query } = await searchParams;
  const q = (query || "").trim();
  const all = await getAllProducts();
  const results = q
    ? all.filter((p) => {
        const hay = `${p.name} ${p.refrigerantCode} ${p.description} ${p.applications.join(" ")}`.toLowerCase();
        return q.toLowerCase().split(/\s+/).every((t) => hay.includes(t));
      })
    : [];

  return (
    <>
      <PageHero
        title={q ? `Search: “${q}”` : "Search"}
        description={q ? `${results.length} result${results.length === 1 ? "" : "s"} found` : "Search our full range of refrigerants."}
        breadcrumbs={[{ label: "Search" }]}
      />
      <div className="container-px py-10">
        {q && results.length === 0 ? (
          <p className="rounded-card border border-line bg-white p-10 text-center text-slate-soft">
            No products matched “{q}”. Browse{" "}
            <Link href="/collections/all" className="font-semibold text-cyan hover:underline">all refrigerants</Link> or{" "}
            <Link href="/request-a-quote" className="font-semibold text-cyan hover:underline">request a quote</Link>.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
