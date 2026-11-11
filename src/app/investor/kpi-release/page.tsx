"use client";

import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { KPI_TRANCHE_TABLE } from "@/lib/raas/mock-data";

const page = pageById("investor_kpi_release")!;

const TRANCHE_STATUS = [
  { n: 1, status: "Released" as const, verified: true },
  { n: 2, status: "Pending" as const, verified: false },
  { n: 3, status: "Locked" as const, verified: false },
  { n: 4, status: "Locked" as const, verified: false },
  { n: 5, status: "Locked" as const, verified: false },
];

const VERIFICATION_CHECKLIST = [
  { item: "KPI evidence uploaded", done: true },
  { item: "Founder attestation signed", done: true },
  { item: "Third-party verification (auditor)", done: false },
  { item: "Investor committee review", done: false },
  { item: "Capital deployment authorized", done: false },
];

const MILESTONE_PENALTIES = [
  "Auto-extension: 90-day grace period before default",
  "Equity dilution: founder forfeits 0.5% per missed tranche",
  "Cash refund: investors claw back pro-rata un-deployed capital",
  "Strategic review: forced all-hands with investor committee",
];

const DEPLOYMENT_TIMELINE = [
  { phase: "T+0 (close)", deployed: "$800K", note: "Foundational tranche" },
  { phase: "T+3mo", deployed: "$1.6M", note: "AI Activation (pending)" },
  { phase: "T+6mo", deployed: "$2.4M", note: "Cultural API Scale (locked)" },
  { phase: "T+9mo", deployed: "$3.2M", note: "Archive SaaS (locked)" },
  { phase: "T+12mo", deployed: "$4.0M", note: "Sonic Scale (locked)" },
];

export default function InvestorKpiReleasePage() {
  const { allowed, denied } = usePageAccess("investor_kpi_release", {
    pageLabel: "Investor KPI Tranche Release Flow",
  });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Investor", href: "/investor" },
        { label: "KPI Release" },
      ]}
    >
      <PageHeader
        eyebrow="Investor · Behind login"
        title="KPI Tranche Release Flow"
        sub="Five tranches. Each unlocks on a verifiable KPI. Capital deploys in stages — never all at once."
        accent="#EF4444"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Released" value={TRANCHE_STATUS.filter((t) => t.status === "Released").length} sub="of 5" accent="#22C55E" />
        <StatCard label="Pending" value={TRANCHE_STATUS.filter((t) => t.status === "Pending").length} accent="#fbbf24" />
        <StatCard label="Locked" value={TRANCHE_STATUS.filter((t) => t.status === "Locked").length} accent="#94A3B8" />
        <StatCard label="Deployed" value="$800K" sub="of $4M target" accent="#06B6D4" />
      </div>

      {/* Tranche status */}
      <Card title="Tranche status" className="mb-6">
        <div className="space-y-2">
          {KPI_TRANCHE_TABLE.map((t, i) => {
            const st = TRANCHE_STATUS[i];
            const color = st.status === "Released" ? "#22C55E" : st.status === "Pending" ? "#fbbf24" : "#94A3B8";
            return (
              <div
                key={t.n}
                className="flex items-center justify-between gap-3 rounded-md border p-3"
                style={{
                  borderColor: `${color}33`,
                  background: `${color}0a`,
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full font-mono-raas text-xs font-bold shrink-0"
                    style={{ background: `${color}1a`, color, border: `1px solid ${color}33` }}
                  >
                    T{t.n}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs opacity-60 truncate">{t.trigger}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <div className="font-mono-raas text-xs text-[#fbbf24]">{t.cash}</div>
                    <div className="font-mono-raas text-[10px] opacity-60">{t.equityPct} equity</div>
                  </div>
                  <Pill color={color}>
                    {st.status === "Released" && <StatusDot color={color} />}
                    {st.status}
                  </Pill>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification checklist */}
        <Card title="Verification checklist — Tranche 2 (next)">
          <div className="space-y-2">
            {VERIFICATION_CHECKLIST.map((c) => (
              <div
                key={c.item}
                className={`flex items-center justify-between rounded-md border p-3 ${
                  c.done
                    ? "border-[#22C55E]/20 bg-[#22C55E]/[0.04]"
                    : "border-white/5 bg-white/[0.015]"
                }`}
              >
                <span className="text-sm">{c.item}</span>
                <Pill color={c.done ? "#22C55E" : "#94A3B8"}>
                  {c.done ? "✓ Done" : "Pending"}
                </Pill>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] opacity-60">
            Tranche 2 cannot deploy until all 5 checklist items are complete.
          </div>
        </Card>

        {/* Milestone penalties */}
        <Card
          title="If we miss a milestone"
          action={<Pill color="#EF4444">4 options</Pill>}
        >
          <div className="space-y-2">
            {MILESTONE_PENALTIES.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-md border border-[#EF4444]/15 bg-[#EF4444]/[0.04] p-3"
              >
                <span className="mt-0.5 font-mono-raas text-xs font-bold text-[#EF4444] shrink-0">
                  {i + 1}.
                </span>
                <span className="text-xs opacity-80">{p}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Capital deployment timeline */}
      <Card title="Capital deployment timeline" className="mt-6">
        <div className="space-y-2">
          {DEPLOYMENT_TIMELINE.map((d, i) => {
            const reached = i === 0;
            return (
              <div
                key={d.phase}
                className={`flex items-center gap-4 rounded-md border p-3 ${
                  reached ? "border-[#22C55E]/20 bg-[#22C55E]/[0.04]" : "border-white/5 bg-white/[0.015] opacity-70"
                }`}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full font-mono-raas text-xs font-bold shrink-0"
                  style={{
                    background: reached ? "#22C55E" : "rgba(255,255,255,0.03)",
                    color: reached ? "#0a0a0f" : "#94A3B8",
                    border: reached ? "1px solid #22C55E" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono-raas text-sm">{d.phase}</div>
                  <div className="text-xs opacity-60">{d.note}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono-raas text-sm font-bold text-[#fbbf24]">{d.deployed}</div>
                  <div className="text-[10px] opacity-50">cumulative</div>
                </div>
                {reached && (
                  <Pill color="#22C55E">
                    <StatusDot color="#22C55E" /> Deployed
                  </Pill>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </PageShell>
  );
}
