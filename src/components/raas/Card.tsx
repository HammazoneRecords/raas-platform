"use client";

import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import Link from "next/link";
import { ROLES, type RoleId } from "@/lib/raas/wireframe";
import { RoleSwitcher } from "./RoleSwitcher";

/**
 * Card — titled container with optional action / footer.
 */
export function Card({
  title,
  action,
  children,
  className,
  bodyClassName,
  footer,
}: {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/5 bg-white/[0.02] p-5",
        className
      )}
    >
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && (
            <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children && <div className={cn("text-sm", bodyClassName)}>{children}</div>}
      {footer && (
        <div className="mt-4 border-t border-white/5 pt-3 text-[11px] opacity-60">
          {footer}
        </div>
      )}
    </div>
  );
}

/**
 * StatCard — label + value + sub + accent color.
 */
export function StatCard({
  label,
  value,
  sub,
  accent = "#fbbf24",
  className,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[10px] border border-white/5 bg-white/[0.025] p-4",
        className
      )}
    >
      <div
        className="text-[10px] uppercase tracking-[0.08em] opacity-50"
      >
        {label}
      </div>
      <div
        className="mt-1 text-[22px] font-bold leading-tight"
        style={{ color: accent }}
      >
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[10px] opacity-50">{sub}</div>}
    </div>
  );
}

/**
 * Pill / Badge — small status tag.
 */
export function Pill({
  children,
  color = "#94A3B8",
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  color?: string;
  variant?: "default" | "solid" | "outline";
  className?: string;
}) {
  const style: React.CSSProperties =
    variant === "solid"
      ? { background: color, color: "#0a0a0f" }
      : variant === "outline"
      ? { background: "transparent", color, border: `1px solid ${color}55` }
      : { background: `${color}1a`, color, border: `1px solid ${color}33` };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap",
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}

/**
 * NoAccess — shown when a role doesn't have permission.
 */
export function NoAccess({
  role,
  page,
  required = ["admin"],
}: {
  role: RoleId;
  page: string;
  required?: RoleId[];
}) {
  const meta = ROLES[role];
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.015] p-10 text-center">
      <div
        className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: `${meta.color}1a`, border: `1px solid ${meta.color}33` }}
      >
        <Lock className="h-6 w-6" style={{ color: meta.color }} />
      </div>
      <h2 className="text-lg font-bold">Access denied</h2>
      <p className="mt-2 text-sm opacity-70">
        Your role (
        <span style={{ color: meta.color }} className="font-medium">
          {meta.label}
        </span>
        ) doesn&apos;t have permission to view{" "}
        <span className="font-mono-raas text-foreground">{page}</span>.
      </p>
      <p className="mt-2 text-xs opacity-50">
        Required role:{" "}
        <span className="font-mono-raas">
          {required.map((r) => ROLES[r].label).join(" or ")}
        </span>
        . Switch role using the toggle in the top nav.
      </p>
      <div className="mt-5">
        <RoleSwitcher />
      </div>
      <Link
        href="/"
        className="mt-4 text-xs opacity-60 hover:opacity-100 hover:text-foreground underline-offset-4 hover:underline"
      >
        ← Back to hub
      </Link>
    </div>
  );
}

/**
 * StatusDot — small colored dot for status indicators.
 */
export function StatusDot({
  color = "#22C55E",
  pulse = false,
}: {
  color?: string;
  pulse?: boolean;
}) {
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: color }}
        />
      )}
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ background: color }}
      />
    </span>
  );
}

/**
 * Section heading.
 */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  accent = "#fbbf24",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="mb-4">
      {eyebrow && (
        <div
          className="text-[10px] uppercase tracking-[0.18em] font-medium mb-1"
          style={{ color: accent }}
        >
          {eyebrow}
        </div>
      )}
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
      {sub && <p className="mt-1.5 text-sm opacity-60 max-w-2xl">{sub}</p>}
    </div>
  );
}
