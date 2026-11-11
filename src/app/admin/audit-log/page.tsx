"use client";

import { useState } from "react";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { AUDIT_LOG } from "@/lib/raas/mock-data";

const page = pageById("admin_audit_log")!;

const SECURITY_ALERTS = [
  { level: "warning", text: "5 failed role-switch attempts from IP 21.0.12.174 in 60s", ts: "12m ago" },
  { level: "info", text: "New API key generated for staging environment", ts: "2h ago" },
  { level: "critical", text: "Unauthorized attempt to access /api/pages/admin_console?role=admin — denied", ts: "1d ago" },
];

export default function AdminAuditLogPage() {
  const { allowed, denied } = usePageAccess("admin_audit_log", { pageLabel: "Audit Log + Security" });
  const [filter, setFilter] = useState<"all" | "ok" | "denied">("all");

  if (!allowed) return denied;

  const filtered = AUDIT_LOG.filter((e) => filter === "all" || e.status === filter);

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Admin", href: "/admin" },
        { label: "Audit Log" },
      ]}
    >
      <PageHeader
        eyebrow="Admin"
        title="Audit Log + Security"
        sub="50 most recent audit entries. Filter by status. Security alerts and export options."
        accent="#0EA5E9"
        right={
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
            >
              Export CSV
            </button>
            <button
              type="button"
              className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
            >
              Export JSON
            </button>
          </div>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total entries" value={AUDIT_LOG.length} sub="last 7 days" accent="#0EA5E9" />
        <StatCard label="OK status" value={AUDIT_LOG.filter(e => e.status === "ok").length} accent="#22C55E" />
        <StatCard label="Denied" value={AUDIT_LOG.filter(e => e.status === "denied").length} accent="#EF4444" />
        <StatCard label="Security alerts" value={SECURITY_ALERTS.length} accent="#fbbf24" />
      </div>

      {/* Security alerts */}
      <Card title="Security alerts" className="mb-6">
        <div className="space-y-2">
          {SECURITY_ALERTS.map((a, i) => {
            const color = a.level === "critical" ? "#EF4444" : a.level === "warning" ? "#fbbf24" : "#06B6D4";
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-md border p-3"
                style={{ borderColor: `${color}33`, background: `${color}0a` }}
              >
                <StatusDot color={color} pulse={a.level === "critical"} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm">{a.text}</div>
                  <div className="text-[11px] opacity-60 font-mono-raas">{a.ts}</div>
                </div>
                <Pill color={color}>{a.level}</Pill>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filter controls */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] uppercase tracking-wider opacity-50">Filter:</span>
        {(["all", "ok", "denied"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              filter === f
                ? "bg-[#0EA5E9] text-white"
                : "border border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
            }`}
          >
            {f === "all" ? "All" : f === "ok" ? "OK" : "Denied"}
          </button>
        ))}
        <span className="ml-auto text-[11px] opacity-50">
          Showing {filtered.length} of {AUDIT_LOG.length}
        </span>
      </div>

      {/* Audit log table */}
      <Card title="Audit log entries">
        <div className="max-h-[480px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#0a0a0f]">
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">ID</th>
                <th className="py-2 pr-3 font-medium">Timestamp</th>
                <th className="py-2 pr-3 font-medium">Actor</th>
                <th className="py-2 pr-3 font-medium">Action</th>
                <th className="py-2 pr-3 font-medium">Target</th>
                <th className="py-2 pr-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2 pr-3 font-mono-raas text-xs opacity-70">{e.id}</td>
                  <td className="py-2 pr-3 text-xs opacity-60 font-mono-raas">{e.ts}</td>
                  <td className="py-2 pr-3 text-xs">{e.actor}</td>
                  <td className="py-2 pr-3 font-mono-raas text-xs text-[#0EA5E9]">{e.action}</td>
                  <td className="py-2 pr-3 font-mono-raas text-xs opacity-70">{e.target}</td>
                  <td className="py-2 pr-3">
                    <Pill color={e.status === "ok" ? "#22C55E" : "#EF4444"}>
                      <StatusDot color={e.status === "ok" ? "#22C55E" : "#EF4444"} />
                      {e.status}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
