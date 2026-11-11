"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { ARTIST_AUDIENCE, REVENUE_BREAKDOWN } from "@/lib/raas/mock-data";

const page = pageById("artist_analytics")!;

const COHORT_RETENTION = [
  { month: "M0", pct: 100 },
  { month: "M1", pct: 78 },
  { month: "M2", pct: 64 },
  { month: "M3", pct: 58 },
  { month: "M6", pct: 48 },
  { month: "M12", pct: 41 },
];

export default function ArtistAnalyticsPage() {
  const { allowed, denied } = usePageAccess("artist_analytics", { pageLabel: "Artist Analytics" });
  if (!allowed) return denied;

  const totalRevenue = REVENUE_BREAKDOWN.reduce((s, r) => s + r.amount, 0);
  const territoryValuation = totalRevenue * 12 * 4.5; // 20yr × 4.5× rev multiple

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "Analytics" },
      ]}
    >
      <PageHeader
        eyebrow="Artist"
        title="Analytics"
        sub="Audience, revenue breakdown, and a 20-year territory valuation."
        accent="#06B6D4"
        right={
          <Link
            href="/admin/big-rass-data"
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
          >
            Platform-wide →
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="YouTube subs" value={ARTIST_AUDIENCE.youtubeSubs.toLocaleString()} accent="#EF4444" />
        <StatCard label="Spotify monthly" value={ARTIST_AUDIENCE.spotifyMonthlyListeners.toLocaleString()} accent="#22C55E" />
        <StatCard label="Instagram" value={ARTIST_AUDIENCE.instagramFollowers.toLocaleString()} accent="#EC4899" />
        <StatCard label="Monthly revenue" value={`$${totalRevenue.toLocaleString()}`} sub="blended" accent="#fbbf24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue breakdown */}
        <Card title="Revenue breakdown">
          <div className="space-y-3">
            {REVENUE_BREAKDOWN.map((r) => (
              <div key={r.source}>
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                    {r.source}
                  </span>
                  <span className="font-mono-raas">${r.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(r.amount / totalRevenue) * 100}%`,
                      background: r.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Cohort retention */}
        <Card title="Cohort retention">
          <div className="flex items-end gap-3 h-48">
            {COHORT_RETENTION.map((c) => (
              <div key={c.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-[10px] font-mono-raas opacity-60">{c.pct}%</div>
                <div className="w-full bg-white/5 rounded-t-sm relative" style={{ height: "160px" }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-sm"
                    style={{
                      height: `${c.pct}%`,
                      background: "linear-gradient(180deg, #fbbf24, #f59e0b)",
                    }}
                  />
                </div>
                <div className="text-[10px] opacity-50 font-mono-raas">{c.month}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] opacity-60">
            Of fans who subscribed this month, {COHORT_RETENTION[5].pct}% are still subscribers a year later.
          </div>
        </Card>
      </div>

      {/* Territory valuation */}
      <Card
        title="Territory valuation (20-year projection)"
        action={<Pill color="#fbbf24">Estimate</Pill>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Current monthly rev</div>
            <div className="font-mono-raas text-2xl font-bold text-[#fbbf24]">
              ${totalRevenue.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">20yr revenue (projected)</div>
            <div className="font-mono-raas text-2xl font-bold text-[#22C55E]">
              ${(totalRevenue * 12 * 20).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Territory valuation</div>
            <div className="font-mono-raas text-2xl font-bold text-[#06B6D4]">
              ${territoryValuation.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>
        <div className="text-xs opacity-60">
          Based on current monthly revenue × 4.5× annual multiple. Excludes territory resale premium. This is a guideline, not a guarantee.
        </div>
      </Card>
    </PageShell>
  );
}
