"use client";

import { useState } from "react";
import { REFRIGERANT_TYPES } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { IconCheck, IconTruck, IconPhone, IconStack, IconLock } from "@/components/Icons";

type Status = "idle" | "submitting" | "success" | "error";

export default function RequestQuotePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    refrigerant: REFRIGERANT_TYPES[0], cylinders: "10", message: "",
  });

  function update(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "quote", ...form }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const input = "field";
  const label = "field-label";

  return (
    <>
      <PageHero
        title="Request a Bulk Quote"
        description="Tell us what you need and we'll send wholesale, factory-direct pricing — fast. Free FedEx/UPS shipping on every order, no hazmat fees."
        breadcrumbs={[{ label: "Request a Quote" }]}
      >
        <span className="badge mt-4 bg-amber text-navy-dark">B2B · Wholesale</span>
      </PageHero>

      <div className="container-px grid gap-10 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {status === "success" ? (
            <div className="rounded-card border border-trust/30 bg-trust/10 p-8 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-trust text-white"><IconCheck width={26} height={26} /></span>
              <h2 className="mt-4 font-heading text-xl font-bold text-navy">Quote request received</h2>
              <p className="mt-2 text-slate-soft">Thanks — our team will reply with factory-direct pricing, usually within one business day. Need it sooner? Call {SITE.phone}.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-card border border-line bg-white p-6 shadow-card">
              {status === "error" && (
                <p role="alert" className="mb-4 rounded-lg border border-amber/40 bg-amber/10 p-3 text-sm text-navy">
                  We couldn&apos;t submit your request just now. Please email{" "}
                  <a href={`mailto:${SITE.email}`} className="font-semibold text-cyan hover:underline">{SITE.email}</a>{" "}
                  or call <a href={SITE.phoneHref} className="font-semibold text-cyan hover:underline">{SITE.phone}</a>.
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="name">Full name *</label>
                  <input id="name" required className={input} value={form.name} onChange={(e) => update("name", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="company">Company</label>
                  <input id="company" className={input} value={form.company} onChange={(e) => update("company", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="email">Email *</label>
                  <input id="email" type="email" required className={input} value={form.email} onChange={(e) => update("email", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" className={input} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div>
                  <label className={label} htmlFor="refrigerant">Refrigerant type *</label>
                  <select id="refrigerant" className={input} value={form.refrigerant} onChange={(e) => update("refrigerant", e.target.value)}>
                    {REFRIGERANT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="cylinders">Quantity (cylinders) *</label>
                  <select id="cylinders" className={input} value={form.cylinders} onChange={(e) => update("cylinders", e.target.value)}>
                    {["5", "10", "20", "30", "40", "50+"].map((q) => <option key={q} value={q}>{q}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className={label} htmlFor="message">Details</label>
                <textarea id="message" rows={4} className={input} placeholder="Sizes, delivery timeline, destination ZIP, EPA certification…" value={form.message} onChange={(e) => update("message", e.target.value)} />
              </div>
              <button type="submit" disabled={status === "submitting"} className="btn-amber mt-5 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-10">
                {status === "submitting" ? "Sending…" : "Send Quote Request"}
              </button>
              <p className="mt-3 text-xs text-slate-soft">By submitting you confirm you meet EPA Section 608 requirements or are purchasing for resale. {/* TODO: confirm verification flow */}</p>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          {[
            { icon: IconTruck, t: "Free shipping", d: "FedEx/UPS on every order, no hazmat fees." },
            { icon: IconStack, t: "Deep inventory", d: "5–40 cylinder packs in U.S. stock." },
            { icon: IconLock, t: "Secure payment", d: "Trusted, encrypted checkout." },
          ].map((c) => (
            <FeatureCard key={c.t} icon={c.icon} title={c.t} body={c.d} iconSize="sm" />
          ))}
          <a href={SITE.phoneHref} className="flex items-center gap-3 rounded-card bg-navy p-5 text-white">
            <IconPhone width={22} height={22} className="text-cyan-soft" />
            <span>
              <span className="block text-sm text-white/70">Prefer to talk?</span>
              <span className="font-heading text-lg font-bold">{SITE.phone}</span>
            </span>
          </a>
        </aside>
      </div>
    </>
  );
}
