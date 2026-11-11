"use client";

import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";

const page = pageById("admin_partner_onboarding")!;

const ONBOARDING_CHECKLIST = [
  { item: "Application submitted", done: true },
  { item: "Business registration verified", done: true },
  { item: "Manufacturing capability audit", done: true },
  { item: "Sample product approved", done: true },
  { item: "Insurance + liability docs", done: false },
  { item: "RASSPay merchant account", done: false },
  { item: "Pilot order placed", done: false },
  { item: "Pilot delivered + accepted", done: false },
];

const PENDING_APPLICATIONS = [
  { name: "Kingston Printery", specialty: "Generic local printery", submitted: "2026-11-04", stage: 4 },
  { name: "Portmore Stitch", specialty: "Apparel / hats", submitted: "2026-10-28", stage: 2 },
  { name: "Montego Vinyl Co.", specialty: "Vinyl pressing", submitted: "2026-10-21", stage: 6 },
];

const APPROVED_PARTNERS = [
  { name: "Sun Island", approved: "2026-08-12", specialty: "Beverages" },
  { name: "Rebel13", approved: "2026-08-15", specialty: "Apparel" },
  { name: "Twins of Twins", approved: "2026-09-02", specialty: "Headwear" },
];

export default function AdminPartnerOnboardingPage() {
  const { allowed, denied } = usePageAccess("admin_partner_onboarding", {
    pageLabel: "Manufacturing Partner Onboarding",
  });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Admin", href: "/admin" },
        { label: "Partner Onboarding" },
      ]}
    >
      <PageHeader
        eyebrow="Admin"
        title="Manufacturing Partner Onboarding"
        sub="Eight-step checklist. Three pending applications. Three approved partners."
        accent="#0EA5E9"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Approved partners" value={APPROVED_PARTNERS.length} accent="#22C55E" />
        <StatCard label="Pending applications" value={PENDING_APPLICATIONS.length} accent="#fbbf24" />
        <StatCard label="Onboarding steps" value={ONBOARDING_CHECKLIST.length} accent="#06B6D4" />
        <StatCard label="Avg approval time" value="14 days" accent="#A855F7" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Onboarding checklist */}
        <Card title="Onboarding checklist (8 steps)">
          <div className="space-y-2">
            {ONBOARDING_CHECKLIST.map((c, i) => (
              <div
                key={c.item}
                className={`flex items-center justify-between rounded-md border p-3 ${
                  c.done
                    ? "border-[#22C55E]/20 bg-[#22C55E]/[0.04]"
                    : "border-white/5 bg-white/[0.015]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-mono-raas font-bold shrink-0"
                    style={{
                      background: c.done ? "#22C55E" : "rgba(255,255,255,0.05)",
                      color: c.done ? "#0a0a0f" : "#94A3B8",
                      border: c.done ? "1px solid #22C55E" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {c.done ? "✓" : i + 1}
                  </span>
                  <span className="text-sm">{c.item}</span>
                </div>
                <Pill color={c.done ? "#22C55E" : "#94A3B8"}>
                  {c.done ? "Done" : "Pending"}
                </Pill>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending applications */}
        <Card
          title="Pending applications"
          action={<Pill color="#fbbf24">{PENDING_APPLICATIONS.length} pending</Pill>}
        >
          <div className="space-y-3">
            {PENDING_APPLICATIONS.map((a) => (
              <div
                key={a.name}
                className="rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm font-medium">{a.name}</div>
                    <div className="text-xs opacity-60">{a.specialty}</div>
                  </div>
                  <span className="text-[11px] opacity-60 font-mono-raas">submitted {a.submitted}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="opacity-50">Stage {a.stage} of {ONBOARDING_CHECKLIST.length}</span>
                  <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(a.stage / ONBOARDING_CHECKLIST.length) * 100}%`, background: "linear-gradient(90deg, #fbbf24, #22C55E)" }}
                    />
                  </div>
                  <Pill color="#fbbf24">{ONBOARDING_CHECKLIST[a.stage - 1]?.item.slice(0, 20) ?? "In progress"}</Pill>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Approved partners */}
      <Card
        title="Approved partners"
        action={<Pill color="#22C55E"><StatusDot color="#22C55E" pulse /> {APPROVED_PARTNERS.length} active</Pill>}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">Partner</th>
                <th className="py-2 pr-3 font-medium">Specialty</th>
                <th className="py-2 pr-3 font-medium">Approved</th>
                <th className="py-2 pr-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {APPROVED_PARTNERS.map((p) => (
                <tr key={p.name} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-medium">{p.name}</td>
                  <td className="py-2.5 pr-3 text-xs opacity-70">{p.specialty}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-xs opacity-70">{p.approved}</td>
                  <td className="py-2.5 pr-3">
                    <Pill color="#22C55E">
                      <StatusDot color="#22C55E" /> Active
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
