import Link from "next/link";

export function Breadcrumbs({
  items,
  light = false,
}: {
  items: { label: string; href?: string }[];
  light?: boolean;
}) {
  const base = light ? "text-white/70" : "text-slate-soft";
  const link = light ? "hover:text-white" : "hover:text-navy";
  const current = light ? "text-white" : "text-navy";
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${base}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className={link}>
            Home
          </Link>
        </li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-1.5">
            <span aria-hidden className="opacity-50">
              /
            </span>
            {it.href ? (
              <Link href={it.href} className={link}>
                {it.label}
              </Link>
            ) : (
              <span className={`font-medium ${current}`}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  title,
  description,
  breadcrumbs,
  children,
}: {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line/70 bg-hero-light">
      <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
      <div className="container-px relative py-12 lg:py-16">
        {breadcrumbs && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <h1 className="text-h1 text-balance text-navy">{title}</h1>
        {description && <p className="mt-3 max-w-2xl leading-relaxed text-slate">{description}</p>}
        {children}
      </div>
    </section>
  );
}
