"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { sortProducts, type SortKey } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "name", label: "Name (A–Z)" },
];

export function CollectionView({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [size, setSize] = useState<"all" | "small" | "bulk">("all");
  const types = useMemo(
    () => Array.from(new Set(products.map((p) => p.refrigerantCode))).sort(),
    [products]
  );
  const [type, setType] = useState<string>("all");

  const visible = useMemo(() => {
    let list = products;
    if (size !== "all") list = list.filter((p) => p.sizeBucket === size);
    if (type !== "all") list = list.filter((p) => p.refrigerantCode === type);
    return sortProducts(list, sort);
  }, [products, size, type, sort]);

  const chip = (active: boolean) =>
    `chip ${active ? "border-navy bg-navy text-white" : "border-line bg-white text-slate hover:border-cyan"}`;

  return (
    <div>
      <div className="mb-6 rounded-card border border-line bg-ice p-3 sm:p-4">
        {/* Count + sort */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-slate-soft">
            {visible.length} product{visible.length === 1 ? "" : "s"}
          </span>
          <div className="flex items-center gap-2">
            <label className="hidden text-sm text-slate-soft sm:block" htmlFor="sort">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-navy outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters — horizontal scroll on mobile, wrap on desktop */}
        <div className="no-scrollbar -mx-3 flex items-center gap-2 overflow-x-auto px-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <span className="flex-shrink-0 pr-0.5 text-xs font-bold uppercase tracking-wide text-slate-soft">Size</span>
          <button className={chip(size === "all")} onClick={() => setSize("all")}>All</button>
          <button className={chip(size === "small")} onClick={() => setSize("small")}>Small cans</button>
          <button className={chip(size === "bulk")} onClick={() => setSize("bulk")}>Bulk cylinders</button>
          {types.length > 1 && (
            <>
              <span className="flex-shrink-0 pl-2 pr-0.5 text-xs font-bold uppercase tracking-wide text-slate-soft">Type</span>
              <button className={chip(type === "all")} onClick={() => setType("all")}>All</button>
              {types.map((t) => (
                <button key={t} className={chip(type === t)} onClick={() => setType(t)}>
                  {t}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-card border border-line bg-white p-10 text-center text-slate-soft">
          No products match these filters yet. Try clearing a filter or{" "}
          <a href="/request-a-quote" className="font-semibold text-cyan hover:underline">
            request a quote
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
