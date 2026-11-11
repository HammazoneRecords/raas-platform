"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RoleSwitcher } from "./RoleSwitcher";
import { useRole } from "@/lib/raas/role";
import { ROLES, PAGES, PAGE_BY_ID } from "@/lib/raas/wireframe";
import { cn } from "@/lib/utils";

/**
 * Top navigation bar — sticky, dark, with logo (left), portal links (center),
 * role switcher (right). NO cookies.
 */
const PORTAL_LINKS: { id: string; label: string; href: string }[] = [
  { id: "hub", label: "Hub", href: "/" },
  { id: "adtl_marketplace", label: "Marketplace", href: "/marketplace" },
  { id: "cultural_api_dev_portal", label: "Cultural API", href: "/dev" },
  { id: "raas_records_buyer", label: "RAAS Records", href: "/dev/raas-records" },
  { id: "investor_portal", label: "Investor", href: "/investor" },
];

export function TopNav() {
  const pathname = usePathname();
  const { role, hydrated } = useRole();
  const roleMeta = ROLES[hydrated ? role : "public"];

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl"
      style={{ background: "rgba(10, 10, 15, 0.85)" }}
    >
      <div className="mx-auto flex h-14 max-w-[1280px] items-center gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-md font-mono-raas text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              color: "#0a0a0f",
            }}
          >
            R
          </span>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-xs font-bold tracking-tight">RAAS</span>
            <span className="text-[9px] opacity-50 uppercase tracking-[0.18em]">
              MindWave JA
            </span>
          </div>
        </Link>

        {/* Portal links */}
        <nav className="hidden md:flex items-center gap-1 mx-auto">
          {PORTAL_LINKS.map((link) => {
            // The hub "/" is special — only match exact "/".
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "bg-white/5 text-foreground"
                    : "text-foreground/55 hover:text-foreground hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1 md:hidden" />

        {/* Role indicator + switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[10px]">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: roleMeta.color }}
            />
            <span className="opacity-50 uppercase tracking-wider">Role</span>
            <span className="font-medium" style={{ color: roleMeta.color }}>
              {roleMeta.label}
            </span>
          </div>
          <RoleSwitcher compact />
        </div>
      </div>
    </header>
  );
}
