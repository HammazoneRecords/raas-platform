"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRole } from "@/lib/raas/role";
import { ROLES } from "@/lib/raas/wireframe";
import { cn } from "@/lib/utils";
import { useState } from "react";

const PORTAL_LINKS: { id: string; label: string; href: string }[] = [
  { id: "hub", label: "Hub", href: "/" },
  { id: "adtl_marketplace", label: "Marketplace", href: "/marketplace" },
  { id: "cultural_api_dev_portal", label: "Cultural API", href: "/dev" },
  { id: "raas_records_buyer", label: "RAAS Records", href: "/dev/raas-records" },
  { id: "investor_portal", label: "Investor", href: "/investor" },
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, user, hydrated, clearSession } = useRole();
  const roleMeta = ROLES[hydrated ? role : "public"];
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    clearSession();
    setMenuOpen(false);
    router.push("/");
  };

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

        {/* Auth area */}
        <div className="flex items-center gap-3">
          {hydrated && user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3 text-xs hover:bg-white/[0.06]"
                aria-label="User menu"
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    background: `${roleMeta.color}1a`,
                    color: roleMeta.color,
                    border: `1px solid ${roleMeta.color}33`,
                  }}
                >
                  {roleMeta.glyph}
                </span>
                <span className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="font-medium max-w-[120px] truncate">
                    {user.displayName}
                  </span>
                  <span
                    className="text-[9px] uppercase tracking-wider"
                    style={{ color: roleMeta.color }}
                  >
                    {roleMeta.label}
                  </span>
                </span>
              </button>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/10 bg-[#0f0f17] p-2 shadow-xl z-50">
                    <div className="px-3 py-2 border-b border-white/5 mb-2">
                      <div className="text-xs font-medium truncate">{user.displayName}</div>
                      <div className="text-[10px] opacity-60 font-mono-raas truncate">{user.email}</div>
                    </div>
                    <Link
                      href="/maze"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-md px-3 py-2 text-xs hover:bg-white/5"
                    >
                      Maze visualizer →
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full rounded-md px-3 py-2 text-left text-xs text-[#EF4444] hover:bg-[#EF4444]/[0.06]"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : hydrated ? (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-[#fbbf24] px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#f59e0b] hidden sm:block"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="h-7 w-16 rounded-md bg-white/[0.03] animate-pulse" />
          )}
        </div>
      </div>
    </header>
  );
}
