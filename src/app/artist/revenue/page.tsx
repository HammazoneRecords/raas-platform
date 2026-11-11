"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { RASSPAY_MODES, RECENT_TRANSACTIONS } from "@/lib/raas/mock-data";

const page = pageById("artist_revenue")!;

const ROYALTY_SPLITS = [
  { track: "BabylonFall (2026)", dsp: "Spotify", amount: 421.84, share: 100 },
  { track: "BabylonFall (2026)", dsp: "Apple Music", amount: 218.42, share: 100 },
  { track: "YaadLife EP", dsp: "Spotify", amount: 612.18, share: 100 },
  { track: "YaadLife EP", dsp: "YouTube Music", amount: 88.12, share: 100 },
];

const WITHDRAWAL_METHODS = [
  { method: "RASSPay → PayPal", fee: "0%", time: "instant" },
  { method: "RASSPay → bank wire", fee: "$8", time: "1-2 business days" },
  { method: "RASSPay → escrow hold", fee: "free", time: "—" },
];

export default function ArtistRevenuePage() {
  const { allowed, denied } = usePageAccess("artist_revenue", { pageLabel: "Artist Revenue" });
  if (!allowed) return denied;

  const escrowBalance = 12480.42;
  const availableBalance = 8210.18;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "Revenue" },
      ]}
    >
      <PageHeader
        eyebrow="Artist"
        title="Revenue"
        sub="RASSPay escrow balance, royalty splits, withdrawal methods, and full transaction history."
        accent="#fbbf24"
        right={
          <Link
            href="/investor"
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
          >
            Investor view →
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="RASSPay escrow" value={`$${escrowBalance.toLocaleString()}`} sub="in 60-day window" accent="#fbbf24" />
        <StatCard label="Available balance" value={`$${availableBalance.toLocaleString()}`} sub="ready to withdraw" accent="#22C55E" />
        <StatCard label="Mode" value="Escrow" sub="default" accent="#06B6D4" />
        <StatCard label="Royalty share" value="100%" sub="RAAS takes no cut of DSP revenue" accent="#EC4899" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* RASSPay mode */}
        <Card
          title="RASSPay mode"
          action={<Pill color="#fbbf24">Default: escrow</Pill>}
        >
          <p className="text-xs opacity-60 mb-3">
            Choose how payments land. Escrow protects buyers (60-day claim window). Direct send skips escrow but exposes you to chargebacks.
          </p>
          <div className="space-y-2">
            {RASSPAY_MODES.map((mode, i) => (
              <div
                key={mode}
                className={`flex items-center justify-between rounded-md border p-3 ${
                  i === 0
                    ? "border-[#fbbf24]/30 bg-[#fbbf24]/[0.04]"
                    : "border-white/5 bg-white/[0.015]"
                }`}
              >
                <div>
                  <div className="text-sm font-medium">{mode}</div>
                  <div className="text-[11px] opacity-60">
                    {i === 0 ? "Recommended · 60-day claim window" : "No claim window · you absorb chargebacks"}
                  </div>
                </div>
                {i === 0 && <Pill color="#fbbf24">Current</Pill>}
              </div>
            ))}
          </div>
        </Card>

        {/* Withdrawal methods */}
        <Card title="Withdrawal methods">
          <div className="space-y-2">
            {WITHDRAWAL_METHODS.map((w) => (
              <div
                key={w.method}
                className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <div>
                  <div className="text-sm font-medium">{w.method}</div>
                  <div className="text-[11px] opacity-60">{w.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono-raas text-sm">{w.fee}</div>
                  <div className="text-[10px] opacity-50">fee</div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-4 w-full rounded-md bg-[#fbbf24] px-3 py-2 text-xs font-semibold text-black hover:bg-[#f59e0b]"
            type="button"
          >
            Withdraw ${availableBalance.toLocaleString()} →
          </button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Streaming royalty splits */}
        <Card title="Streaming royalty splits">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                  <th className="py-2 pr-3 font-medium">Track</th>
                  <th className="py-2 pr-3 font-medium">DSP</th>
                  <th className="py-2 pr-3 font-medium">Amount</th>
                  <th className="py-2 pr-3 font-medium">Share</th>
                </tr>
              </thead>
              <tbody>
                {ROYALTY_SPLITS.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="py-2.5 pr-3">{r.track}</td>
                    <td className="py-2.5 pr-3 text-xs opacity-70">{r.dsp}</td>
                    <td className="py-2.5 pr-3 font-mono-raas">${r.amount.toFixed(2)}</td>
                    <td className="py-2.5 pr-3 font-mono-raas text-[#22C55E]">{r.share}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Transaction history */}
        <Card title="Transaction history">
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {RECENT_TRANSACTIONS.concat(RECENT_TRANSACTIONS).map((tx, i) => (
              <div
                key={i}
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
      </div>
    </PageShell>
  );
}
