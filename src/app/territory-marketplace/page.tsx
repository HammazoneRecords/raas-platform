"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill } from "@/components/raas/Card";
import { RESELL_SCHEDULE } from "@/lib/raas/mock-data";
import { pageById } from "@/lib/raas/wireframe";

const page = pageById("territory_marketplace")!;

export default function TerritoryMarketplacePage() {
  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Marketplace", href: "/marketplace" },
        { label: "Territory Marketplace" },
      ]}
      showLeftNav={false}
    >
      <PageHeader
        eyebrow="Secondary Market"
        title="RAAS Territory Marketplace"
        sub="When an artist wants out, they can sell their territory on the secondary market. The longer they held it, the more it's worth."
        accent="#94A3B8"
      />

      {/* Resell schedule */}
      <Card title="Resell schedule" className="mb-6">
        <p className="text-xs opacity-60 mb-4">
          The price a territory commands on the secondary market, based on how long the original artist held it.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {RESELL_SCHEDULE.map((row) => (
            <div
              key={row.held}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-center"
            >
              <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">
                {row.held}
              </div>
              <div className="font-mono-raas text-xl font-bold text-[#fbbf24]">
                ${row.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs opacity-50">
          Resale revenue is split between the original artist (60%) and RAAS (40%). The artist keeps the lion&apos;s share because they built the audience.
        </div>
      </Card>

      {/* Decline path */}
      <Card
        title="The decline path"
        action={<Pill color="#EF4444">Last resort</Pill>}
        className="mb-6"
      >
        <div className="rounded-lg border border-[#EF4444]/20 bg-[#EF4444]/[0.04] p-4">
          <p className="text-sm">
            If an artist walks away and never sells, RAAS will buy the territory back for{" "}
            <span className="font-mono-raas font-bold text-[#fbbf24]">$50</span> — or hold it on the artist&apos;s behalf in case they (or their heir) come back.
          </p>
          <p className="mt-2 text-xs opacity-60">
            The $50 covers DNS transfer and escrow reconciliation. It&apos;s a fair-exit floor, not a ceiling.
          </p>
        </div>
      </Card>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Floor price" value="$50" sub="buy-back" accent="#EF4444" />
        <StatCard label="5yr+ ceiling" value="$6,500" sub="max resale" accent="#22C55E" />
        <StatCard label="Artist share" value="60%" sub="of resale" accent="#fbbf24" />
        <StatCard label="RAAS share" value="40%" sub="platform fee" accent="#06B6D4" />
      </div>

      {/* Cross-links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/marketplace"
          className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
        >
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Browse</div>
          <div className="text-sm font-medium">ADTL Marketplace →</div>
          <div className="text-xs opacity-55 mt-1">See live artist territories</div>
        </Link>
        <Link
          href="/artist/territory-cert"
          className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
        >
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Artist</div>
          <div className="text-sm font-medium">View your territory cert →</div>
          <div className="text-xs opacity-55 mt-1">If you already hold an ADTL Licence</div>
        </Link>
      </div>
    </PageShell>
  );
}
