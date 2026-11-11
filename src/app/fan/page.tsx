"use client";

import Link from "next/link";
import { PageShell, PageHeader, LinkCard } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import {
  FAN_STATS,
  FAN_RANKS,
  FAN_SUPPORTED_ARTISTS,
  RASSPAY_MODES,
} from "@/lib/raas/mock-data";

const page = pageById("fan_dashboard")!;

export default function FanDashboardPage() {
  const { allowed, denied } = usePageAccess("fan_dashboard", { pageLabel: "Fan Dashboard" });
  if (!allowed) return denied;

  const nextRank = FAN_RANKS.find((r) => r.threshold.replace(/[$,]/g, "") > FAN_STATS.monthlySupport * 100);

  return (
    <PageShell
      page={page}
      breadcrumbs={[{ label: "Hub", href: "/" }, { label: "Fan Dashboard" }]}
    >
      <PageHeader
        eyebrow="Fan"
        title="Your support, your rank"
        sub="Every dollar goes through RASSPay escrow. Artists get paid fairly, you get recognized."
        accent="#EC4899"
        right={
          <Link
            href="/fan/ai-voice-generator"
            className="inline-flex items-center gap-2 rounded-md bg-[#EC4899] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#db2777]"
          >
            Generate AI Voice →
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Artists supported" value={FAN_STATS.artistsSupported} accent="#EC4899" />
        <StatCard label="Monthly support" value={`$${FAN_STATS.monthlySupport}`} accent="#fbbf24" />
        <StatCard label="Lifetime support" value={`$${FAN_STATS.lifetimeSupport.toLocaleString()}`} accent="#22C55E" />
        <StatCard label="Fan rank" value={FAN_STATS.fanRank} sub="next: Rastafari @ $200/mo" accent="#A855F7" />
      </div>

      {/* Rank ladder */}
      <Card title="Fan rank ladder" className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FAN_RANKS.map((r) => {
            const current = r.name === FAN_STATS.fanRank;
            return (
              <div
                key={r.name}
                className={`rounded-lg border p-4 text-center ${
                  current
                    ? "border-[#A855F7]/40 bg-[#A855F7]/[0.06]"
                    : "border-white/5 bg-white/[0.015]"
                }`}
              >
                <div
                  className="mx-auto mb-2 h-2 w-2 rounded-full"
                  style={{ background: r.color }}
                />
                <div className="font-semibold text-sm" style={{ color: r.color }}>
                  {r.name}
                </div>
                <div className="text-[11px] opacity-60 font-mono-raas mt-1">{r.threshold}</div>
                {current && (
                  <Pill color="#A855F7" className="mt-2">
                    <StatusDot color="#A855F7" pulse /> You
                  </Pill>
                )}
              </div>
            );
          })}
        </div>
        {nextRank && (
          <div className="mt-3 text-xs opacity-60 text-center">
            You&apos;re ${(200 - FAN_STATS.monthlySupport).toFixed(0)}/mo away from{" "}
            <span style={{ color: nextRank.color }} className="font-semibold">
              {nextRank.name}
            </span>
            .
          </div>
        )}
      </Card>

      {/* Artists you support */}
      <Card title="Artists you support" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FAN_SUPPORTED_ARTISTS.map((a) => (
            <Link
              key={a.slug}
              href={`/artist/${a.slug}`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.05]"
            >
              <div className="min-w-0">
                <div className="font-semibold truncate">{a.name}</div>
                <div className="text-xs opacity-60">{a.tier} tier · ${a.amount}/mo</div>
              </div>
              <span className="text-xs text-[#EC4899] opacity-0 group-hover:opacity-100 transition-opacity">
                View →
              </span>
            </Link>
          ))}
        </div>
      </Card>

      {/* RASSPay info */}
      <Card title="RASSPay — how your money flows">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="rounded-md border border-[#fbbf24]/20 bg-[#fbbf24]/[0.04] p-3">
            <div className="text-sm font-semibold mb-1">Escrow (default)</div>
            <div className="text-[11px] opacity-70">
              Your support sits in escrow for 60 days. If an artist violates terms, you can dispute and recover funds.
            </div>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.015] p-3">
            <div className="text-sm font-semibold mb-1">Direct send (optional)</div>
            <div className="text-[11px] opacity-70">
              Skip escrow. Funds go straight to the artist. Faster, but no dispute protection.
            </div>
          </div>
        </div>
        <div className="text-[11px] opacity-50">
          Current mode: <span className="font-mono-raas text-[#fbbf24]">{RASSPAY_MODES[0]}</span>
        </div>
      </Card>

      <div className="mt-6">
        <LinkCard
          href="/fan/ai-voice-generator"
          title="Suno for Yardies — generate a song with an artist's official AI voice →"
          desc="$0.50 per generation. 100% goes to the artist."
          accent="#EC4899"
        />
      </div>
    </PageShell>
  );
}
