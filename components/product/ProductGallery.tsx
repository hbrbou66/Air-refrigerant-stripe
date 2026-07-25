"use client";

import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/lib/catalog";
import type { Product } from "@/lib/types";

/* Gallery modeled on the golf-lounge product gallery: one large square image
   with a tidy 5-up thumbnail grid beneath it. Adapted to the Air Refrigerant
   light palette, with the refrigerant-code and sale badges retained. */
export function ProductGallery({ product }: { product: Product }) {
  const images = product.images.length ? product.images : [];
  const [active, setActive] = useState(0);
  const saving =
    product.minComparePrice && product.minComparePrice > product.minPrice
      ? product.minComparePrice - product.minPrice
      : 0;

  return (
    <div className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <div className="relative aspect-square overflow-hidden rounded-card border border-line bg-white shadow-card">
        <span className="badge absolute left-4 top-4 z-10 bg-navy text-white">{product.refrigerantCode}</span>
        {saving > 0 && (
          <span className="badge absolute right-4 top-4 z-10 bg-amber text-navy-dark">
            Save {formatPrice(saving, product.currency)}
          </span>
        )}
        {images[active] && (
          <Image
            src={images[active]}
            alt={product.name}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-contain p-6"
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.slice(0, 10).map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={active === i}
              className={`relative aspect-square overflow-hidden rounded-xl bg-white transition-all ${
                active === i ? "ring-2 ring-cyan" : "ring-1 ring-line hover:ring-cyan/50"
              }`}
            >
              <Image
                src={src}
                alt={`${product.name} thumbnail ${i + 1}`}
                fill
                sizes="100px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
