import { NextResponse } from "next/server";
import { resolveCatalogLines } from "@/lib/products";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckoutItem {
  variantId: string;
  quantity: number;
}

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

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session creation failed", error);
    return NextResponse.json(
      { error: "checkout_unavailable" },
      { status: 502 },
    );
  }
}
