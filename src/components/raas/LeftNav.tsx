"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PAGE_BY_ID, ROLES, type WireframePage, type RoleId } from "@/lib/raas/wireframe";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Left navigation bar built from the wireframe `navBar` for the current portal.
 * Collapsible on mobile (just renders as a horizontal scroll list).
 */
export function LeftNav({ navBar, accent }: { navBar: string[]; accent: string }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Portal navigation"
      className="w-full md:w-56 shrink-0"
    >
      <div
        className="rounded-xl border border-white/5 p-2 bg-white/[0.015] overflow-x-auto md:overflow-x-visible"
        style={{ borderColor: `${accent}22` }}
      >
        <div className="flex md:flex-col gap-1 min-w-max md:min-w-0">
          {navBar.map((pageId) => {
            const page: WireframePage | undefined = PAGE_BY_ID[pageId];
            if (!page) return null;
            const active = pathname === page.route || pathname.startsWith(page.route + "/");
            return (
              <Link
                key={pageId}
                href={page.route}
                className={cn(
                  "group flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors",
                  active
                    ? "text-foreground"
                    : "text-foreground/55 hover:text-foreground hover:bg-white/5"
                )}
                style={
                  active
                    ? { background: `${accent}1a`, boxShadow: `inset 2px 0 0 ${accent}` }
                    : undefined
                }
              >
                <span className="truncate">{page.title}</span>
                {!active && (
                  <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-50" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/**
 * Portal badge — small role-colored tag.
 */
export function PortalBadge({ role }: { role: RoleId }) {
  const meta = ROLES[role];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ background: `${meta.color}1a`, color: meta.color, border: `1px solid ${meta.color}33` }}
    >
      <span>{meta.glyph}</span>
      {meta.label} portal
    </span>
  );
}
