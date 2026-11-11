"use client";

import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { COMPLIANCE_ITEMS } from "@/lib/raas/mock-data";

const page = pageById("admin_compliance")!;

const ACTIVE_CONTRACTS = [
  { name: "ADTL Licence — Kabaka Pyramid", signed: "2026-08-12", expires: "perpetual" },
  { name: "ADTL Licence — Protoje", signed: "2026-08-15", expires: "perpetual" },
  { name: "Investor Pool Agreement", signed: "2026-09-01", expires: "2031-09-01" },
  { name: "Sun Island manufacturing", signed: "2026-08-12", expires: "2027-08-12" },
  { name: "UWI Archive access", signed: "2026-10-04", expires: "2027-10-04" },
];

export default function AdminCompliancePage() {
  const { allowed, denied } = usePageAccess("admin_compliance", { pageLabel: "Compliance + Legal" });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Admin", href: "/admin" },
        { label: "Compliance" },
      ]}
    >
      <PageHeader
        eyebrow="Admin"
        title="Compliance + Legal"
        sub="KYC/AML, data protection, active contracts. No cookies. Minimum data. PDPA + GDPR compliant."
        accent="#0EA5E9"
        right={<Pill color="#22C55E"><StatusDot color="#22C55E" pulse /> All current</Pill>}
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Active contracts" value={ACTIVE_CONTRACTS.length} accent="#22C55E" />
        <StatCard label="KYC verified" value="23" sub="artists + investors" accent="#06B6D4" />
        <StatCard label="Cookies set" value="0" sub="verified" accent="#22C55E" />
        <StatCard label="Data requests" value="2" sub="this month" accent="#fbbf24" />
      </div>

      {/* Compliance checklist */}
      <Card title="Compliance checklist" className="mb-6">
        <div className="space-y-2">
          {COMPLIANCE_ITEMS.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between rounded-md border border-[#22C55E]/20 bg-[#22C55E]/[0.04] p-3"
            >
              <div className="flex items-center gap-3">
                <StatusDot color="#22C55E" />
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs opacity-60">{c.note}</div>
                </div>
              </div>
              <Pill color="#22C55E">{c.status}</Pill>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data protection compliance */}
        <Card title="Data protection compliance">
          <div className="space-y-2 text-xs">
            <div className="rounded-md border border-white/5 bg-white/[0.015] p-3">
              <div className="text-sm font-medium mb-1">PDPA (Jamaica)</div>
              <div className="opacity-70">Personal Data Protection Act 2020. We collect minimum data, store encrypted, never share.</div>
            </div>
            <div className="rounded-md border border-white/5 bg-white/[0.015] p-3">
              <div className="text-sm font-medium mb-1">GDPR</div>
              <div className="opacity-70">Right to erasure wired into artist + fan dashboards. DPO: founder@raas.ja</div>
            </div>
            <div className="rounded-md border border-white/5 bg-white/[0.015] p-3">
              <div className="text-sm font-medium mb-1">No cookies policy</div>
              <div className="opacity-70">Verified. Role lives in localStorage only. No cookies set anywhere on the platform.</div>
            </div>
            <div className="rounded-md border border-white/5 bg-white/[0.015] p-3">
              <div className="text-sm font-medium mb-1">Minimum data principle</div>
              <div className="opacity-70">We collect only what we need to operate the platform. No tracking, no third-party ad SDKs.</div>
            </div>
          </div>
        </Card>

        {/* Active contracts */}
        <Card title="Active contracts">
          <div className="space-y-2">
            {ACTIVE_CONTRACTS.map((c) => (
              <div
                key={c.name}
                className="rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium">{c.name}</div>
                  <Pill color="#22C55E"><StatusDot color="#22C55E" /> Active</Pill>
                </div>
                <div className="text-[11px] opacity-60 font-mono-raas">
                  Signed {c.signed} · Expires {c.expires}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* KYC / AML status */}
      <Card title="KYC / AML status" className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-center">
            <div className="text-2xl font-bold text-[#22C55E]">23</div>
            <div className="text-xs opacity-60">Artists verified</div>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-center">
            <div className="text-2xl font-bold text-[#22C55E]">7</div>
            <div className="text-xs opacity-60">Investors verified</div>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-center">
            <div className="text-2xl font-bold text-[#fbbf24]">1</div>
            <div className="text-xs opacity-60">Pending review</div>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
