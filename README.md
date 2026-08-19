# Air Refrigerant — Stripe Storefront

Production-ready **Next.js App Router + TypeScript + Tailwind** storefront for **Air Refrigerant™**. It preserves the original site, product catalog, prices, content, address, and public routes while using **Stripe Embedded Checkout** for on-site payment.

- Public site: `airrefrigerant.site` (Vercel)
- Currency: USD
- Shipping: free U.S. FedEx/UPS option
- Catalog: 20 bundled products; no external catalog token is needed

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Stripe environment variables

Add these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | yes | Loads Stripe's secure embedded payment form in the browser. Use `pk_test_...` while testing and `pk_live_...` for production. |
| `STRIPE_SECRET_KEY` | yes | Creates and retrieves Stripe Checkout Sessions on the server. Use `sk_test_...` while testing and `sk_live_...` for production. |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical site URL and Stripe return origin: `https://airrefrigerant.site`. The request origin is used as a fallback. |

The publishable key is safe to expose in the browser; the secret key is not. Never give `STRIPE_SECRET_KEY` a `NEXT_PUBLIC_` prefix. Stripe renders the sensitive payment fields inside its secure embedded form, so the storefront never receives full card details.

Optional variables for forms and analytics remain documented in [`.env.example`](./.env.example).

## Meta Pixel

The storefront uses Meta Pixel `1293778635943718` by default and tracks
`PageView`, `ViewContent`, `AddToCart`, `InitiateCheckout`, and `Purchase`.
Purchase events fire only after Stripe reports the Checkout Session as paid and
include the order value, currency, and Stripe session reference. The session
reference also deduplicates confirmation-page reloads in the same browser.

## How checkout works

1. The cart or Buy Now action opens `/checkout` and carries only variant IDs and quantities in same-tab session storage.
2. The embedded checkout page sends those IDs and quantities to `POST /api/checkout`.
3. The server resolves the IDs against `lib/snapshot.ts`. Names and prices are never accepted from the browser.
4. The server creates an Embedded Stripe Checkout Session with:
   - billing and U.S. shipping address collection;
   - phone collection;
   - a free FedEx/UPS shipping option;
   - the existing product names, images, variants, and prices.
5. Stripe's secure payment form loads directly on the Air Refrigerant checkout page.
6. Card payments complete without leaving the site. Redirect-based payment methods return to `/checkout/success?session_id=...`.

The Track Order page accepts the Stripe Checkout Session reference shown on the confirmation page. Stripe payment information stays server-side.

## Test checkout

1. Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...` and `STRIPE_SECRET_KEY=sk_test_...` from the same Stripe test-mode account.
2. Start the app and add a product to the cart.
3. Continue to Checkout.
4. Use Stripe test card `4242 4242 4242 4242`, any future expiry, and any CVC.

Use Stripe live mode only after the entire flow works in test mode.

## Product and page data

- `lib/snapshot.ts` — bundled product catalog, variants, prices, and existing media URLs.
- `lib/products.ts` — server-side catalog access and trusted variant resolution.
- `lib/stripe.ts` — Stripe Checkout Session creation and retrieval.
- `lib/site.ts` — business name, address, contact details, warehouses, trust content, and reviews.

Routes include Home, collections, product detail, cart, checkout confirmation, quote request, SDS, pressure–temperature chart, order tracking, About, Contact, policies, search, and 404.

## Deploy to Vercel

1. Push this repository and import it into Vercel.
2. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, and `NEXT_PUBLIC_SITE_URL` for Production, Preview, and Development as appropriate.
3. Deploy and attach `airrefrigerant.site`.
4. Run a full test-mode purchase on the deployed URL.
5. Replace the test secret with the live secret for Production.
6. In Stripe, enable the payment methods and customer emails you want to offer.

Stripe recommends webhooks for reliable automated fulfillment because a customer might pay without reaching the success page. The current build records payments in the Stripe Dashboard and supports confirmation/order lookup; connect a fulfillment database or shipping system before automating dispatch.

## Compliance and launch checks

Refrigerant sales are regulated. The site surfaces EPA Section 608 notices on product and checkout paths, but the business must finalize certification verification, SDS links, P–T chart validation, taxes, shipping eligibility, policy language, and fulfillment operations before launch.
