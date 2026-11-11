"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, Pill, StatusDot } from "@/components/raas/Card";
import { useRole } from "@/lib/raas/role";
import {
  PAGES,
  ROLES,
  ROLE_ORDER,
  viewersOf,
  PERMISSION_COUNT,
  pageById,
  type RoleId,
  type WireframePage,
} from "@/lib/raas/wireframe";

const page = pageById("hub")!; // maze is a meta-page; uses hub metadata for shell

// Map role → color
const ROLE_COLOR: Record<RoleId, string> = {
  public: ROLES.public.color,
  artist: ROLES.artist.color,
  fan: ROLES.fan.color,
  b2b_dev: ROLES.b2b_dev.color,
  investor: ROLES.investor.color,
  admin: ROLES.admin.color,
  archivist: ROLES.archivist.color,
};

// Deterministic pseudo-random position in a sunflower / Vogel spiral so the
// layout is stable across renders and looks like a Voronoi field.
function spiralPosition(i: number, total: number, radius: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const r = Math.sqrt((i + 0.5) / total) * radius;
  const theta = (i + 1) * golden;
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
}

export default function MazePage() {
  const { role, setRole, hydrated } = useRole();
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const effectiveRole: RoleId = hydrated ? role : "public";

  const positions = useMemo(
    () =>
      PAGES.map((p, i) => ({
        page: p,
        pos: spiralPosition(i, PAGES.length, 220),
        viewers: viewersOf(p.id),
      })),
    []
  );

  const selectedPage: WireframePage | undefined = selected
    ? PAGES.find((p) => p.id === selected)
    : undefined;
  const selectedViewers = selectedPage ? viewersOf(selectedPage.id) : [];

  return (
    <PageShell
      page={page}
      breadcrumbs={[{ label: "Hub", href: "/" }, { label: "Maze Visualizer" }]}
      showLeftNav={false}
    >
      <PageHeader
        eyebrow="Quality Control"
        title="MindWave Maze Visualizer"
        sub="3D Voronoi permission graph. Walk the maze as any role. See exactly what each role can access — and what they can't."
        accent="#fbbf24"
        right={<Pill color="#fbbf24">Internal tool</Pill>}
      />

      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border border-white/5 bg-white/[0.025] p-4">
          <div className="text-[10px] uppercase tracking-[0.08em] opacity-50">Pages</div>
          <div className="text-2xl font-bold text-[#fbbf24]">{PAGES.length}</div>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.025] p-4">
          <div className="text-[10px] uppercase tracking-[0.08em] opacity-50">Roles</div>
          <div className="text-2xl font-bold text-[#06B6D4]">{ROLE_ORDER.length}</div>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.025] p-4">
          <div className="text-[10px] uppercase tracking-[0.08em] opacity-50">Permission tuples</div>
          <div className="text-2xl font-bold text-[#22C55E]">{PERMISSION_COUNT}</div>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.025] p-4">
          <div className="text-[10px] uppercase tracking-[0.08em] opacity-50">Active role</div>
          <div className="text-2xl font-bold" style={{ color: ROLE_COLOR[effectiveRole] }}>
            {ROLES[effectiveRole].label}
          </div>
        </div>
      </div>

      {/* Role selector for maze walking */}
      <Card title="Walk the maze as:" className="mb-6">
        <div className="flex flex-wrap gap-2">
          {ROLE_ORDER.map((r) => {
            const active = effectiveRole === r;
            return (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
                style={{
                  background: active ? ROLE_COLOR[r] : "rgba(255,255,255,0.03)",
                  color: active ? "#0a0a0f" : "rgba(226,232,240,0.7)",
                  border: `1px solid ${ROLE_COLOR[r]}${active ? "" : "33"}`,
                }}
              >
                <span className="text-[10px]">{ROLES[r].glyph}</span>
                {ROLES[r].label}
              </button>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* The maze canvas */}
        <Card title="Permission Voronoi field" className="!p-4">
          <div className="relative aspect-square w-full max-w-[640px] mx-auto">
            <svg
              viewBox="-260 -260 520 520"
              className="absolute inset-0 h-full w-full"
              style={{ overflow: "visible" }}
            >
              {/* Voronoi-ish background cells (concentric rings + radial spokes) */}
              {[60, 120, 180, 220].map((r) => (
                <circle
                  key={r}
                  cx="0"
                  cy="0"
                  r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i / 12) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1={Math.cos(a) * 30}
                    y1={Math.sin(a) * 30}
                    x2={Math.cos(a) * 240}
                    y2={Math.sin(a) * 240}
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Connection lines between navLinked pages — only when both are visible to current role */}
              {positions.map((src, si) =>
                src.page.navLinks.map((targetId) => {
                  const tgt = positions.find((p) => p.page.id === targetId);
                  if (!tgt) return null;
                  const srcCan = src.viewers.includes(effectiveRole);
                  const tgtCan = tgt.viewers.includes(effectiveRole);
                  const color = srcCan && tgtCan ? ROLE_COLOR[effectiveRole] : "#94A3B8";
                  const op = srcCan && tgtCan ? 0.35 : 0.06;
                  return (
                    <line
                      key={`${src.page.id}-${targetId}`}
                      x1={src.pos.x}
                      y1={src.pos.y}
                      x2={tgt.pos.x}
                      y2={tgt.pos.y}
                      stroke={color}
                      strokeOpacity={op}
                      strokeWidth="0.8"
                    />
                  );
                })
              )}

              {/* Page nodes */}
              {positions.map(({ page: p, pos, viewers }) => {
                const canSee = viewers.includes(effectiveRole);
                const isHovered = hovered === p.id;
                const isSelected = selected === p.id;
                const roleColor = ROLE_COLOR[effectiveRole];
                const fill = canSee ? roleColor : "rgba(255,255,255,0.04)";
                const r = isHovered || isSelected ? 9 : canSee ? 6 : 4;
                return (
                  <g key={p.id}>
                    {(isHovered || isSelected) && canSee && (
                      <circle cx={pos.x} cy={pos.y} r={r + 6} fill={fill} opacity="0.18" />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={r}
                      fill={fill}
                      stroke={canSee ? roleColor : "rgba(255,255,255,0.1)"}
                      strokeWidth={isSelected ? 2 : canSee ? 1 : 0.5}
                      opacity={canSee ? 0.95 : 0.5}
                      style={{ cursor: "pointer", transition: "r 0.15s, opacity 0.15s" }}
                      onMouseEnter={() => setHovered(p.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setSelected(p.id)}
                    >
                      <title>
                        {p.title} — {viewers.length} roles can view
                      </title>
                    </circle>
                    {(isHovered || isSelected) && (
                      <text
                        x={pos.x}
                        y={pos.y + r + 10}
                        textAnchor="middle"
                        fontSize="8"
                        fill="rgba(226,232,240,0.85)"
                        fontFamily="ui-monospace, monospace"
                      >
                        {p.title.length > 22 ? p.title.slice(0, 22) + "…" : p.title}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-2 left-2 flex flex-col gap-1 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: ROLE_COLOR[effectiveRole] }} />
                <span className="opacity-70">Visible to {ROLES[effectiveRole].label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="opacity-70">Not visible</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Selected page detail */}
        <div className="space-y-6">
          <Card title="Selected page">
            {selectedPage ? (
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">
                  {selectedPage.portal} portal · depth {selectedPage.depth}
                </div>
                <h3 className="font-bold text-base mb-1">{selectedPage.title}</h3>
                <p className="text-xs opacity-60 mb-3">{selectedPage.blurb}</p>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-2">
                  Roles that can view:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ROLE_ORDER.map((r) => {
                    const can = selectedViewers.includes(r);
                    return (
                      <span
                        key={r}
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{
                          background: can ? `${ROLE_COLOR[r]}1a` : "rgba(255,255,255,0.02)",
                          color: can ? ROLE_COLOR[r] : "rgba(255,255,255,0.3)",
                          border: `1px solid ${ROLE_COLOR[r]}${can ? "33" : "15"}`,
                        }}
                      >
                        <StatusDot color={can ? ROLE_COLOR[r] : "rgba(255,255,255,0.2)"} />
                        {ROLES[r].label}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="text-[10px] uppercase tracking-wider opacity-50 mb-2">
                    Cross-links to:
                  </div>
                  <div className="space-y-1">
                    {selectedPage.navLinks.map((id) => {
                      const tgt = PAGES.find((p) => p.id === id);
                      if (!tgt) return null;
                      return (
                        <Link
                          key={id}
                          href={tgt.route}
                          className="block rounded-md border border-white/5 bg-white/[0.015] p-2 text-xs hover:bg-white/[0.04]"
                          onMouseEnter={() => setHovered(id)}
                          onMouseLeave={() => setHovered(null)}
                          onClick={() => setSelected(id)}
                        >
                          <span className="font-medium">{tgt.title}</span>
                          <span className="ml-1 opacity-50">→</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm opacity-60 text-center py-8">
                Click a node in the maze to inspect its permissions.
              </div>
            )}
          </Card>

          <Card title="Permission stats" accent="#22C55E">
            <div className="space-y-2 text-xs">
              {ROLE_ORDER.map((r) => {
                const visible = PAGES.filter((p) => viewersOf(p.id).includes(r)).length;
                return (
                  <div key={r} className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: ROLE_COLOR[r] }} />
                      {ROLES[r].label}
                    </span>
                    <span className="font-mono-raas">
                      {visible} / {PAGES.length} pages
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg border border-white/5 bg-white/[0.015] p-4 text-xs">
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">What this shows</div>
          Each dot is one of the {PAGES.length} pages. Bright dots are visible to the active role.
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.015] p-4 text-xs">
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Lines</div>
          Connections between navLinked pages — bright when both ends are visible to the active role.
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.015] p-4 text-xs">
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">{PERMISSION_COUNT} tuples</div>
          Built from Zanzibar-style relationship tuples: subject has relation on object.
        </div>
      </div>
    </PageShell>
  );
}
