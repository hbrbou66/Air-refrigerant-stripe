"use client";

import { useEffect } from "react";
import { fbTrack } from "@/lib/fbpixel";

const SENT_PURCHASE_PREFIX = "ar_meta_purchase_v1_";
const MAX_PIXEL_WAIT_ATTEMPTS = 20;
const PIXEL_WAIT_MS = 250;

interface MetaPurchaseTrackerProps {
  sessionId: string;
  value: number;
  currency: string;
}

function wasSent(key: string): boolean {
  try {
    return localStorage.getItem(key) === "sent";
  } catch {
    return false;
  }
}

function markSent(key: string): void {
  try {
    localStorage.setItem(key, "sent");
  } catch {
    // Tracking still succeeds when storage is unavailable; only reload
    // deduplication is lost in that browser mode.
  }
}

/**
 * Sends one Purchase event after Stripe confirms payment. The Checkout Session
 * ID is used for browser-side reload deduplication and as Meta's event ID so a
 * future Conversions API integration can safely deduplicate the same purchase.
 */
export function MetaPurchaseTracker({
  sessionId,
  value,
  currency,
}: MetaPurchaseTrackerProps) {
  useEffect(() => {
    if (!sessionId || !Number.isFinite(value) || value < 0 || !currency) return;

    const storageKey = `${SENT_PURCHASE_PREFIX}${sessionId}`;
    const eventId = `stripe_purchase_${sessionId}`;
    let attempts = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const sendPurchase = () => {
      if (wasSent(storageKey)) return;

      const sent = fbTrack(
        "Purchase",
        {
          value,
          currency: currency.toUpperCase(),
          order_id: sessionId,
          content_type: "product",
        },
        { eventId },
      );

      if (sent) {
        markSent(storageKey);
        return;
      }

      attempts += 1;
      if (attempts < MAX_PIXEL_WAIT_ATTEMPTS) {
        retryTimer = setTimeout(sendPurchase, PIXEL_WAIT_MS);
      }
    };

    sendPurchase();
    return () => {
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [currency, sessionId, value]);

  return null;
}
