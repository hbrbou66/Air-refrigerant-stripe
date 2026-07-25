"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "@/components/cart/CartProvider";
import { IconTruck, IconCart } from "@/components/Icons";

export function ProductCard({ product }: { product: Product }) {
  const { addLine } = useCart();
  const v = product.variants[0];
  const onSale = product.minComparePrice && product.minComparePrice > product.minPrice;
  const pct = onSale ? Math.round((1 - product.minPrice / (product.minComparePrice as number)) * 100) : 0;
  const multi = product.variants.length > 1;

  function quickAdd() {
    if (!v) return;
    addLine({
      variantId: v.id,
      quantity: 1,
      productSlug: product.slug,
      name: product.name,
      optionLabel: v.optionLabel,
      refrigerantCode: product.refrigerantCode,
      price: v.price,
      currency: v.currency,
      image: product.images[0],
    });
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-card border border-line/70 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-lift">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-ice">
        <span className="absolute left-3 top-3 z-10 badge bg-navy text-white">{product.refrigerantCode}</span>
        {onSale && (
          <span className="absolute right-3 top-3 z-10 badge bg-amber text-navy-dark">−{pct}%</span>
        )}
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-cyan">
          {product.sizeLb} lb · {product.sizeBucket === "bulk" ? "Bulk Cylinder" : "Small Cylinder"}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 text-sm font-semibold text-navy hover:text-cyan"
        >
          {product.name}
        </Link>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-lg font-bold text-navy">
              {multi ? "From " : ""}
              {formatPrice(product.minPrice, product.currency)}
            </span>
            {onSale && (
              <span className="text-sm text-slate-soft line-through">
                {formatPrice(product.minComparePrice as number, product.currency)}
              </span>
            )}
          </div>

          <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-trust">
            <IconTruck width={13} height={13} /> Free shipping
          </span>

          <div className="mt-3">
            {multi ? (
              <Link href={`/products/${product.slug}`} className="btn-navy w-full py-2.5 text-xs">
                Select Options
              </Link>
            ) : (
              <button onClick={quickAdd} className="btn-navy w-full py-2.5 text-xs">
                <IconCart width={15} height={15} /> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
