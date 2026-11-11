"use client";

import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { FAILOVER_TESTS } from "@/lib/raas/mock-data";

const page = pageById("admin_backup_failover")!;

const BACKUP_STRATEGY = [
  { rule: "3 copies", desc: "Primary VPS + backup VPS + off-site cold storage", color: "#22C55E" },
  { rule: "2 different media", desc: "VPS disks + cold S3-compatible object storage", color: "#06B6D4" },
  { rule: "1 off-site", desc: "Cold storage in EU region (Ireland)", color: "#A855F7" },
];

export default function AdminBackupFailoverPage() {
  const { allowed, denied } = usePageAccess("admin_backup_failover", { pageLabel: "Backup Site Failover Admin" });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Admin", href: "/admin" },
        { label: "Backup Failover" },
      ]}
    >
      <PageHeader
        eyebrow="Admin"
        title="Backup Site Failover"
        sub="If Jamaica should sink tomorrow, our data needs to be on servers elsewhere."
        accent="#0EA5E9"
        right={<Pill color="#22C55E"><StatusDot color="#22C55E" pulse /> Both servers online</Pill>}
      />

      <div className="mb-6 rounded-2xl border border-[#0EA5E9]/20 bg-gradient-to-br from-[#0EA5E9]/[0.06] to-transparent p-6">
        <p className="text-lg font-medium">
          &ldquo;If Jamaica should sink tomorrow, our data needs to be on{" "}
          <span className="text-[#0EA5E9] font-semibold">servers elsewhere</span>.&rdquo;
        </p>
        <p className="mt-2 text-xs opacity-60">— RAAS Disaster Recovery Policy</p>
      </div>

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Primary VPS" value="Online" sub="Kingston · load 0.42" accent="#22C55E" />
        <StatCard label="Backup VPS" value="Online" sub="synced 4m ago" accent="#22C55E" />
        <StatCard label="Cold storage" value="Ireland" sub="EU region" accent="#A855F7" />
        <StatCard label="Avg RTO" value="42s" sub="last failover test" accent="#fbbf24" />
      </div>

      {/* Primary + backup status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card
          title="Primary server"
          action={<Pill color="#22C55E"><StatusDot color="#22C55E" pulse /> Live</Pill>}
        >
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Region</span>
              <span className="font-mono-raas">Kingston, JM</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">CPU load</span>
              <span className="font-mono-raas text-[#22C55E]">0.42 / 8.00</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Disk</span>
              <span className="font-mono-raas">142 GB / 500 GB (28%)</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Starlink uplink</span>
              <span className="font-mono-raas text-[#22C55E]">187 Mbps</span>
            </div>
          </div>
        </Card>

        <Card
          title="Backup server"
          action={<Pill color="#22C55E"><StatusDot color="#22C55E" /> Synced</Pill>}
        >
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Region</span>
              <span className="font-mono-raas">Miami, US</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">CPU load</span>
              <span className="font-mono-raas text-[#22C55E]">0.08 / 8.00</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Disk</span>
              <span className="font-mono-raas">142 GB / 500 GB (28%)</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Last sync</span>
              <span className="font-mono-raas text-[#22C55E]">4 min ago</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 3-2-1 backup strategy */}
      <Card title="3-2-1 backup strategy" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BACKUP_STRATEGY.map((s) => (
            <div
              key={s.rule}
              className="rounded-lg border p-4"
              style={{ borderColor: `${s.color}33`, background: `${s.color}0a` }}
            >
              <div className="font-mono-raas text-2xl font-bold mb-1" style={{ color: s.color }}>
                {s.rule}
              </div>
              <div className="text-xs opacity-70">{s.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Failover test history */}
      <Card title="Failover test history">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">Date</th>
                <th className="py-2 pr-3 font-medium">Target</th>
                <th className="py-2 pr-3 font-medium">Result</th>
                <th className="py-2 pr-3 font-medium">RTO</th>
              </tr>
            </thead>
            <tbody>
              {FAILOVER_TESTS.map((t) => (
                <tr key={t.date} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-mono-raas text-xs">{t.date}</td>
                  <td className="py-2.5 pr-3 text-xs">{t.target}</td>
                  <td className="py-2.5 pr-3">
                    <Pill color={t.result === "Pass" ? "#22C55E" : "#EF4444"}>
                      <StatusDot color={t.result === "Pass" ? "#22C55E" : "#EF4444"} />
                      {t.result}
                    </Pill>
                  </td>
                  <td className="py-2.5 pr-3 font-mono-raas text-[#fbbf24]">{t.rtoSec}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
