import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { EpaNotice } from "@/components/EpaNotice";
import { REFRIGERANT_TYPES } from "@/lib/catalog";
import { IconDoc } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Safety Data Sheets (SDS)",
  description: "Download Safety Data Sheets (SDS) for R22, R410A, R404A, R32, R134A and other refrigerants we supply.",
  alternates: { canonical: "/safety-data-sheets" },
};

export default function SdsPage() {
  return (
    <>
      <PageHero
        title="Safety Data Sheets (SDS)"
        description="Reference the SDS for each refrigerant before handling. Always follow EPA, DOT, and manufacturer guidance."
        breadcrumbs={[{ label: "Resources" }, { label: "Safety Data Sheets" }]}
      />
      <div className="container-px py-12">
        <div className="mb-8"><EpaNotice /></div>

        <div className="overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-ice/70 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-navy">Refrigerant</th>
                <th className="px-4 py-3 font-semibold text-navy">ASHRAE Class</th>
                <th className="px-4 py-3 font-semibold text-navy">SDS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-white">
              {REFRIGERANT_TYPES.map((code) => (
                <tr key={code}>
                  <td className="px-4 py-3 font-semibold text-navy">{code}</td>
                  <td className="px-4 py-3 text-slate-soft">{["R32", "R454B"].includes(code) ? "A2L (mildly flammable)" : "A1 (non-flammable)"}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:support@airrefrigerant.shop?subject=${encodeURIComponent(`SDS request — ${code}`)}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-cyan hover:underline"
                      aria-label={`Request ${code} Safety Data Sheet by email`}
                    >
                      <IconDoc width={16} height={16} /> Download PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 rounded-card border border-line bg-ice/40 p-4 text-sm text-slate-soft">
          {/* TODO: upload official manufacturer SDS PDFs to /public/sds/ and link them here before launch. */}
          SDS documents are being finalized. For an immediate copy of any Safety Data Sheet, email{" "}
          <a href="mailto:support@airrefrigerant.shop" className="font-semibold text-cyan hover:underline">support@airrefrigerant.shop</a>{" "}
          and we&apos;ll send it the same business day.
        </p>
      </div>
    </>
  );
}
