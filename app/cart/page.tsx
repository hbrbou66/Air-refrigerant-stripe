"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/catalog";
import { IconTruck, IconCheck } from "@/components/Icons";
import { EpaNotice } from "@/components/EpaNotice";

export default function CartPage() {
  const {
    lines,
    subtotal,
    setQuantity,
    removeLine,
    goToCheckout,
    isCheckingOut,
    checkoutError,
  } = useCart();

  return (
    <div className="container-px py-12">
      <h1 className="font-heading text-3xl font-bold text-navy">Your Cart</h1>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-trust">
        <IconTruck width={16} height={16} /> Free Shipping on All Orders
      </p>

      {lines.length === 0 ? (
        <div className="mt-10 rounded-card border border-line bg-white p-12 text-center">
          <p className="text-slate-soft">Your cart is empty.</p>
          <Link href="/collections/all" className="btn-cyan mt-5">Shop All Refrigerants</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-line rounded-card border border-line bg-white">
              {lines.map((l) => (
                <li key={l.variantId} className="flex gap-4 p-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-ice">
                    <Image src={l.image} alt={l.name} fill sizes="96px" className="object-contain p-1.5" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link href={`/products/${l.productSlug}`} className="font-semibold text-navy hover:text-cyan">{l.name}</Link>
                    {l.optionLabel && <span className="text-sm text-slate-soft">{l.optionLabel}</span>}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="stepper">
                        <button aria-label="Decrease quantity" onClick={() => setQuantity(l.variantId, l.quantity - 1)}>−</button>
                        <span className="stepper-value">{l.quantity}</span>
                        <button aria-label="Increase quantity" onClick={() => setQuantity(l.variantId, l.quantity + 1)}>+</button>
                      </div>
                      <span className="font-bold text-navy">{formatPrice(l.price * l.quantity, l.currency)}</span>
                    </div>
                    <button onClick={() => removeLine(l.variantId)} className="mt-2 self-start text-xs text-slate-soft underline hover:text-amber-ink">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-card border border-line bg-white p-5">
            <h2 className="font-heading text-lg font-bold text-navy">Order Summary</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-soft">Subtotal</span>
              <span className="font-semibold text-navy">{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-slate-soft">Shipping</span>
              <span className="font-semibold text-trust">FREE</span>
            </div>
            <div className="mt-3 border-t border-line pt-3 flex items-center justify-between">
              <span className="font-semibold text-navy">Total</span>
              <span className="font-heading text-xl font-bold text-navy">{formatPrice(subtotal)}</span>
            </div>
            <button onClick={goToCheckout} disabled={isCheckingOut} className="btn-amber mt-4 w-full disabled:opacity-70">
              {isCheckingOut ? "Redirecting…" : "Proceed to Checkout"}
            </button>
            {checkoutError && (
              <p role="alert" className="mt-3 rounded-lg border border-amber/40 bg-amber/10 p-2 text-center text-xs text-navy">
                {checkoutError}
              </p>
            )}
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-trust">
              <IconCheck width={13} height={13} /> Secure checkout via Stripe
            </p>
            <div className="mt-4"><EpaNotice compact /></div>
          </aside>
        </div>
      )}
    </div>
  );
}
