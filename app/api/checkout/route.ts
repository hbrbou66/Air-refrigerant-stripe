import { NextResponse } from "next/server";
import type { CheckoutItem, CheckoutOrderSummary } from "@/lib/checkout";
import { resolveCatalogLines, type CatalogLine } from "@/lib/products";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseItems(value: unknown): CheckoutItem[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item): CheckoutItem[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    if (
      typeof record.variantId !== "string" ||
      typeof record.quantity !== "number"
    ) {
      return [];
    }
    return [{ variantId: record.variantId, quantity: record.quantity }];
  });
}

function buildOrderSummary(lines: CatalogLine[]): CheckoutOrderSummary {
  const currency = (lines[0]?.variant.currency || "USD").toUpperCase();
  let subtotalCents = 0;

  const items = lines.map(({ product, variant, quantity }, index) => {
    const unitAmountCents = Math.round(variant.price * 100);
    const lineTotalCents = unitAmountCents * quantity;
    subtotalCents += lineTotalCents;

    return {
      sku: variant.sku?.trim() || `Item-${index + 1}`,
      productSlug: product.slug,
      productName: product.name,
      refrigerantCode: product.refrigerantCode,
      variantLabel: variant.optionLabel || variant.name,
      image: product.images[0] || "",
      quantity,
      unitPrice: unitAmountCents / 100,
      lineTotal: lineTotalCents / 100,
      currency,
    };
  });

  const subtotal = subtotalCents / 100;
  return {
    items,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    subtotal,
    shipping: 0,
    total: subtotal,
    currency,
  };
}

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "stripe_not_configured" },
      { status: 503 },
    );
  }

  try {
    const body = await req.json();
    const items = parseItems(body?.items);
    const lines = resolveCatalogLines(items);

    if (!items.length || !lines?.length) {
      return NextResponse.json(
        { error: "invalid_cart" },
        { status: 400 },
      );
    }

    const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    const origin = configuredOrigin || new URL(req.url).origin;
    const session = await createCheckoutSession(lines, origin);
    const order = buildOrderSummary(lines);

    if (!session.client_secret) {
      throw new Error("Stripe did not return an Embedded Checkout client secret");
    }

    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
      order,
    });
  } catch (error) {
    console.error("Stripe checkout session creation failed", error);
    return NextResponse.json(
      { error: "checkout_unavailable" },
      { status: 502 },
    );
  }
}
