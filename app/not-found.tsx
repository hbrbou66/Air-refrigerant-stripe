import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-hero-light">
      <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
      <div className="container-px relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-heading text-6xl font-bold text-cyan">404</p>
        <h1 className="mt-4 font-heading text-3xl font-bold text-navy">Page not found</h1>
        <p className="mt-3 max-w-md text-slate">
          The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back to the refrigerants.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-amber">Back to Home</Link>
          <Link href="/collections/all" className="btn-outline">Shop All Refrigerants</Link>
        </div>
      </div>
    </section>
  );
}
