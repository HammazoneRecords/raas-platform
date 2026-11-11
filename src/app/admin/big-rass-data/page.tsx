"use client";

import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { PLATFORM_METRICS, CONVERSION_FUNNEL, PORTFOLIO_POOL } from "@/lib/raas/mock-data";

const page = pageById("admin_big_rass_data")!;

export default function AdminBigRassDataPage() {
  const { allowed, denied } = usePageAccess("admin_big_rass_data", { pageLabel: "Big RASS Data — Analytics Dashboard" });
  if (!allowed) return denied;

  const topArtists = [...PORTFOLIO_POOL].sort((a, b) => b.y1Revenue - a.y1Revenue).slice(0, 5);
  const maxFunnel = CONVERSION_FUNNEL[0].count;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Admin", href: "/admin" },
        { label: "Big RASS Data" },
      ]}
    >
      <PageHeader
        eyebrow="Admin · Big RASS Data"
        title="Platform-wide analytics"
        sub="Total artists, fans, revenue, MRR, conversion funnel, growth, top territories."
        accent="#0EA5E9"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total artists" value={PLATFORM_METRICS.totalArtists} sub={`${PLATFORM_METRICS.liveArtists} live`} accent="#22C55E" />
        <StatCard label="Total fans" value={PLATFORM_METRICS.totalFans.toLocaleString()} accent="#EC4899" />
        <StatCard label="Monthly revenue" value={`$${PLATFORM_METRICS.monthlyRevenue.toLocaleString()}`} accent="#fbbf24" />
        <StatCard label="MRR" value={`$${PLATFORM_METRICS.mrr.toLocaleString()}`} accent="#06B6D4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Conversion funnel */}
        <Card title="Conversion funnel">
          <div className="space-y-2">
            {CONVERSION_FUNNEL.map((f) => (
              <div key={f.stage}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{f.stage}</span>
                  <span className="font-mono-raas opacity-60">
                    {f.count.toLocaleString()} · {f.pct}%
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(f.count / maxFunnel) * 100}%`,
                      background: "linear-gradient(90deg, #0EA5E9, #fbbf24)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Growth chart */}
        <Card title="Growth (6 months)">
          <div className="flex items-end gap-2 h-48">
            {[
              { m: "Jun", artists: 14, fans: 412 },
              { m: "Jul", artists: 16, fans: 478 },
              { m: "Aug", artists: 18, fans: 524 },
              { m: "Sep", artists: 20, fans: 588 },
              { m: "Oct", artists: 22, fans: 632 },
              { m: "Nov", artists: 23, fans: 665 },
            ].map((g) => (
              <div key={g.m} className="flex-1 flex flex-col items-center gap-2">
                <div className="flex w-full items-end gap-1 h-40">
                  <div className="flex-1 bg-white/5 rounded-t-sm relative">
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-t-sm"
                      style={{ height: `${(g.artists / 23) * 100}%`, background: "#22C55E" }}
                    />
                  </div>
                  <div className="flex-1 bg-white/5 rounded-t-sm relative">
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-t-sm"
                      style={{ height: `${(g.fans / 665) * 100}%`, background: "#EC4899" }}
                    />
                  </div>
                </div>
                <div className="text-[10px] opacity-50 font-mono-raas">{g.m}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" /> Artists
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#EC4899]" /> Fans
            </span>
          </div>
        </Card>
      </div>

      {/* Top artists + territories */}
      <Card title="Top artists + territories" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">#</th>
                <th className="py-2 pr-3 font-medium">Artist</th>
                <th className="py-2 pr-3 font-medium">Domain</th>
                <th className="py-2 pr-3 font-medium">Brand ext.</th>
                <th className="py-2 pr-3 font-medium">Y1 revenue</th>
                <th className="py-2 pr-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {topArtists.map((a, i) => (
                <tr key={a.slug} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-mono-raas text-[#fbbf24]">#{i + 1}</td>
                  <td className="py-2.5 pr-3 font-medium">{a.name}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-xs opacity-70">{a.domain}</td>
                  <td className="py-2.5 pr-3 text-xs opacity-70">{a.brandExtension}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-[#22C55E]">${a.y1Revenue.toLocaleString()}</td>
                  <td className="py-2.5 pr-3">
                    <Pill color="#22C55E">
                      <StatusDot color="#22C55E" /> {a.status}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="AI voice generations" value={PLATFORM_METRICS.aiVoiceGenerations.toLocaleString()} sub="this month" accent="#A855F7" />
        <StatCard label="Pipeline artists" value={PLATFORM_METRICS.pipelineArtists} accent="#fbbf24" />
        <StatCard label="Total API calls" value={PLATFORM_METRICS.apiCallsThisMonth.toLocaleString()} sub="this month" accent="#06B6D4" />
        <StatCard label="Active leagues" value="4" sub="Free → Enterprise" accent="#EC4899" />
      </div>
    </PageShell>
  );
}
