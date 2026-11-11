"use client";

import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { ENTERPRISE_LEADS } from "@/lib/raas/mock-data";

const page = pageById("admin_enterprise_leads")!;

export default function AdminEnterpriseLeadsPage() {
  const { allowed, denied } = usePageAccess("admin_enterprise_leads", { pageLabel: "Enterprise Lead Intake" });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Admin", href: "/admin" },
        { label: "Enterprise Leads" },
      ]}
    >
      <PageHeader
        eyebrow="Admin"
        title="Enterprise Lead Intake"
        sub="Enterprise League pipeline — artists with 5M+ YouTube AND 500K+ Spotify. High-touch sales, custom contracts."
        accent="#0EA5E9"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total leads" value={ENTERPRISE_LEADS.length} accent="#0EA5E9" />
        <StatCard label="Qualified" value={ENTERPRISE_LEADS.filter(l => l.status === "Qualified").length} accent="#fbbf24" />
        <StatCard label="Demo scheduled" value={ENTERPRISE_LEADS.filter(l => l.status === "Demo scheduled").length} accent="#06B6D4" />
        <StatCard label="Contract sent" value={ENTERPRISE_LEADS.filter(l => l.status === "Contract sent").length} accent="#22C55E" />
      </div>

      {/* Enterprise gate */}
      <div className="mb-6 rounded-xl border border-[#fbbf24]/20 bg-[#fbbf24]/[0.04] p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-wider opacity-50">Enterprise League gate</span>
        </div>
        <div className="font-mono-raas text-sm">
          <span className="text-[#fbbf24]">5M+ YouTube</span> AND{" "}
          <span className="text-[#fbbf24]">500K+ Spotify</span>
        </div>
        <div className="text-xs opacity-60 mt-1">
          Both gates must be met. No exceptions — protects the tier&apos;s value.
        </div>
      </div>

      <Card title="Lead pipeline">
        <div className="space-y-3">
          {ENTERPRISE_LEADS.map((l) => {
            const color =
              l.status === "Contract sent" ? "#22C55E" :
              l.status === "Demo scheduled" ? "#06B6D4" :
              l.status === "Qualified" ? "#fbbf24" : "#94A3B8";
            return (
              <div
                key={l.name}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-semibold">{l.name}</h3>
                    <div className="text-xs opacity-60 mt-0.5 font-mono-raas">
                      YT {l.ytSubs} · Spotify {l.spot}
                    </div>
                  </div>
                  <Pill color={color}>
                    <StatusDot color={color} pulse={l.status === "Contract sent"} />
                    {l.status}
                  </Pill>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="opacity-60">Value: <span className="font-mono-raas text-[#fbbf24]">{l.value}</span></span>
                  <button
                    type="button"
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] font-medium hover:bg-white/[0.06]"
                  >
                    View lead →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Avg deal cycle</div>
          <div className="font-mono-raas text-xl font-bold text-[#0EA5E9]">42 days</div>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Conversion rate</div>
          <div className="font-mono-raas text-xl font-bold text-[#22C55E]">68%</div>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">YTD closed revenue</div>
          <div className="font-mono-raas text-xl font-bold text-[#fbbf24]">$24K</div>
        </div>
      </div>
    </PageShell>
  );
}
