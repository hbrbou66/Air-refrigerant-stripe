"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/catalog";
import { IconClose, IconCheck, IconTruck } from "@/components/Icons";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    subtotal,
    setQuantity,
    removeLine,
    goToCheckout,
    isCheckingOut,
    checkoutError,
  } = useCart();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100]"
    >
      <div
        className="absolute inset-0 bg-navy-dark/50"
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-lift animate-fade-in"
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-heading text-lg font-bold text-navy">
            Your Cart {lines.length > 0 && <span className="text-slate-soft">({lines.length})</span>}
          </h2>
          <button onClick={closeCart} aria-label="Close cart" className="rounded-full p-1.5 text-slate-soft hover:bg-ice hover:text-navy">
            <IconClose />
          </button>
        </header>

        <div className="flex items-center gap-2 bg-trust/10 px-5 py-2.5 text-sm font-semibold text-trust">
          <IconTruck width={16} height={16} /> Free shipping applied to every order
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-slate-soft">Your cart is empty.</p>
            <Link href="/collections/all" onClick={closeCart} className="btn-cyan">
              Shop All Refrigerants
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.variantId} className="flex gap-3 py-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-ice">
                    <Image src={l.image} alt={l.name} fill sizes="80px" className="object-contain p-1" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link href={`/products/${l.productSlug}`} onClick={closeCart} className="line-clamp-2 text-sm font-semibold text-navy hover:text-cyan">
                      {l.name}
                    </Link>
                    {l.optionLabel && <span className="text-xs text-slate-soft">{l.optionLabel}</span>}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="stepper stepper-sm">
                        <button aria-label="Decrease quantity" onClick={() => setQuantity(l.variantId, l.quantity - 1)}>−</button>
                        <span className="stepper-value">{l.quantity}</span>
                        <button aria-label="Increase quantity" onClick={() => setQuantity(l.variantId, l.quantity + 1)}>+</button>
                      </div>
                      <span className="text-sm font-bold text-navy">{formatPrice(l.price * l.quantity, l.currency)}</span>
                    </div>
                    <button onClick={() => removeLine(l.variantId)} className="mt-1 self-start text-xs text-slate-soft underline hover:text-amber-ink">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-5 py-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-slate-soft">Subtotal</span>
                <span className="font-heading text-xl font-bold text-navy">{formatPrice(subtotal)}</span>
              </div>
              <p className="mb-3 flex items-center gap-1.5 text-xs text-trust">
                <IconCheck width={14} height={14} /> Free shipping &amp; taxes calculated at checkout
              </p>
              <button onClick={goToCheckout} disabled={isCheckingOut} className="btn-amber w-full text-base disabled:opacity-70">
                {isCheckingOut ? "Opening secure checkout…" : "Checkout"}
              </button>
              {checkoutError && (
                <p role="alert" className="mt-2 rounded-lg border border-amber/40 bg-amber/10 p-2 text-center text-xs text-navy">
                  {checkoutError}
                </p>
              )}
              <p className="mt-2 text-center text-[11px] text-slate-soft">
                Secure checkout powered by Stripe. EPA Section 608 certification may be required — see product page.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
