// Single source of truth for the current limited-time offer.
// Surfaced on product pages and in the Shipping Policy. Set `active: false`
// (or clear the dates) to remove the notice everywhere.

export const PROMO = {
  active: true,
  validUntil: "July 30, 2026",
  shipDate: "August 1, 2026",
  headline: "Limited-time offer",
  note: "Offer valid until July 30, 2026. All orders will be shipped on August 1, 2026.",
} as const;
