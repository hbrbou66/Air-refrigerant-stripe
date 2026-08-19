// Meta (Facebook) Pixel helpers. Pixel IDs are public identifiers, so the
// production account ID can safely live in the browser bundle.
export const FB_PIXEL_ID = "1293778635943718";

type PixelParams = Record<string, unknown>;

interface PixelEventOptions {
  eventId?: string;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Re-fires a PageView (used on client-side route changes). */
export function fbPageview(): void {
  if (typeof window !== "undefined") window.fbq?.("track", "PageView");
}

/** Fires a standard Meta Pixel event if the base pixel has initialized. */
export function fbTrack(
  event: string,
  params?: PixelParams,
  options: PixelEventOptions = {},
): boolean {
  if (typeof window === "undefined" || !window.fbq) return false;

  if (options.eventId) {
    window.fbq("track", event, params, { eventID: options.eventId });
  } else {
    window.fbq("track", event, params);
  }
  return true;
}
