"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { API_TIERS, API_KEYS, BILL_HISTORY } from "@/lib/raas/mock-data";

const page = pageById("cultural_api_billing")!;

export default function DevBillingPage() {
  const { allowed, denied } = usePageAccess("cultural_api_billing", {
    pageLabel: "API Rate Limit Tiers + Billing",
  });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Dev", href: "/dev" },
        { label: "Billing" },
      ]}
    >
      <PageHeader
        eyebrow="B2B Developer"
        title="API Rate Limit Tiers + Billing"
        sub="Three tiers, monthly bills, RASSPay (PayPal underlying)."
        accent="#06B6D4"
        right={
          <Link href="/dev" className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]">
            Dev portal →
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Current tier" value="Pro" sub="$49/mo" accent="#06B6D4" />
        <StatCard label="Calls this month" value="8,421" sub="of 10K daily cap × 30" accent="#fbbf24" />
        <StatCard label="Next bill" value="$49.00" sub="Dec 1, 2026" accent="#EC4899" />
        <StatCard label="YTD spend" value="$196" sub="4 months active" accent="#22C55E" />
      </div>

      {/* Tier comparison */}
      <Card title="Tier comparison & current usage" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {API_TIERS.map((t) => {
            const current = t.name === "Pro";
            return (
              <div
                key={t.name}
                className={`rounded-lg border p-4 ${
                  current ? "border-[#06B6D4]/40 bg-[#06B6D4]/[0.05]" : "border-white/5 bg-white/[0.015]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: t.color }}>{t.name}</h3>
                  {current && <Pill color="#06B6D4">Current</Pill>}
                </div>
                <div className="font-mono-raas text-2xl font-bold text-foreground">{t.price}</div>
                <div className="text-xs opacity-60 mt-1">{t.callsPerDay}</div>
                {current && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <div className="text-[10px] opacity-50 mb-1">Usage today</div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${8421 / 10000 * 100}%`, background: t.color }}
                      />
                    </div>
                    <div className="text-[10px] opacity-60 mt-1 font-mono-raas">8,421 / 10,000</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly bill history */}
        <Card title="Monthly bill history">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                  <th className="py-2 pr-3 font-medium">Month</th>
                  <th className="py-2 pr-3 font-medium">Calls</th>
                  <th className="py-2 pr-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {BILL_HISTORY.map((b) => (
                  <tr key={b.month} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="py-2.5 pr-3 font-mono-raas text-xs">{b.month}</td>
                    <td className="py-2.5 pr-3 font-mono-raas">{b.calls.toLocaleString()}</td>
                    <td className="py-2.5 pr-3 font-mono-raas text-[#fbbf24]">
                      ${b.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Payment method */}
        <Card
          title="Payment method"
          action={<Pill color="#22C55E"><StatusDot color="#22C55E" pulse /> Active</Pill>}
        >
          <div className="rounded-md border border-white/5 bg-white/[0.015] p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-medium">RASSPay</div>
                <div className="text-[11px] opacity-60">PayPal underlying</div>
              </div>
              <span className="font-mono-raas text-xs opacity-50">•••• 4242</span>
            </div>
            <div className="text-[11px] opacity-50">
              Auto-billed on the 1st of each month.
            </div>
          </div>
          <button
            type="button"
            className="mt-3 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium hover:bg-white/[0.06]"
          >
            Update payment method
          </button>
        </Card>
      </div>

      {/* API key management */}
      <Card title="API key management" className="mt-6">
        <div className="space-y-2">
          {API_KEYS.map((k) => (
            <div
              key={k.label}
              className="flex items-center justify-between gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium">{k.label}</div>
                <div className="text-xs font-mono-raas opacity-60 truncate">{k.key}</div>
                <div className="text-[10px] opacity-50 mt-1">
                  Created {k.created} · Last used {k.lastUsed}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] font-medium hover:bg-white/[0.06]"
                >
                  Copy
                </button>
                <button
                  type="button"
                  className="rounded-md border border-[#EF4444]/30 bg-[#EF4444]/[0.05] px-2 py-1 text-[11px] font-medium text-[#EF4444] hover:bg-[#EF4444]/[0.1]"
                >
                  Rotate
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 rounded-md bg-[#06B6D4] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0891b2]"
        >
          + Generate new key
        </button>
      </Card>
    </PageShell>
  );
}
