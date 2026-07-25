// Meta (Facebook) Pixel helpers.
// The pixel ID is configurable via NEXT_PUBLIC_FB_PIXEL_ID; it falls back to
// the account's production pixel so tracking works out of the box.
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1555772675884986";

type PixelParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Re-fires a PageView (used on client-side route changes). */
export function fbPageview(): void {
  if (typeof window !== "undefined") window.fbq?.("track", "PageView");
}

/** Fires a standard Meta Pixel event if the pixel has loaded. */
export function fbTrack(event: string, params?: PixelParams): void {
  if (typeof window !== "undefined") window.fbq?.("track", event, params);
}
