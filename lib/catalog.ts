import type { Collection, Product } from "./types";

// ---------------------------------------------------------------------------
// Collection definitions + classification helpers. Collections are derived
// from bundled product attributes.
// ---------------------------------------------------------------------------

export const REFRIGERANT_TYPES = [
  "R22", "R410A", "R404A", "R32", "R454B", "R407C", "R407A", "R134A", "R438A", "R422D", "R507",
];

export const TYPE_COLLECTIONS: Collection[] = REFRIGERANT_TYPES.map((code) => ({
  slug: code.toLowerCase(),
  title: `${code} Refrigerant`,
  kind: "type",
  description: `Shop ${code} refrigerant — 100% virgin, AHRI-700 certified, factory-sealed in DOT-approved cylinders. Free FedEx/UPS delivery, no hazmat fees.`,
}));

export const SIZE_COLLECTIONS: Collection[] = [
  {
    slug: "small-cylinders",
    title: "Small Cylinders (2.5–10 lb)",
    kind: "size",
    description: "Compact 2.5–10 lb cans for on-site service, top-ups, and quick recharges. Ideal for residential and light commercial jobs.",
  },
  {
    slug: "bulk-cylinders",
    title: "Bulk Cylinders (20–30 lb)",
    kind: "size",
    description: "Full-size 20–30 lb cylinders for complete system charges, large jobs, and wholesale stock. Best per-pound value with factory-direct pricing.",
  },
];

export const APPLICATION_COLLECTIONS: Collection[] = [
  { slug: "legacy-hvac", title: "Legacy HVAC", kind: "application", description: "R22 and compatible refrigerants for servicing older HVAC systems built before the EPA phaseout." },
  { slug: "residential-ac", title: "Residential AC", kind: "application", description: "R410A, R32, and R454B for modern home air conditioners and heat pumps." },
  { slug: "commercial-refrigeration", title: "Commercial Refrigeration", kind: "application", description: "R404A, R407A, R507, and R134A for supermarket cases, walk-ins, and cold-chain systems." },
  { slug: "r22-replacements", title: "R22 Replacements", kind: "application", description: "Drop-in and retrofit blends — R438A (MO99), R422D, R407C, R407A — for converting R22 systems." },
  { slug: "auto-ac", title: "Auto AC", kind: "application", description: "R134A for automotive air conditioning recharge and repair." },
];

export const BULK_OPTIONS = [
  { qty: 5, label: "5 Cylinders" },
  { qty: 10, label: "10 Cylinders" },
  { qty: 20, label: "20 Cylinders" },
  { qty: 30, label: "30 Cylinders" },
  { qty: 40, label: "40 Cylinders" },
];

export function allCollections(): Collection[] {
  return [
    { slug: "all", title: "All Refrigerants", kind: "all", description: "Our full range of EPA-compliant, 100% virgin refrigerants — every type and size, with free shipping on all orders." },
    ...TYPE_COLLECTIONS,
    ...SIZE_COLLECTIONS,
    ...APPLICATION_COLLECTIONS,
  ];
}

export function findCollection(slug: string): Collection | undefined {
  return allCollections().find((c) => c.slug === slug);
}

/** Return the products that belong to a given collection slug. */
export function filterByCollection(products: Product[], slug: string): Product[] {
  if (slug === "all") return products;
  const type = REFRIGERANT_TYPES.find((t) => t.toLowerCase() === slug);
  if (type) return products.filter((p) => p.refrigerantCode === type);
  if (slug === "small-cylinders") return products.filter((p) => p.sizeBucket === "small");
  if (slug === "bulk-cylinders") return products.filter((p) => p.sizeBucket === "bulk");
  if (APPLICATION_COLLECTIONS.some((c) => c.slug === slug)) {
    return products.filter((p) => p.applications.includes(slug));
  }
  return [];
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export function sortProducts(products: Product[], key: SortKey): Product[] {
  const copy = [...products];
  switch (key) {
    case "price-asc": return copy.sort((a, b) => a.minPrice - b.minPrice);
    case "price-desc": return copy.sort((a, b) => b.minPrice - a.minPrice);
    case "name": return copy.sort((a, b) => a.name.localeCompare(b.name));
    default: return copy;
  }
}

export function formatPrice(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
