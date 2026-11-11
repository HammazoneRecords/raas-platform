"use client";

import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { INSTITUTIONS, ARCHIVE_PLANS } from "@/lib/raas/mock-data";

const page = pageById("archivist_institution_portal")!;

const LICENSING_QUEUE = [
  { id: "REQ-0042", institution: "National Museum Jamaica", asset: "ARC-0128 (Sleng Teng stem)", status: "Pending review" },
  { id: "REQ-0041", institution: "UWI", asset: "ARC-0042 (Wailers — Kingston sessions)", status: "Approved" },
  { id: "REQ-0040", institution: "JCDC", asset: "ARC-0304 (Buju Banton — interview)", status: "Approved" },
  { id: "REQ-0039", institution: "UWI", asset: "ARC-0001 (Skatalites — original masters)", status: "Pending review" },
];

export default function ArchivistInstitutionPage() {
  const { allowed, denied } = usePageAccess("archivist_institution_portal", {
    pageLabel: "Reggae Archive SaaS — Institution Portal",
  });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Archivist", href: "/archivist" },
        { label: "Institution Portal" },
      ]}
    >
      <PageHeader
        eyebrow="Archivist"
        title="Reggae Archive SaaS — Institution Portal"
        sub="UWI, JCDC, museums. Three plan tiers. Archive access controls. Licensing request queue."
        accent="#A855F7"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Institution accounts" value={INSTITUTIONS.length} accent="#A855F7" />
        <StatCard label="Active plans" value={INSTITUTIONS.filter(i => i.status === "Active").length} accent="#22C55E" />
        <StatCard label="Licensing requests" value={LICENSING_QUEUE.length} sub="queue" accent="#fbbf24" />
        <StatCard label="Monthly revenue" value="$2,597" sub="across all institutions" accent="#06B6D4" />
      </div>

      {/* Plan tiers */}
      <Card title="Plan tiers" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ARCHIVE_PLANS.map((p) => (
            <div
              key={p.name}
              className="rounded-lg border p-4"
              style={{ borderColor: `${p.color}33`, background: `${p.color}0a` }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold" style={{ color: p.color }}>{p.name}</h3>
              </div>
              <div className="font-mono-raas text-2xl font-bold text-foreground">{p.price}</div>
              <div className="text-xs opacity-60 mt-1">{p.limit}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Institution accounts */}
        <Card title="Institution accounts">
          <div className="space-y-2">
            {INSTITUTIONS.map((inst) => (
              <div
                key={inst.name}
                className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <div>
                  <div className="text-sm font-medium">{inst.name}</div>
                  <div className="text-xs opacity-60">{inst.plan} plan</div>
                </div>
                <Pill color={inst.status === "Active" ? "#22C55E" : "#fbbf24"}>
                  <StatusDot color={inst.status === "Active" ? "#22C55E" : "#fbbf24"} pulse={inst.status !== "Active"} />
                  {inst.status}
                </Pill>
              </div>
            ))}
          </div>
        </Card>

        {/* Archive access controls */}
        <Card title="Archive access controls">
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Academic plan</span>
              <span className="font-mono-raas">View only · watermarked</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Cultural plan</span>
              <span className="font-mono-raas">View + API access</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Enterprise plan</span>
              <span className="font-mono-raas">On-prem + custom ingest</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Download limit</span>
              <span className="font-mono-raas">Tier-dependent</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Auth method</span>
              <span className="font-mono-raas">SAML SSO (Enterprise)</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Licensing request queue */}
      <Card title="Licensing request queue" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">Request</th>
                <th className="py-2 pr-3 font-medium">Institution</th>
                <th className="py-2 pr-3 font-medium">Asset</th>
                <th className="py-2 pr-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {LICENSING_QUEUE.map((r) => (
                <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-mono-raas text-xs opacity-70">{r.id}</td>
                  <td className="py-2.5 pr-3 text-xs">{r.institution}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-xs text-[#06B6D4]">{r.asset}</td>
                  <td className="py-2.5 pr-3">
                    <Pill color={r.status === "Approved" ? "#22C55E" : "#fbbf24"}>
                      <StatusDot color={r.status === "Approved" ? "#22C55E" : "#fbbf24"} pulse={r.status !== "Approved"} />
                      {r.status}
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
