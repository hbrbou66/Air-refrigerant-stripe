// Pure, client-safe order-status derivation (no secrets, no node APIs).
//
// Status is derived from the order date, with optional fulfillment overrides.

/** Orders older than this many days are treated as already on their way. */
export const IN_TRANSIT_AFTER_DAYS = 2;

/** Promised ship window shown for brand-new orders. */
export const SHIP_WITHIN_BUSINESS_DAYS = 2;

export type ShipStatusKey = "preparing" | "in_transit" | "delivered" | "cancelled";

export interface ShipStatus {
  key: ShipStatusKey;
  label: string;
  detail: string;
}

export function deriveShipStatus(
  createdAt: string,
  opts: { city?: string | null; status?: string | null } = {},
): ShipStatus {
  const status = (opts.status || "").toUpperCase();
  const where = opts.city ? opts.city : "your delivery address";

  // Safety overrides when a fulfillment system provides a final state.
  if (status === "CANCELLED") {
    return {
      key: "cancelled",
      label: "Cancelled",
      detail: "This order was cancelled. Contact us if you think this is a mistake.",
    };
  }
  if (status === "DELIVERED") {
    return { key: "delivered", label: "Delivered", detail: `Delivered to ${where}.` };
  }
  if (status === "PAID") {
    return {
      key: "preparing",
      label: "Payment Confirmed",
      detail: "We’re preparing your order. Tracking will be emailed after dispatch.",
    };
  }

  // Date-based status.
  const placed = new Date(createdAt).getTime();
  const days = (Date.now() - placed) / 86_400_000;

  if (days > IN_TRANSIT_AFTER_DAYS) {
    return { key: "in_transit", label: "In Transit", detail: `On its way to ${where}.` };
  }
  return {
    key: "preparing",
    label: "Preparing to Ship",
    detail: `Ready to ship within the next ${SHIP_WITHIN_BUSINESS_DAYS} business days.`,
  };
}
