import Link from "next/link";
import { IconShield } from "@/components/Icons";

export function EpaNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-card border border-amber/40 bg-amber/10 ${compact ? "p-3" : "p-4"}`}>
      <div className="flex gap-3">
        <IconShield width={compact ? 18 : 22} height={compact ? 18 : 22} className="mt-0.5 flex-shrink-0 text-amber-ink" />
        <div className="text-sm text-slate">
          <p className="font-semibold text-navy">EPA Section 608 Certification Notice</p>
          <p className="mt-1 text-slate-soft">
            Many refrigerants (including R-22 and R-410A) are regulated and may only be sold to EPA Section 608
            certified technicians, or for resale. By purchasing you confirm you meet these requirements. Always
            review the{" "}
            <Link href="/safety-data-sheets" className="font-semibold text-cyan hover:underline">Safety Data Sheet (SDS)</Link>{" "}
            before handling.
            {/* TODO: confirm certification-verification requirements with owner/legal before launch. */}
          </p>
        </div>
      </div>
    </div>
  );
}
