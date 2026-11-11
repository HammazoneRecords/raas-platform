"use client";

import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { MERCH_CATALOG, RECENT_TRANSACTIONS } from "@/lib/raas/mock-data";

const page = pageById("artist_merch")!;

export default function ArtistMerchPage() {
  const { allowed, denied } = usePageAccess("artist_merch", { pageLabel: "Artist Merch Store" });
  if (!allowed) return denied;

  const escrowBalance = 12480.42;
  const availableBalance = 8210.18;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "Merch" },
      ]}
    >
      <PageHeader
        eyebrow="Artist"
        title="Merch Store"
        sub="Product catalog, RASSPay escrow balance, and recent transactions."
        accent="#22C55E"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="RASSPay escrow" value={`$${escrowBalance.toLocaleString()}`} sub="in 60-day window" accent="#fbbf24" />
        <StatCard label="Available to withdraw" value={`$${availableBalance.toLocaleString()}`} sub="after escrow release" accent="#22C55E" />
        <StatCard label="Active SKUs" value={MERCH_CATALOG.length} sub="across 3 partners" accent="#06B6D4" />
        <StatCard label="60-day claims" value="2" sub="awaiting release" accent="#EC4899" />
      </div>

      <Card title="Product catalog" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">SKU</th>
                <th className="py-2 pr-3 font-medium">Product</th>
                <th className="py-2 pr-3 font-medium">Price</th>
                <th className="py-2 pr-3 font-medium">Stock</th>
                <th className="py-2 pr-3 font-medium">Partner</th>
              </tr>
            </thead>
            <tbody>
              {MERCH_CATALOG.map((p) => (
                <tr key={p.sku} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-mono-raas text-xs opacity-70">{p.sku}</td>
                  <td className="py-2.5 pr-3">{p.name}</td>
                  <td className="py-2.5 pr-3 font-mono-raas">${p.price}</td>
                  <td className="py-2.5 pr-3">
                    <Pill color={p.stock > 50 ? "#22C55E" : p.stock > 10 ? "#fbbf24" : "#EF4444"}>
                      {p.stock} in stock
                    </Pill>
                  </td>
                  <td className="py-2.5 pr-3 text-xs opacity-70">{p.partner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent transactions">
          <div className="space-y-2">
            {RECENT_TRANSACTIONS.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{tx.type}</div>
                  <div className="text-[11px] opacity-50 font-mono-raas">
                    {tx.id} · {tx.ts}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono-raas text-sm font-semibold text-[#fbbf24]">
                    +${tx.amount.toFixed(2)}
                  </div>
                  <Pill color={tx.status === "escrow" ? "#fbbf24" : "#22C55E"} className="mt-1">
                    <StatusDot color={tx.status === "escrow" ? "#fbbf24" : "#22C55E"} />
                    {tx.status}
                  </Pill>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="60-day merch claim reference" accent="#fbbf24">
          <p className="text-xs opacity-60 mb-3">
            Every merch sale is held in RASSPay escrow for 60 days. If a customer disputes, the funds stay frozen. After 60 days, the balance auto-releases to your available balance.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Standard claim window</span>
              <span className="font-mono-raas">60 days</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">High-value (&gt;$500)</span>
              <span className="font-mono-raas">90 days</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Auto-release to available</span>
              <span className="font-mono-raas">Day 61</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="opacity-60">Dispute fee (if lost)</span>
              <span className="font-mono-raas">$15 + chargeback</span>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
