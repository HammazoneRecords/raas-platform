"use client";

import Link from "next/link";
import { PageShell, PageHeader, LinkCard } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById, PAGES } from "@/lib/raas/wireframe";
import { SYSTEM_HEALTH, AUDIT_LOG, PLATFORM_METRICS } from "@/lib/raas/mock-data";

const page = pageById("admin_console")!;

export default function AdminConsolePage() {
  const { allowed, denied } = usePageAccess("admin_console", { pageLabel: "Admin Console Home" });
  if (!allowed) return denied;

  const subPages = page.navLinks
    .map((id) => PAGES.find((p) => p.id === id)!)
    .filter(Boolean);

  return (
    <PageShell
      page={page}
      breadcrumbs={[{ label: "Hub", href: "/" }, { label: "Admin Console" }]}
    >
      <PageHeader
        eyebrow="Admin · Admin only"
        title="Admin Console"
        sub="System health, recent audit log entries, tranche deployment, and quick links to every admin sub-page."
        accent="#0EA5E9"
        right={<Pill color="#0EA5E9"><StatusDot color="#0EA5E9" pulse /> All systems nominal</Pill>}
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Artists (live)" value={PLATFORM_METRICS.liveArtists} sub={`of ${PLATFORM_METRICS.totalArtists} total`} accent="#22C55E" />
        <StatCard label="Monthly revenue" value={`$${PLATFORM_METRICS.monthlyRevenue.toLocaleString()}`} accent="#fbbf24" />
        <StatCard label="MRR" value={`$${PLATFORM_METRICS.mrr.toLocaleString()}`} sub="monthly recurring" accent="#06B6D4" />
        <StatCard label="API calls (mo)" value={PLATFORM_METRICS.apiCallsThisMonth.toLocaleString()} accent="#A855F7" />
      </div>

      {/* System health */}
      <Card title="System health" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SYSTEM_HEALTH.map((s) => {
            const color = s.status === "ok" ? "#22C55E" : s.status === "pending" ? "#fbbf24" : "#EF4444";
            return (
              <div
                key={s.name}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold">{s.name}</h3>
                  <Pill color={color}>
                    <StatusDot color={color} pulse={s.status !== "ok"} />
                    {s.status === "ok" ? "Online" : s.status === "pending" ? "Pending" : "Down"}
                  </Pill>
                </div>
                <div className="text-xs opacity-60 font-mono-raas">{s.value}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Tranche deployment status */}
      <Card
        title="Tranche deployment status"
        action={<Link href="/investor/kpi-release" className="text-[11px] text-[#EF4444] hover:underline underline-offset-4">Investor view →</Link>}
        className="mb-6"
      >
        <div className="space-y-2">
          {[
            { n: 1, name: "Foundational", status: "deployed", value: "$800K" },
            { n: 2, name: "AI Activation", status: "pending", value: "$800K" },
            { n: 3, name: "Cultural API Scale", status: "locked", value: "$800K" },
            { n: 4, name: "Archive SaaS", status: "locked", value: "$800K" },
            { n: 5, name: "Sonic Scale", status: "locked", value: "$800K" },
          ].map((t) => {
            const color = t.status === "deployed" ? "#22C55E" : t.status === "pending" ? "#fbbf24" : "#94A3B8";
            return (
              <div
                key={t.n}
                className="flex items-center gap-3 rounded-md border p-3"
                style={{ borderColor: `${color}33`, background: `${color}0a` }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full font-mono-raas text-xs font-bold shrink-0"
                  style={{ background: `${color}1a`, color, border: `1px solid ${color}33` }}
                >
                  T{t.n}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{t.name}</div>
                </div>
                <div className="font-mono-raas text-xs text-[#fbbf24]">{t.value}</div>
                <Pill color={color}>{t.status}</Pill>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent audit log */}
      <Card
        title="Recent audit log"
        action={<Link href="/admin/audit-log" className="text-[11px] text-[#0EA5E9] hover:underline underline-offset-4">View all →</Link>}
        className="mb-6"
      >
        <div className="space-y-1.5 max-h-72 overflow-y-auto">
          {AUDIT_LOG.slice(0, 8).map((e) => (
            <div
              key={e.id}
              className="flex items-center gap-3 rounded-md border border-white/5 bg-white/[0.015] p-2.5"
            >
              <Pill color={e.status === "ok" ? "#22C55E" : "#EF4444"}>
                <StatusDot color={e.status === "ok" ? "#22C55E" : "#EF4444"} />
                {e.status}
              </Pill>
              <span className="text-xs font-mono-raas opacity-70 shrink-0">{e.id}</span>
              <span className="text-xs truncate">{e.actor} · {e.action} · {e.target}</span>
              <span className="text-[10px] opacity-50 ml-auto shrink-0">{e.ts}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {subPages.map((p) => (
          <LinkCard key={p.id} href={p.route} title={p.title} desc={p.blurb} accent="#0EA5E9" />
        ))}
      </div>
    </PageShell>
  );
}
