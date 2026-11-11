"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { MANUFACTURERS, MERCH_CATALOG } from "@/lib/raas/mock-data";

const page = pageById("admin_manufacturing_partners")!;

export default function AdminManufacturingPartnersPage() {
  const { allowed, denied } = usePageAccess("admin_manufacturing_partners", {
    pageLabel: "Manufacturing Partner Portal",
  });
  if (!allowed) return denied;

  const activeOrders = MANUFACTURERS.reduce((s, m) => s + m.activeOrders, 0);

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Admin", href: "/admin" },
        { label: "Manufacturing Partners" },
      ]}
    >
      <PageHeader
        eyebrow="Admin"
        title="Manufacturing Partner Portal"
        sub="Sun Island, Rebel13, Twins of Twins + generic local printery. NOT Romeich Wear — explicit policy."
        accent="#0EA5E9"
        right={
          <Link href="/admin/partner-onboarding" className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]">
            Onboarding queue →
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Active partners" value={MANUFACTURERS.filter(m => m.status === "Active").length} accent="#22C55E" />
        <StatCard label="Active orders" value={activeOrders} accent="#fbbf24" />
        <StatCard label="Avg lead time" value="15 days" accent="#06B6D4" />
        <StatCard label="60-day claims" value="2" sub="open disputes" accent="#EF4444" />
      </div>

      {/* Partners */}
      <Card title="Manufacturing partners" className="mb-6">
        <div className="space-y-3">
          {MANUFACTURERS.map((m) => {
            const color = m.status === "Active" ? "#22C55E" : m.status === "Onboarding" ? "#fbbf24" : "#94A3B8";
            return (
              <div
                key={m.name}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{m.name}</h3>
                      <Pill color={color}>
                        <StatusDot color={color} pulse={m.status !== "Active"} />
                        {m.status}
                      </Pill>
                    </div>
                    <div className="text-xs opacity-60 mt-0.5">{m.specialty}</div>
                  </div>
                  <Link
                    href="/artist/brand-extension"
                    className="text-[11px] text-[#0EA5E9] hover:underline underline-offset-4"
                  >
                    Artist view →
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="opacity-40 uppercase tracking-wider text-[10px] mb-0.5">Capacity</div>
                    <div className="font-mono-raas">{m.capacity}</div>
                  </div>
                  <div>
                    <div className="opacity-40 uppercase tracking-wider text-[10px] mb-0.5">Lead time</div>
                    <div className="font-mono-raas">{m.leadTime}</div>
                  </div>
                  <div>
                    <div className="opacity-40 uppercase tracking-wider text-[10px] mb-0.5">Active orders</div>
                    <div className="font-mono-raas text-[#fbbf24]">{m.activeOrders}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Active orders */}
      <Card title="Active orders" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">SKU</th>
                <th className="py-2 pr-3 font-medium">Product</th>
                <th className="py-2 pr-3 font-medium">Partner</th>
                <th className="py-2 pr-3 font-medium">Quantity</th>
                <th className="py-2 pr-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {MERCH_CATALOG.map((p) => (
                <tr key={p.sku} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-mono-raas text-xs opacity-70">{p.sku}</td>
                  <td className="py-2.5 pr-3">{p.name}</td>
                  <td className="py-2.5 pr-3 text-xs opacity-70">{p.partner}</td>
                  <td className="py-2.5 pr-3 font-mono-raas">{p.stock} units</td>
                  <td className="py-2.5 pr-3">
                    <Pill color="#22C55E"><StatusDot color="#22C55E" /> In stock</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 60-day merch claim */}
      <Card title="60-day merch claim" accent="#fbbf24">
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="opacity-60">Open claims</span>
            <span className="font-mono-raas text-[#fbbf24]">2</span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="opacity-60">Avg resolution time</span>
            <span className="font-mono-raas">4.2 days</span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="opacity-60">Win rate (in artist favor)</span>
            <span className="font-mono-raas text-[#22C55E]">78%</span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="opacity-60">Reserved in escrow</span>
            <span className="font-mono-raas">$8,420</span>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
