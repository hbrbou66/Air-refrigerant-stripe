// Single source of truth for the current inventory promotion.
// Surfaced on product pages and in the Shipping Policy. Set `active: false`
// to remove the notice everywhere.

export const PROMO = {
  active: true,
  headline: "Limited promotional inventory",
  note: "Save 55% while supplies last.",
} as const;
