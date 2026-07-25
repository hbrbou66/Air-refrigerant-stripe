"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/Logo";
import { useCart } from "@/components/cart/CartProvider";
import {
  IconCart, IconPhone, IconSearch, IconChevron, IconMenu, IconClose,
} from "@/components/Icons";
import { SITE } from "@/lib/site";
import {
  TYPE_COLLECTIONS, SIZE_COLLECTIONS, APPLICATION_COLLECTIONS, BULK_OPTIONS,
} from "@/lib/catalog";

interface MenuGroup {
  label: string;
  href: string;
  columns?: { heading: string; links: { label: string; href: string }[] }[];
}

const RESOURCES = [
  { label: "Safety Data Sheets (SDS)", href: "/safety-data-sheets" },
  { label: "Pressure-Temperature Chart", href: "/pressure-temp-chart" },
  { label: "Track Order", href: "/track-order" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Slimmed to 4 top-level items — the old header had six overlapping menus.
const MENU: MenuGroup[] = [
  {
    label: "Shop Refrigerants",
    href: "/collections/all",
    columns: [
      {
        heading: "By Refrigerant",
        links: TYPE_COLLECTIONS.map((c) => ({ label: c.title, href: `/collections/${c.slug}` })),
      },
      {
        heading: "By Size",
        links: SIZE_COLLECTIONS.map((c) => ({ label: c.title, href: `/collections/${c.slug}` })),
      },
      {
        heading: "By Application",
        links: APPLICATION_COLLECTIONS.map((c) => ({ label: c.title, href: `/collections/${c.slug}` })),
      },
    ],
  },
  {
    label: "Bulk & Wholesale",
    href: "/collections/bulk-cylinders",
    columns: [
      {
        heading: "Cylinder Packs",
        links: BULK_OPTIONS.map((b) => ({ label: `${b.label} — Bulk Pricing`, href: "/collections/bulk-cylinders" })),
      },
      {
        heading: "Get a Quote",
        links: [{ label: "Request a Bulk Quote", href: "/request-a-quote" }],
      },
    ],
  },
  {
    label: "Resources",
    href: "/about",
    columns: [{ heading: "Resources & Support", links: RESOURCES }],
  },
];

export function Header() {
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const router = useRouter();

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="container-px flex h-16 items-center gap-3 lg:h-[72px]">
        <button
          className="-ml-1.5 rounded-lg p-2 text-navy hover:bg-ice lg:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <IconMenu width={24} height={24} />
        </button>

        <Logo />

        <nav className="ml-1.5 hidden flex-1 items-center gap-0.5 lg:flex xl:ml-3" aria-label="Primary">
          {MENU.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(group.label)}
              onMouseLeave={() => setOpenGroup(null)}
              onFocus={() => setOpenGroup(group.label)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenGroup(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpenGroup(null);
              }}
            >
              <Link
                href={group.href}
                className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-[15px] font-semibold text-slate hover:bg-ice hover:text-navy xl:px-3"
                onClick={() => setOpenGroup(null)}
                aria-haspopup={group.columns ? "true" : undefined}
                aria-expanded={group.columns ? openGroup === group.label : undefined}
              >
                {group.label}
                {group.columns && (
                  <IconChevron
                    width={14}
                    height={14}
                    className={`transition-transform ${openGroup === group.label ? "rotate-180" : ""}`}
                  />
                )}
              </Link>
              {group.columns && openGroup === group.label && (
                <div className="absolute left-0 top-full z-50 pt-2">
                  <div className="animate-fade-in grid w-max grid-flow-col gap-8 rounded-card border border-line bg-white p-6 shadow-lift">
                    {group.columns.map((col) => (
                      <div key={col.heading} className="min-w-[190px]">
                        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-cyan">{col.heading}</p>
                        <ul className="space-y-0.5">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                onClick={() => setOpenGroup(null)}
                                className="block rounded-lg px-2.5 py-2 text-sm text-slate hover:bg-ice hover:text-navy"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <form onSubmit={onSearch} className="hidden items-center md:flex">
            <div className="flex items-center rounded-pill border border-line bg-ice px-3 transition-colors focus-within:border-cyan focus-within:bg-white">
              <IconSearch width={16} height={16} className="text-slate-soft" />
              <input
                name="q"
                type="search"
                placeholder="Search refrigerants…"
                aria-label="Search refrigerants"
                className="w-32 bg-transparent px-2 py-2 text-sm outline-none xl:w-44"
              />
            </div>
          </form>

          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-1.5 rounded-pill px-3 py-2 text-sm font-semibold text-navy hover:bg-ice xl:flex"
          >
            <IconPhone width={16} height={16} className="text-cyan" />
            {SITE.phone}
          </a>

          <Link href="/request-a-quote" className="btn-amber hidden px-3 py-2.5 text-sm lg:inline-flex xl:px-4">
            Request a Quote
          </Link>

          <button
            onClick={openCart}
            aria-label={`Cart, ${count} items`}
            className="relative rounded-lg p-2 text-navy hover:bg-ice"
          >
            <IconCart width={24} height={24} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber px-1 text-[11px] font-bold text-navy-dark">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} close={() => setMobileOpen(false)} onSearch={onSearch} />
    </header>
  );
}

function MobileMenu({
  open,
  close,
  onSearch,
}: {
  open: boolean;
  close: () => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [section, setSection] = useState<string | null>("Shop Refrigerants");
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Close on route change
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock background scroll + close on Escape while open
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!mounted || !open) return null;

  // Render at document.body so the drawer is never trapped inside the
  // backdrop-blurred <header> (which breaks position:fixed on iOS Safari).
  return createPortal(
    <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="animate-fade-in absolute inset-0 bg-navy-dark/60 backdrop-blur-sm" onClick={close} />
      <div className="animate-slide-in absolute left-0 top-0 flex h-[100dvh] w-[90%] max-w-sm flex-col bg-white shadow-lift">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo />
          <button
            onClick={close}
            aria-label="Close menu"
            className="rounded-full p-2 text-slate-soft hover:bg-ice hover:text-navy"
          >
            <IconClose />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <form onSubmit={onSearch} className="mb-4">
            <div className="flex items-center rounded-pill border border-line bg-ice px-3 focus-within:border-cyan focus-within:bg-white">
              <IconSearch width={18} height={18} className="text-slate-soft" />
              <input
                name="q"
                type="search"
                placeholder="Search refrigerants…"
                aria-label="Search refrigerants"
                className="w-full bg-transparent px-2 py-3 text-sm outline-none"
              />
            </div>
          </form>

          <nav className="space-y-1" aria-label="Mobile">
            <Link
              href="/collections/all"
              onClick={close}
              className="block rounded-lg px-3 py-3 font-semibold text-navy hover:bg-ice"
            >
              All Refrigerants
            </Link>

            {MENU.filter((g) => g.columns).map((g) => (
              <div key={g.label} className="border-t border-line">
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left font-semibold text-navy hover:bg-ice"
                  onClick={() => setSection(section === g.label ? null : g.label)}
                  aria-expanded={section === g.label}
                >
                  {g.label}
                  <IconChevron
                    width={16}
                    height={16}
                    className={`text-slate-soft transition-transform ${section === g.label ? "rotate-180" : ""}`}
                  />
                </button>
                {section === g.label && (
                  <div className="space-y-0.5 pb-2 pl-3">
                    {g.columns!.flatMap((c) => c.links).map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={close}
                        className="block rounded-lg px-3 py-2.5 text-sm text-slate-soft hover:bg-ice hover:text-navy"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="space-y-3 border-t border-line px-5 py-4">
          <Link href="/request-a-quote" onClick={close} className="btn-amber w-full">
            Request a Quote
          </Link>
          <a href={SITE.phoneHref} className="btn-outline w-full">
            <IconPhone width={16} height={16} /> {SITE.phone}
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
