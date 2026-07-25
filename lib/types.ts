// Storefront types shared by catalog pages, cart state, and Stripe checkout.

export interface Variant {
  id: string; // Stable catalog variant ID used by the cart and checkout validation.
  name: string;
  sku?: string;
  /** Numeric price in primary currency units (e.g. 389 = $389.00) */
  price: number;
  compareAtPrice?: number | null;
  currency: string;
  /** Net refrigerant weight in pounds, when known */
  weightLb?: number | null;
  /** Human label for the option, e.g. "1 Cylinder" or "5lb" */
  optionLabel?: string | null;
  available?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  /** Plain-text marketing description (HTML stripped) */
  description: string;
  currency: string;
  images: string[];
  variants: Variant[];
  /** Lowest variant price — used for "from $X" display */
  minPrice: number;
  /** Compare-at for the lowest variant, when on sale */
  minComparePrice?: number | null;

  // Derived classification (computed from the title / data)
  refrigerantCode: string; // e.g. "R410A"
  sizeLb: number; // net weight of a single cylinder/can
  sizeBucket: "small" | "bulk"; // small cans (<=10lb) vs bulk cylinders (>=20lb)
  applications: string[]; // application collection slugs this product belongs to
  blendNote?: string; // composition note, e.g. "R32/R125/R134a"
  gwp?: string; // global warming potential, when relevant
}

export interface Collection {
  slug: string;
  title: string;
  kind: "type" | "size" | "application" | "all";
  description: string;
  /** Matching predicate is applied in catalog.ts */
}
