"use client";

import Image from "next/image";
import { useState } from "react";
import { REVIEWS } from "@/lib/site";
import { Stars } from "@/components/ui/Section";
import { IconChevron } from "@/components/Icons";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = REVIEWS.length;
  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <div>
      {/* Mobile: single-card carousel */}
      <div className="sm:hidden">
        <ReviewCard index={index} />
        <div className="mt-5 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous review" className="rounded-full border border-line p-2 text-navy hover:bg-ice">
            <IconChevron width={18} height={18} className="rotate-90" />
          </button>
          <div className="flex gap-1.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-cyan" : "bg-ice"}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next review" className="rounded-full border border-line p-2 text-navy hover:bg-ice">
            <IconChevron width={18} height={18} className="-rotate-90" />
          </button>
        </div>
      </div>

      {/* Desktop: grid of all 6 */}
      <div className="hidden grid-cols-2 gap-6 sm:grid lg:grid-cols-3">
        {REVIEWS.map((_, i) => (
          <ReviewCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ index }: { index: number }) {
  const r = REVIEWS[index];
  return (
    <figure className="flex h-full flex-col rounded-card border border-line bg-white p-5 shadow-card">
      <Stars />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate">“{r.quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
        <span className="relative h-11 w-11 overflow-hidden rounded-full bg-ice">
          <Image src={r.image} alt={r.name} fill sizes="44px" className="object-cover" />
        </span>
        <span>
          <span className="block text-sm font-bold text-navy">{r.name}</span>
          <span className="block text-xs text-slate-soft">{r.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
