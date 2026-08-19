import "server-only";
import type { CatalogLine } from "./products";

const STRIPE_API = "https://api.stripe.com/v1";

export interface StripeCheckoutSession {
  id: string;
  client_secret?: string | null;
  url?: string | null;
  created: number;
  status?: "open" | "complete" | "expired" | null;
  payment_status?: "paid" | "unpaid" | "no_payment_required";
  amount_total?: number | null;
  currency?: string | null;
  customer_details?: {
    email?: string | null;
    name?: string | null;
    phone?: string | null;
    address?: {
      city?: string | null;
      state?: string | null;
      country?: string | null;
      postal_code?: string | null;
    } | null;
  } | null;
  collected_information?: {
    shipping_details?: {
      name?: string | null;
      address?: {
        city?: string | null;
        state?: string | null;
        country?: string | null;
        postal_code?: string | null;
      } | null;
    } | null;
  } | null;
  shipping_details?: {
    name?: string | null;
    address?: {
      city?: string | null;
      state?: string | null;
      country?: string | null;
      postal_code?: string | null;
    } | null;
  } | null;
  error?: {
    message?: string;
    type?: string;
  };
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

function stripeKey(): string {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return key;
}

async function stripeFetch(
  path: string,
  init: { method?: "GET" | "POST"; body?: URLSearchParams } = {},
): Promise<StripeCheckoutSession> {
  const response = await fetch(`${STRIPE_API}${path}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${stripeKey()}`,
      ...(init.body
        ? { "Content-Type": "application/x-www-form-urlencoded" }
        : {}),
    },
    body: init.body?.toString(),
    cache: "no-store",
  });
  const data = (await response.json()) as StripeCheckoutSession;

  if (!response.ok) {
    throw new Error(data.error?.message || `Stripe returned ${response.status}`);
  }
  return data;
}

function cleanOrigin(origin: string): string {
  const url = new URL(origin);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Invalid checkout origin");
  }
  return url.origin;
}

export async function createCheckoutSession(
  lines: CatalogLine[],
  origin: string,
): Promise<StripeCheckoutSession> {
  const siteOrigin = cleanOrigin(origin);
  const form = new URLSearchParams();

  form.set("mode", "payment");
  form.set("ui_mode", "embedded");
  form.set(
    "return_url",
    `${siteOrigin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  );
  form.set("redirect_on_completion", "if_required");
  form.set("billing_address_collection", "required");
  form.set("shipping_address_collection[allowed_countries][0]", "US");
  form.set("phone_number_collection[enabled]", "true");
  form.set("customer_creation", "always");
  form.set("submit_type", "pay");

  form.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
  form.set(
    "shipping_options[0][shipping_rate_data][fixed_amount][amount]",
    "0",
  );
  form.set(
    "shipping_options[0][shipping_rate_data][fixed_amount][currency]",
    "usd",
  );
  form.set(
    "shipping_options[0][shipping_rate_data][display_name]",
    "Free FedEx/UPS shipping",
  );
  form.set(
    "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]",
    "business_day",
  );
  form.set(
    "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]",
    "3",
  );
  form.set(
    "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]",
    "business_day",
  );
  form.set(
    "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]",
    "7",
  );
  lines.forEach(({ variant, quantity }, index) => {
    const prefix = `line_items[${index}]`;
    const currency = (variant.currency || "USD").toLowerCase();
    const sku = variant.sku?.trim();
    const privateLineItemLabel = sku ? `SKU ${sku}` : `Item ${index + 1}`;

    form.set(`${prefix}[price_data][currency]`, currency);
    form.set(
      `${prefix}[price_data][unit_amount]`,
      String(Math.round(variant.price * 100)),
    );
    form.set(
      `${prefix}[price_data][product_data][name]`,
      privateLineItemLabel,
    );
    form.set(`${prefix}[quantity]`, String(quantity));
  });

  return stripeFetch("/checkout/sessions", { method: "POST", body: form });
}

export async function retrieveCheckoutSession(
  sessionId: string,
): Promise<StripeCheckoutSession | null> {
  if (!/^cs_(?:test_|live_)?[A-Za-z0-9]+$/.test(sessionId)) return null;

  try {
    return await stripeFetch(
      `/checkout/sessions/${encodeURIComponent(sessionId)}`,
    );
  } catch {
    return null;
  }
}

export function checkoutShippingAddress(session: StripeCheckoutSession) {
  return (
    session.collected_information?.shipping_details?.address ??
    session.shipping_details?.address ??
    session.customer_details?.address ??
    null
  );
}
