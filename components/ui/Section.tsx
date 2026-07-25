import Link from "next/link";
import { IconStar } from "@/components/Icons";

export function SectionHeading({
  eyebrow,
  title,
  description,
  cta,
  center,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  center?: boolean;
}) {
  return (
    <div
      className={`mb-8 flex flex-col gap-4 ${
        center ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={`eyebrow mb-2 ${center ? "justify-center" : ""}`}>
            <span className="h-px w-6 bg-cyan/50" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-h2 text-balance text-navy">{title}</h2>
        {description && <p className="mt-2.5 text-slate-soft">{description}</p>}
      </div>
      {cta && (
        <Link href={cta.href} className="btn-outline shrink-0 whitespace-nowrap px-4 py-2.5 text-sm">
          {cta.label}
        </Link>
      )}
    </div>
  );
}

export function Stars({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <div
      className="flex gap-0.5 text-amber"
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <IconStar key={i} width={size} height={size} />
      ))}
    </div>
  );
}
