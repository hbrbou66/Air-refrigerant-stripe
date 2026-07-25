import Link from "next/link";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  // Colors mirror the Tailwind tokens exactly: navy #0b2a48, cyan #1683c4,
  // cyan-soft #9fd2f0, slate-soft #61707f.
  const wordColor = variant === "light" ? "#ffffff" : "#0b2a48";
  const subColor = variant === "light" ? "#9fd2f0" : "#61707f";
  return (
    <Link href="/" aria-label="Air Refrigerant home" className="inline-flex items-center gap-2.5">
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#0b2a48" />
        <circle cx="24" cy="24" r="22" stroke="#1683c4" strokeWidth="3" />
        <g stroke="#9fd2f0" strokeWidth="2.2" strokeLinecap="round">
          <path d="M24 12v24M12 24h24M15.5 15.5l17 17M32.5 15.5l-17 17" />
          <path d="M24 12l-3 3M24 12l3 3M24 36l-3-3M24 36l3-3M12 24l3-3M12 24l3 3M36 24l-3-3M36 24l-3 3" />
        </g>
        <circle cx="24" cy="24" r="3.4" fill="#1683c4" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold tracking-tight" style={{ color: wordColor }}>
          Air Refrigerant
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: subColor }}>
          EPA-Certified Supply
        </span>
      </span>
    </Link>
  );
}
