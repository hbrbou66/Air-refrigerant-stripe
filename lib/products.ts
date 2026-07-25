import "server-only";
import { SNAPSHOT_PRODUCTS } from "./snapshot";
import type { Product, Variant } from "./types";

/**
 * The storefront catalog is bundled with the application so deploying the
 * Stripe version never depends on another commerce provider.
 */
export async function getAllProducts(): Promise<Product[]> {
  return SNAPSHOT_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return SNAPSHOT_PRODUCTS.find((product) => product.slug === slug) ?? null;
}

export interface CatalogLine {
  product: Product;
  variant: Variant;
  quantity: number;
}

/**
 * Resolve browser-supplied identifiers against the trusted server catalog.
 * Prices and product names are always taken from this result, never the request.
 */
export function resolveCatalogLines(
  items: { variantId: string; quantity: number }[],
): CatalogLine[] | null {
  const variants = new Map<string, { product: Product; variant: Variant }>();

  for (const product of SNAPSHOT_PRODUCTS) {
    for (const variant of product.variants) {
      variants.set(variant.id, { product, variant });
    }
  }

  const combined = new Map<string, CatalogLine>();
  for (const item of items) {
    if (
      !item.variantId ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 99
    ) {
      return null;
    }

    const found = variants.get(item.variantId);
    if (!found || found.variant.available === false || found.variant.price <= 0) {
      return null;
    }

    const existing = combined.get(item.variantId);
    const quantity = (existing?.quantity ?? 0) + item.quantity;
    if (quantity > 99) return null;

    combined.set(item.variantId, {
      product: found.product,
      variant: found.variant,
      quantity,
    });
  }

  return [...combined.values()];
}
