/**
 * Core routes exercised in CI. Checkout itself is excluded because it requires
 * a Stripe secret key and redirects to Stripe's hosted payment page.
 */
export const routes: { path: string; name: string }[] = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/request-a-quote", name: "request-a-quote" },
  { path: "/track-order", name: "track-order" },
  { path: "/safety-data-sheets", name: "safety-data-sheets" },
  { path: "/pressure-temp-chart", name: "pressure-temp-chart" },
];
