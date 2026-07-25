"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

export function ClearCartAfterCheckout() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return null;
}
