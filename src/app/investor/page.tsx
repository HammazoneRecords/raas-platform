"use client";

import Link from "next/link";
import { PageShell, PageHeader, LinkCard } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import {
  INVESTOR_POOL_MODEL,
  KPI_TRANCHE_TABLE,
  INVESTOR_PROTECTIONS,
  CAP_TABLE,
  REVENUE_PROJECTIONS,
} from "@/lib/raas/mock-data";

const page = pageById("investor_portal")!;

export default function InvestorPortalPage() {
  const { allowed, denied } = usePageAccess("investor_portal", { pageLabel: "Investor Portal" });
  if (!allowed) return denied;

  const maxRev = Math.max(...REVENUE_PROJECTIONS.map((r) => r.revenue));

  return (
    <PageShell
      page={page}
      breadcrumbs={[{ label: "Hub", href: "/" }, { label: "Investor Portal" }]}
    >
      <PageHeader
        eyebrow="Investor · Behind login"
        title="Investor Portal"
        sub="Pool model, KPI tranches, cap table, projections. This page is intentionally private — none of this appears on the public Hub."
        accent="#EF4444"
        right={<Pill color="#EF4444">Confidential</Pill>}
      />

      {/* Pool model */}
      <Card title="Pool model" className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Equity offered</div>
            <div className="font-mono-raas text-xl font-bold text-[#EF4444]">{INVESTOR_POOL_MODEL.equityOffered}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Raise target</div>
            <div className="font-mono-raas text-xl font-bold text-[#fbbf24]">{INVESTOR_POOL_MODEL.raiseTarget}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Post-money</div>
            <div className="font-mono-raas text-xl font-bold text-[#06B6D4]">{INVESTOR_POOL_MODEL.postMoney}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Per 1% (min)</div>
            <div className="font-mono-raas text-xl font-bold text-[#22C55E]">{INVESTOR_POOL_MODEL.perOnePct}</div>
          </div>
        </div>
      </Card>

      {/* KPI tranches */}
      <Card
        title="5 KPI tranches"
        action={<Pill color="#fbbf24">4% each · $800K each</Pill>}
        className="mb-6"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">#</th>
                <th className="py-2 pr-3 font-medium">Name</th>
                <th className="py-2 pr-3 font-medium">Equity</th>
                <th className="py-2 pr-3 font-medium">Cash</th>
                <th className="py-2 pr-3 font-medium">Trigger</th>
                <th className="py-2 pr-3 font-medium">Verification</th>
                <th className="py-2 pr-3 font-medium">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {KPI_TRANCHE_TABLE.map((t) => (
                <tr key={t.n} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-mono-raas text-[#EF4444]">T{t.n}</td>
                  <td className="py-2.5 pr-3 font-medium">{t.name}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-[#22C55E]">{t.equityPct}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-[#fbbf24]">{t.cash}</td>
                  <td className="py-2.5 pr-3 text-xs opacity-70">{t.trigger}</td>
                  <td className="py-2.5 pr-3 text-xs opacity-70">{t.verification}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-xs opacity-70">{t.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Investor protections */}
        <Card title="Investor protections">
          <div className="space-y-2">
            {INVESTOR_PROTECTIONS.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF4444]" />
                <span className="text-xs opacity-80">{p}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Cap table */}
        <Card title="Cap table">
          <div className="space-y-3">
            <div className="flex h-4 overflow-hidden rounded-md bg-white/5">
              {CAP_TABLE.map((c) => (
                <div
                  key={c.holder}
                  style={{ width: `${c.pct}%`, background: c.color }}
                  title={`${c.holder}: ${c.pct}%`}
                />
              ))}
            </div>
            <div className="space-y-2">
              {CAP_TABLE.map((c) => (
                <div key={c.holder} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                    {c.holder}
                  </div>
                  <div className="font-mono-raas">{c.pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue projections */}
      <Card title="Revenue projections" className="mb-6">
        <div className="flex items-end gap-3 h-48 mb-3">
          {REVENUE_PROJECTIONS.map((r) => (
            <div key={r.year} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[10px] font-mono-raas opacity-60">
                ${(r.revenue / 1000).toFixed(0)}K
              </div>
              <div className="w-full bg-white/5 rounded-t-sm relative" style={{ height: "160px" }}>
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-sm"
                  style={{
                    height: `${(r.revenue / maxRev) * 100}%`,
                    background: "linear-gradient(180deg, #EF4444, #fbbf24)",
                  }}
                />
              </div>
              <div className="text-[10px] opacity-50 font-mono-raas">{r.year}</div>
            </div>
          ))}
        </div>
        <div className="text-[11px] opacity-60">
          Projections assume KPI tranches hit on schedule. CAGR ≈ 184%.
        </div>
      </Card>

      {/* Decline path */}
      <Card
        title="Decline path"
        action={<Pill color="#EF4444">Worst-case</Pill>}
        className="mb-6"
      >
        <div className="rounded-lg border border-[#EF4444]/20 bg-[#EF4444]/[0.04] p-4 text-sm">
          If RAAS fails to hit Tranche 1 (Foundational) within 6 months of close, investors may:
          <ol className="mt-2 ml-4 list-decimal text-xs opacity-80 space-y-1">
            <li>Claw back un-deployed capital (pro-rata)</li>
            <li>Force a strategic review with the founder</li>
            <li>Convert to debt at 8% simple interest</li>
          </ol>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <LinkCard href="/investor/portfolio" title="Investor portfolio — artist pool view →" desc="23 artist sites with brand extensions + Y1 revenue" accent="#EF4444" />
        <LinkCard href="/investor/kpi-release" title="KPI tranche release flow →" desc="5 tranche status, verification, milestone penalties" accent="#fbbf24" />
      </div>
    </PageShell>
  );
}
