"use client";

import { useState } from "react";
import { IconMail, IconCheck } from "@/components/Icons";

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="container-px section">
      <div className="relative overflow-hidden rounded-xl2 border border-line/70 bg-mist-soft px-6 py-12 text-center sm:px-12">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-amber/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-xl">
          <h2 className="text-h2 text-balance text-navy">
            Get refrigerant deals &amp; restock alerts
          </h2>
          <p className="mx-auto mt-3 text-slate">
            Join 1,200+ HVAC pros. Bulk pricing drops, new stock, and compliance updates — no spam.
          </p>
          {done ? (
            <p className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-pill bg-trust-soft px-4 py-3 font-semibold text-trust">
              <IconCheck width={18} height={18} /> You&apos;re subscribed — welcome aboard!
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <div className="flex flex-1 items-center rounded-pill border border-line bg-white px-4 shadow-soft">
                <IconMail width={18} height={18} className="text-slate-soft" />
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="w-full bg-transparent px-2 py-3 text-sm text-slate outline-none"
                />
              </div>
              <button type="submit" className="btn-amber">
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-slate-soft">{/* TODO: connect to email provider (Klaviyo/Mailchimp) before launch. */}</p>
        </div>
      </div>
    </section>
  );
}
