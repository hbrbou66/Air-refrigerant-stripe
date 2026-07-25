"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { deriveShipStatus, type ShipStatus } from "@/lib/order-status";
import { IconBox, IconPhone, IconMail, IconTruck } from "@/components/Icons";

interface FoundOrder {
  friendlyId: string;
  createdAt: string;
  status: string | null;
  city: string | null;
  state: string | null;
}

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "found"; order: FoundOrder; status: ShipStatus }
  | { kind: "notfound" }
  | { kind: "error"; message: string };

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, email }),
      });
      if (res.status === 503) {
        setState({ kind: "error", message: "not_configured" });
        return;
      }
      const data = await res.json().catch(() => null);
      if (!data) {
        setState({ kind: "error", message: "generic" });
        return;
      }
      if (!data.found) {
        setState({ kind: "notfound" });
        return;
      }
      const order = data.order as FoundOrder;
      const status = deriveShipStatus(order.createdAt, { city: order.city, status: order.status });
      setState({ kind: "found", order, status });
    } catch {
      setState({ kind: "error", message: "generic" });
    }
  }

  return (
    <>
      <PageHero
        title="Track Your Order"
        description="Enter the Stripe checkout reference from your confirmation page or receipt to see your order status."
        breadcrumbs={[{ label: "Track Order" }]}
      />

      <div className="container-px grid gap-8 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={onSubmit} className="rounded-card border border-line bg-white p-6 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="order" className="field-label">Order number</label>
                <input
                  id="order"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. cs_test_… or cs_live_…"
                  className="field"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="field-label">Email (optional verification)</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="field"
                  autoComplete="email"
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-soft">
              Your checkout reference starts with <strong>cs_</strong>. Add your email for an extra identity check.
            </p>
            <button type="submit" className="btn-navy mt-4" disabled={state.kind === "loading"}>
              <IconBox width={18} height={18} />
              {state.kind === "loading" ? "Checking…" : "Track Order"}
            </button>
          </form>

          {/* Result */}
          {state.kind === "found" && <OrderResult order={state.order} status={state.status} />}

          {state.kind === "notfound" && (
            <div className="mt-6 rounded-card border border-amber/40 bg-amber/10 p-5 text-sm text-slate">
              <p className="font-semibold text-navy">We couldn&apos;t find that order.</p>
              <p className="mt-1 text-slate-soft">
                Double-check the Stripe checkout reference and email. If you just ordered, it may take a few minutes to appear.
                Still stuck? Contact us and we&apos;ll locate it for you.
              </p>
            </div>
          )}

          {state.kind === "error" && (
            <div className="mt-6 rounded-card border border-line bg-ice p-5 text-sm text-slate">
              <p className="font-semibold text-navy">Order lookup is temporarily unavailable.</p>
              <p className="mt-1 text-slate-soft">
                Please use the tracking link in your confirmation email, or contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-cyan hover:underline">{SITE.email}</a>{" "}
                and we&apos;ll help right away.
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-card border border-line bg-ice p-6">
          <h2 className="font-heading text-lg font-bold text-navy">Need help with an order?</h2>
          <p className="mt-2 text-sm text-slate-soft">Our team can locate any order and resend tracking.</p>
          <a href={SITE.phoneHref} className="mt-4 flex items-center gap-2 font-semibold text-navy hover:text-cyan">
            <IconPhone width={18} height={18} className="text-cyan" /> {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="mt-2 flex items-center gap-2 font-semibold text-navy hover:text-cyan">
            <IconMail width={18} height={18} className="text-cyan" /> {SITE.email}
          </a>
        </aside>
      </div>
    </>
  );
}

function OrderResult({ order, status }: { order: FoundOrder; status: ShipStatus }) {
  const inTransit = status.key === "in_transit" || status.key === "delivered";
  const Icon = inTransit ? IconTruck : IconBox;
  const placed = fmtDate(order.createdAt);

  return (
    <div className="mt-6 overflow-hidden rounded-card border border-line bg-white shadow-card">
      <div className="flex items-center gap-4 border-b border-line bg-ice px-6 py-5">
        <span
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
            status.key === "cancelled" ? "bg-slate-soft/15 text-slate" : "bg-cyan/10 text-cyan"
          }`}
        >
          <Icon width={24} height={24} />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-soft">
            Order <span className="break-all">{order.friendlyId}</span>
          </p>
          <p className="font-heading text-xl font-bold text-navy">{status.label}</p>
        </div>
      </div>
      <div className="px-6 py-5">
        <p className="text-slate">{status.detail}</p>
        <dl className="mt-4 grid gap-2 text-sm">
          {placed && (
            <div className="flex justify-between gap-4">
              <dt className="text-slate-soft">Order placed</dt>
              <dd className="font-semibold text-navy">{placed}</dd>
            </div>
          )}
          {(order.city || order.state) && (
            <div className="flex justify-between gap-4">
              <dt className="text-slate-soft">Shipping to</dt>
              <dd className="font-semibold text-navy">{[order.city, order.state].filter(Boolean).join(", ")}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
