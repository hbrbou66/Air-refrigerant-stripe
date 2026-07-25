import { NextResponse } from "next/server";
import {
  checkoutShippingAddress,
  isStripeConfigured,
  retrieveCheckoutSession,
} from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Customer-facing order lookup by Stripe Checkout Session reference. Only the
// minimal details needed by the page are returned.
function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const orderNumber = str(body.orderNumber);
  const email = str(body.email);
  if (!orderNumber) {
    return NextResponse.json({ error: "missing_input" }, { status: 400 });
  }

  const session = await retrieveCheckoutSession(orderNumber);
  const sessionEmail = session?.customer_details?.email?.trim().toLowerCase();
  const emailMatches =
    !email || (sessionEmail && email.toLowerCase() === sessionEmail);
  const isPaid =
    session?.payment_status === "paid" ||
    session?.payment_status === "no_payment_required";

  if (!session || !emailMatches || !isPaid) {
    return NextResponse.json({ found: false });
  }

  const address = checkoutShippingAddress(session);

  return NextResponse.json({
    found: true,
    order: {
      friendlyId: session.id,
      createdAt: new Date(session.created * 1000).toISOString(),
      status: "PAID",
      city: address?.city ?? null,
      state: address?.state ?? null,
    },
  });
}
