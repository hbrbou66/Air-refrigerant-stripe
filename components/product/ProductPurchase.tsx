"use client";

import { useEffect, useState } from "react";
import type { Product, Variant } from "@/lib/types";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "@/components/cart/CartProvider";
import { fbTrack } from "@/lib/fbpixel";
import { IconCart, IconBolt, IconTruck, IconCheck, IconLock } from "@/components/Icons";

/* Purchase block modeled on golf-lounge's ProductPurchase: price → variant
   options → quantity → side-by-side Add/Buy CTAs → trust perks. Plus the
   Air Refrigerant sticky mobile buy bar as a progressive enhancement. */
/** URL-friendly slug for a variant, e.g. "40 Cylinders" → "40-cylinders". */
function variantSlug(v: Variant): string {
  return (v.optionLabel || v.name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductPurchase({ product }: { product: Product }) {
  const { addLine, buyNow, isCheckingOut, checkoutError } = useCart();
  const [variant, setVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Meta Pixel: ViewContent once per product view.
  useEffect(() => {
    const v = product.variants[0];
    fbTrack("ViewContent", {
      content_ids: v ? [v.id] : [],
      content_type: "product",
      content_name: product.name,
      value: v?.price,
      currency: v?.currency || "USD",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  // Pre-select a variant from the URL hash (e.g. #40-cylinders) on load.
  useEffect(() => {
    if (typeof window === "undefined" || product.variants.length < 2) return;
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, "")).toLowerCase();
    if (!hash) return;
    const match = product.variants.find((v) => variantSlug(v) === hash);
    if (match) setVariant(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  // Select a variant and reflect it in the URL hash (no history spam).
  function selectVariant(v: Variant) {
    setVariant(v);
    if (typeof window !== "undefined" && product.variants.length > 1) {
      history.replaceState(null, "", `#${variantSlug(v)}`);
    }
  }

  if (!variant) {
    return (
      <p className="rounded-card border border-line bg-ice p-4 text-sm text-slate-soft">
        This product is currently unavailable. Please check back soon.
      </p>
    );
  }

  const onSale = variant.compareAtPrice && variant.compareAtPrice > variant.price;
  const pct = onSale ? Math.round((1 - variant.price / (variant.compareAtPrice as number)) * 100) : 0;
  const hasOptions = product.variants.length > 1;

  function add() {
    addLine({
      variantId: variant.id,
      quantity: qty,
      productSlug: product.slug,
      name: product.name,
      optionLabel: variant.optionLabel,
      refrigerantCode: product.refrigerantCode,
      price: variant.price,
      currency: variant.currency,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Price */}
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-heading text-3xl font-bold text-navy">{formatPrice(variant.price, variant.currency)}</span>
          {onSale && (
            <span className="text-lg text-slate-soft line-through">
              {formatPrice(variant.compareAtPrice as number, variant.currency)}
            </span>
          )}
          {onSale && (
            <span className="rounded-pill bg-amber px-2.5 py-1 text-xs font-bold text-navy-dark">Save {pct}%</span>
          )}
        </div>
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-pill bg-trust-soft px-3 py-1 text-sm font-semibold text-trust">
          <IconTruck width={16} height={16} /> Free FedEx/UPS shipping · no hazmat fees
        </p>
      </div>

      {/* Variant selector */}
      {hasOptions && (
        <div>
          <span className="mb-2 block text-sm font-bold text-navy">Size / Pack</span>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const selected = v.id === variant.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => selectVariant(v)}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    selected
                      ? "border-cyan bg-cyan/10 text-navy ring-1 ring-cyan"
                      : "border-line bg-white text-slate hover:border-cyan"
                  }`}
                >
                  {v.optionLabel || v.name}
                  <span className="ml-2 text-slate-soft">{formatPrice(v.price, v.currency)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <span className="mb-2 block text-sm font-bold text-navy">Quantity</span>
        <div className="stepper">
          <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <span className="stepper-value">{qty}</span>
          <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>+</button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={add} className="btn-navy flex-1">
          <IconCart width={18} height={18} /> {added ? "Added ✓" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={() => buyNow(variant.id, qty)}
          disabled={isCheckingOut}
          className="btn-amber flex-1 disabled:opacity-70"
        >
          <IconBolt width={18} height={18} /> {isCheckingOut ? "Loading Checkout…" : "Buy Now"}
        </button>
      </div>
      {checkoutError && (
        <p role="alert" className="rounded-lg border border-amber/40 bg-amber/10 p-3 text-sm text-navy">
          {checkoutError}
        </p>
      )}

      {/* Trust perks */}
      <ul className="grid gap-2.5 rounded-card border border-line bg-ice p-4 text-sm font-semibold text-navy">
        <Perk icon={<IconTruck width={16} height={16} />}>Free FedEx/UPS shipping — no hazmat fees</Perk>
        <Perk icon={<IconCheck width={16} height={16} />}>100% virgin gas (AHRI-700), factory sealed</Perk>
        <Perk icon={<IconLock width={16} height={16} />}>Secure Stripe checkout — cards and supported wallets</Perk>
      </ul>

      {/* Sticky mobile buy bar */}
      <div data-buybar className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-slate-soft">
              {hasOptions ? variant.optionLabel || product.refrigerantCode : product.refrigerantCode}
            </p>
            <p className="font-heading text-lg font-bold text-navy">{formatPrice(variant.price, variant.currency)}</p>
          </div>
          <button onClick={add} className="btn-navy shrink-0 whitespace-nowrap px-6">
            <IconCart width={18} height={18} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function Perk({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <span className="text-cyan">{icon}</span>
      {children}
    </li>
  );
}
