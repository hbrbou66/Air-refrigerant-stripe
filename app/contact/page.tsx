"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { IconBadge } from "@/components/ui/IconBadge";
import { IconPhone, IconMail, IconPin, IconWhatsApp, IconCheck, IconHeadset } from "@/components/Icons";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const input = "field";
  const label = "field-label";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        title="Contact Air Refrigerant"
        description="Questions about products, orders, or bulk pricing? Our refrigerant specialists are here 24/7."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <div className="container-px grid gap-10 py-12 lg:grid-cols-2">
        <div>
          <div className="space-y-4">
            {[
              { icon: IconPin, t: "Address", d: `${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}, ${SITE.address.country}`, href: undefined },
              { icon: IconPhone, t: "Phone", d: SITE.phone, href: SITE.phoneHref },
              { icon: IconMail, t: "Email", d: SITE.email, href: `mailto:${SITE.email}` },
              { icon: IconWhatsApp, t: "WhatsApp", d: "Message us on WhatsApp", href: SITE.whatsapp },
              { icon: IconHeadset, t: "Hours", d: "24/7 customer support", href: undefined },
            ].map((c) => (
              <div key={c.t} className="flex items-start gap-4 rounded-card border border-line bg-white p-4 shadow-card">
                <IconBadge icon={c.icon} size="sm" />
                <div>
                  <p className="font-heading font-bold text-navy">{c.t}</p>
                  {c.href ? <a href={c.href} className="text-sm text-slate-soft hover:text-cyan">{c.d}</a> : <p className="text-sm text-slate-soft">{c.d}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-48 items-center justify-center rounded-card border border-dashed border-line bg-ice/50 text-sm text-slate-soft">
            Map placeholder — Chino, CA warehouse {/* TODO: embed Google Maps before launch */}
          </div>
        </div>

        <div>
          {status === "success" ? (
            <div className="rounded-card border border-trust/30 bg-trust/10 p-8 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-trust text-white"><IconCheck width={26} height={26} /></span>
              <h2 className="mt-4 font-heading text-xl font-bold text-navy">Thanks for reaching out</h2>
              <p className="mt-2 text-slate-soft">Your message is on its way to our team. We typically reply within one business day.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-card border border-line bg-white p-6 shadow-card">
              <h2 className="font-heading text-xl font-bold text-navy">Send us a message</h2>
              {status === "error" && (
                <p role="alert" className="mt-4 rounded-lg border border-amber/40 bg-amber/10 p-3 text-sm text-navy">
                  We couldn&apos;t send your message just now. Please email{" "}
                  <a href={`mailto:${SITE.email}`} className="font-semibold text-cyan hover:underline">{SITE.email}</a>{" "}
                  or call <a href={SITE.phoneHref} className="font-semibold text-cyan hover:underline">{SITE.phone}</a>.
                </p>
              )}
              <div className="mt-4 space-y-4">
                <div>
                  <label className={label} htmlFor="name">Name *</label>
                  <input id="name" name="name" required className={input} />
                </div>
                <div>
                  <label className={label} htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" required className={input} />
                </div>
                <div>
                  <label className={label} htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows={5} required className={input} />
                </div>
              </div>
              <button type="submit" disabled={status === "submitting"} className="btn-amber mt-5 w-full disabled:cursor-not-allowed disabled:opacity-70">
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
