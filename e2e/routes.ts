/**
 * Core routes exercised in CI. Without Stripe keys, the checkout route renders
 * its accessible configuration state instead of contacting Stripe.
 */
export const routes: { path: string; name: string }[] = [
  { path: "/", name: "home" },
  { path: "/checkout", name: "checkout" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/request-a-quote", name: "request-a-quote" },
  { path: "/track-order", name: "track-order" },
  { path: "/safety-data-sheets", name: "safety-data-sheets" },
  { path: "/pressure-temp-chart", name: "pressure-temp-chart" },
];
