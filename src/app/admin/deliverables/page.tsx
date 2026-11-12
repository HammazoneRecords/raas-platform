"use client";

import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, Pill } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { ROLE_DELIVERABLES, SUPPLIER_DELIVERY, HIERARCHY } from "@/lib/raas/mock-data";

const page = pageById("admin_deliverables")!;

const STATUS_COLOR: Record<string, string> = {
  "on-track": "#22C55E",
  "on-time": "#22C55E",
  done: "#06B6D4",
  delivered: "#06B6D4",
  "at-risk": "#fbbf24",
  late: "#EF4444",
};

export default function AdminDeliverablesPage() {
  const { allowed, denied } = usePageAccess("admin_deliverables", { pageLabel: "Deliverables & Hierarchy" });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Admin", href: "/admin" },
        { label: "Deliverables & Hierarchy" },
      ]}
    >
      <PageHeader
        eyebrow="Admin"
        title="Deliverables & Hierarchy"
        sub="Who reports to whom, what every stakeholder must deliver, and whether suppliers hit their dates."
        accent="#0EA5E9"
      />

      {/* ── Hierarchy ─────────────────────────────────────────────────── */}
      <Card title="Stakeholder hierarchy" className="mb-6">
        <p className="text-xs opacity-60 mb-4">
          The chain of accountability: the Founder/CEO at the top, admin/ops executing the mandate,
          artists and fans carrying value, investors gated to the founder, archivists and suppliers
          reporting to admin.
        </p>
        <div className="space-y-2">
          {HIERARCHY.map((n) => {
            const depth = (() => {
              let d = 0;
              let cur: string | null = n.id;
              const byId = Object.fromEntries(HIERARCHY.map((h) => [h.id, h]));
              while (cur && byId[cur]?.reportsTo) {
                d += 1;
                cur = byId[cur].reportsTo;
              }
              return d;
            })();
            return (
              <div
                key={n.id}
                className="flex items-center gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3"
                style={{ marginLeft: `${depth * 24}px`, borderLeft: `3px solid ${n.color}` }}
              >
                <span className="text-sm font-medium whitespace-nowrap" style={{ color: n.color }}>
                  {n.label}
                </span>
                <span className="text-[11px] opacity-60 truncate">{n.title}</span>
                {n.reportsTo && (
                  <span className="ml-auto text-[10px] opacity-40 whitespace-nowrap font-mono-raas">
                    ↑ {HIERARCHY.find((h) => h.id === n.reportsTo)?.label.split(" ")[0]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── Per-role deliverables ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {ROLE_DELIVERABLES.map((group) => {
          const accent =
            group.roleId === "fan" ? "#EC4899"
            : group.roleId === "artist" ? "#22C55E"
            : group.roleId === "b2b_dev" ? "#06B6D4"
            : group.roleId === "investor" ? "#EF4444"
            : group.roleId === "founder" ? "#fbbf24"
            : "#A855F7";
          return (
            <Card key={group.roleId} title={group.headline} accent={accent}>
              <p className="text-xs opacity-60 mb-3">{group.goal}</p>
              <div className="space-y-2">
                {group.items.map((d) => (
                  <div
                    key={d.what}
                    className="rounded-md border border-white/5 bg-white/[0.015] p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium">{d.what}</span>
                      <Pill color={STATUS_COLOR[d.status]}>
                        {d.status.replace("-", " ").toUpperCase()}
                      </Pill>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] opacity-50">
                      <span>Cadence: {d.cadence} · Owner: {d.owner}</span>
                    </div>
                    {d.note && <div className="mt-1 text-[10px] opacity-60 font-mono-raas">{d.note}</div>}
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* ── Supplier on-time & logistics ──────────────────────────────── */}
      <Card title="Supplier delivery — on time & logistics" accent="#fbbf24">
        <p className="text-xs opacity-60 mb-4">
          Manufacturing partners and what they owe us, when it lands, and how it ships. Romeich Wear
          is deliberately not on this list.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider opacity-50">
                <th className="py-2 pr-4">Supplier</th>
                <th className="py-2 pr-4">Deliverable</th>
                <th className="py-2 pr-4">Due</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Logistics</th>
              </tr>
            </thead>
            <tbody>
              {SUPPLIER_DELIVERY.map((s, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-2 pr-4 font-medium whitespace-nowrap">{s.supplier}</td>
                  <td className="py-2 pr-4">{s.deliverable}</td>
                  <td className="py-2 pr-4 font-mono-raas opacity-70">{s.due}</td>
                  <td className="py-2 pr-4">
                    <Pill color={STATUS_COLOR[s.status]}>{s.status.replace("-", " ").toUpperCase()}</Pill>
                  </td>
                  <td className="py-2 opacity-70">{s.logistics}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
