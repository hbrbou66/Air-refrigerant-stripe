import { PROMO } from "@/lib/promo";
import { IconBolt, IconTruck } from "@/components/Icons";

/** Promotional inventory notice. Renders nothing when the promo is inactive. */
export function OfferBanner({ className = "" }: { className?: string }) {
  if (!PROMO.active) return null;
  return (
    <div className={`rounded-card border border-amber/40 bg-amber/10 p-4 ${className}`}>
      <p className="flex items-center gap-2 text-sm font-bold text-navy">
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber text-navy-dark">
          <IconBolt width={14} height={14} />
        </span>
        {PROMO.headline}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-slate">
        {PROMO.note}
      </p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-trust">
        <IconTruck width={13} height={13} /> Free FedEx/UPS shipping on every order
      </p>
    </div>
  );
}
