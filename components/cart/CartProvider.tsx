"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CHECKOUT_STORAGE_KEY,
  type CartLine,
  type CheckoutItem,
} from "@/lib/checkout";
import { fbTrack } from "@/lib/fbpixel";

const STORAGE_KEY = "ar_cart_lines_v1";

// Navigate after a short delay so any just-fired Meta Pixel beacon
// (e.g. InitiateCheckout) has time to send before the page unloads.
function leaveTo(url: string, delay = 400): void {
  setTimeout(() => {
    window.location.href = url;
  }, delay);
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  isCheckingOut: boolean;
  checkoutError: string | null;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: CartLine) => void;
  removeLine: (variantId: string) => void;
  setQuantity: (variantId: string, qty: number) => void;
  clear: () => void;
  buyNow: (variantId: string, qty?: number) => Promise<void>;
  goToCheckout: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [isCheckingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const addLine = useCallback((line: CartLine) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.variantId === line.variantId);
      if (existing) {
        return prev.map((l) =>
          l.variantId === line.variantId
            ? { ...l, quantity: l.quantity + line.quantity }
            : l
        );
      }
      return [...prev, line];
    });
    setOpen(true);
    fbTrack("AddToCart", {
      content_ids: [line.variantId],
      content_type: "product",
      content_name: line.name,
      contents: [{ id: line.variantId, quantity: line.quantity }],
      value: line.price * line.quantity,
      currency: line.currency || "USD",
    });
  }, []);

  const removeLine = useCallback((variantId: string) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const setQuantity = useCallback((variantId: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.variantId === variantId ? { ...l, quantity: Math.max(1, qty) } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const startCheckout = useCallback(
    async (items: CheckoutItem[]) => {
      setCheckingOut(true);
      setCheckoutError(null);
      try {
        sessionStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(items));
        leaveTo("/checkout");
      } catch (error) {
        setCheckingOut(false);
        setCheckoutError(
          error instanceof Error
            ? error.message
            : "We could not open checkout. Please try again.",
        );
      }
    },
    [],
  );

  const buyNow = useCallback(async (variantId: string, qty = 1) => {
    fbTrack("InitiateCheckout", {
      content_ids: [variantId],
      content_type: "product",
      contents: [{ id: variantId, quantity: qty }],
      num_items: qty,
      currency: "USD",
    });
    await startCheckout([{ variantId, quantity: qty }]);
  }, [startCheckout]);

  const goToCheckout = useCallback(async () => {
    if (!lines.length) return;
    setCheckingOut(true);
    const items = lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity }));
    fbTrack("InitiateCheckout", {
      content_ids: lines.map((l) => l.variantId),
      content_type: "product",
      contents: lines.map((l) => ({ id: l.variantId, quantity: l.quantity })),
      num_items: lines.reduce((n, l) => n + l.quantity, 0),
      value: lines.reduce((n, l) => n + l.price * l.quantity, 0),
      currency: "USD",
    });
    await startCheckout(items);
  }, [lines, startCheckout]);

  const count = useMemo(() => lines.reduce((n, l) => n + l.quantity, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((n, l) => n + l.price * l.quantity, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isOpen,
    isCheckingOut,
    checkoutError,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
    addLine,
    removeLine,
    setQuantity,
    clear,
    buyNow,
    goToCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
