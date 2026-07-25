import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Pressure–Temperature Chart",
  description: "Reference saturated pressure–temperature values for common refrigerants including R22, R410A, R404A, R134A and R407C.",
  alternates: { canonical: "/pressure-temp-chart" },
};

// Approximate saturated gauge pressures (psig) for reference only.
// TODO: confirm values against manufacturer P–T data before launch.
const TEMPS = [-20, 0, 20, 40, 60, 80, 100, 120];
const DATA: Record<string, number[]> = {
  R22: [10.1, 24.0, 43.0, 68.5, 101.6, 143.6, 195.9, 259.9],
  R410A: [13.5, 48.0, 78.4, 118.0, 169.0, 235.0, 317.0, 418.0],
  R404A: [6.6, 23.9, 49.0, 83.0, 128.0, 185.0, 257.0, 346.0],
  R407C: [3.2, 19.5, 42.0, 71.0, 109.0, 158.0, 220.0, 296.0],
  R134A: [-6.2, 6.5, 21.7, 37.0, 57.5, 86.7, 124.3, 171.2],
  R507: [8.0, 26.0, 52.0, 87.0, 134.0, 193.0, 267.0, 358.0],
};

export default function PtChartPage() {
  return (
    <>
      <PageHero
        title="Pressure–Temperature Chart"
        description="Saturated gauge pressures (psig) for common refrigerants. Use as a quick field reference."
        breadcrumbs={[{ label: "Resources" }, { label: "Pressure–Temp Chart" }]}
      />
      <div className="container-px py-12">
        <div
          className="overflow-x-auto rounded-card border border-line"
          role="region"
          aria-label="Pressure and temperature reference table"
          tabIndex={0}
        >
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Refrigerant</th>
                {TEMPS.map((t) => (
                  <th key={t} className="px-4 py-3 text-right font-semibold">{t}°F</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-white">
              {Object.entries(DATA).map(([code, vals]) => (
                <tr key={code}>
                  <td className="px-4 py-3 font-bold text-navy">{code}</td>
                  {vals.map((v, i) => (
                    <td key={i} className="px-4 py-3 text-right tabular-nums text-slate">{v.toFixed(1)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 rounded-card border border-line bg-ice/40 p-4 text-sm text-slate-soft">
          Values are approximate saturated gauge pressures (psig) for reference only and must not replace
          manufacturer data or proper gauges. {/* TODO: validate against official P–T tables; add downloadable PDF. */}
          For A2L refrigerants (R32, R454B), follow flammability handling procedures.
        </p>
      </div>
    </>
  );
}
