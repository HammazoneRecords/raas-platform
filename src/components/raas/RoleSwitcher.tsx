"use client";

import { useRole } from "@/lib/raas/role";
import { ROLES, ROLE_ORDER } from "@/lib/raas/wireframe";
import type { RoleId } from "@/lib/raas/wireframe";
import { cn } from "@/lib/utils";

/**
 * 7-button role switcher. Stores in localStorage. No cookies, no URL params.
 */
export function RoleSwitcher({ compact = false }: { compact?: boolean }) {
  const { role, setRole, hydrated } = useRole();

  if (compact) {
    // Compact dropdown-style horizontal pill — used on small screens.
    return (
      <div
        className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <span className="text-[10px] uppercase tracking-wider opacity-50">Role</span>
        <select
          value={hydrated ? role : "public"}
          onChange={(e) => setRole(e.target.value as RoleId)}
          className="bg-transparent text-xs text-foreground outline-none cursor-pointer"
          aria-label="Switch role"
        >
          {ROLE_ORDER.map((r) => (
            <option key={r} value={r} className="bg-[#0a0a0f] text-[#e2e8f0]">
              {ROLES[r].label}
            </option>
          ))}
        </select>
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: ROLES[hydrated ? role : "public"].color }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 p-1 bg-black/20">
      {ROLE_ORDER.map((r) => {
        const active = hydrated && role === r;
        const meta = ROLES[r];
        return (
          <button
            key={r}
            onClick={() => setRole(r)}
            aria-pressed={active}
            title={`Switch to ${meta.label} role`}
            className={cn(
              "group relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
              active
                ? "text-black"
                : "text-foreground/60 hover:text-foreground hover:bg-white/5"
            )}
            style={
              active
                ? { background: meta.color, boxShadow: `0 0 14px ${meta.color}55` }
                : undefined
            }
          >
            <span className="text-[10px] opacity-80">{meta.glyph}</span>
            <span>{meta.label}</span>
          </button>
        );
      })}
    </div>
  );
}
