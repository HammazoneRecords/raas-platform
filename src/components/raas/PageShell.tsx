"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopNav } from "./TopNav";
import { LeftNav } from "./LeftNav";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { ROLES, type RoleId, type WireframePage } from "@/lib/raas/wireframe";

/**
 * PageShell — wraps every portal page. Provides:
 *  - TopNav (logo, portal links, role switcher)
 *  - Breadcrumbs
 *  - Optional LeftNav (when `page.navBar.length > 1`)
 *  - Footer
 */
export function PageShell({
  page,
  breadcrumbs,
  children,
  showLeftNav = true,
  hero,
}: {
  page: WireframePage;
  breadcrumbs: Crumb[];
  children: React.ReactNode;
  showLeftNav?: boolean;
  hero?: React.ReactNode;
}) {
  const accent = ROLES[page.portal].color;
  const hasLeftNav = showLeftNav && page.navBar.length > 1;
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      {hero}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 md:px-6">
        <Breadcrumbs items={breadcrumbs} />
        <div className={hasLeftNav ? "flex flex-col md:flex-row gap-6" : ""}>
          {hasLeftNav && (
            <aside className="md:sticky md:top-20 md:self-start">
              <LeftNav navBar={page.navBar} accent={accent} />
            </aside>
          )}
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Footer — RAAS tagline.
 */
export function Footer() {
  return (
    <footer
      className="border-t border-white/5 py-5 text-center"
      style={{ background: "rgba(255,255,255,0.012)" }}
    >
      <p className="text-[11px] opacity-50">
        Out of silence comes sound · Out of sound comes power · RAAS · MindWave JA
      </p>
    </footer>
  );
}

/**
 * PageHeader — title block used at the top of every page.
 */
export function PageHeader({
  eyebrow,
  title,
  sub,
  accent = "#fbbf24",
  right,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  accent?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <div
            className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {sub && <div className="mt-1.5 max-w-2xl text-sm opacity-60">{sub}</div>}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

/**
 * PortalBadge — small colored chip showing which portal this page belongs to.
 */
export function PortalBadgeSimple({ role }: { role: RoleId }) {
  const meta = ROLES[role];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{
        background: `${meta.color}1a`,
        color: meta.color,
        border: `1px solid ${meta.color}33`,
      }}
    >
      <span>{meta.glyph}</span>
      {meta.label} portal
    </span>
  );
}

/**
 * LinkCard — a card that's also a link (used in dashboard grids).
 */
export function LinkCard({
  href,
  title,
  desc,
  accent = "#fbbf24",
}: {
  href: string;
  title: string;
  desc?: string;
  accent?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.04]"
      style={{ borderLeft: `2px solid ${accent}55` }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <span
          className="text-[10px] opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: accent }}
        >
          →
        </span>
      </div>
      {desc && <p className="mt-1 text-xs opacity-55">{desc}</p>}
    </Link>
  );
}
