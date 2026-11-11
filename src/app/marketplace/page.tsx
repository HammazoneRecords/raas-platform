"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { ARTISTS, PIPELINE_ARTISTS } from "@/lib/raas/mock-data";
import { pageById } from "@/lib/raas/wireframe";

const page = pageById("adtl_marketplace")!;

export default function MarketplacePage() {
  const liveCount = ARTISTS.filter((a) => a.status === "Live").length;
  const pipelineCount = PIPELINE_ARTISTS.length;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "ADTL Marketplace" },
      ]}
    >
      <PageHeader
        eyebrow="ADTL Marketplace"
        title="Live artist territories"
        sub="Every artist on RAAS gets their own domain, storefront, fan data, and Cultural API. Browse the territories that have already shipped."
        accent="#22C55E"
      />

      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Live artists" value={liveCount} accent="#22C55E" />
        <StatCard label="In pipeline" value={pipelineCount} accent="#fbbf24" />
        <StatCard
          label="Avg Y1 revenue"
          value="$78K"
          sub="of artists who launched"
          accent="#06B6D4"
        />
        <StatCard label="Brand extensions" value="6" sub="live product lines" accent="#EC4899" />
      </div>

      <Card title="Live artist sites" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ARTISTS.map((a) => (
            <Link
              key={a.slug}
              href={`/artist/${a.slug}`}
              className="group block rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="min-w-0">
                  <div className="font-semibold truncate">{a.name}</div>
                  <div className="font-mono-raas text-xs opacity-50 truncate">{a.domain}</div>
                </div>
                <Pill color="#22C55E">{a.status}</Pill>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="opacity-40 text-[10px] uppercase tracking-wider mb-0.5">Brand ext.</div>
                  <div className="truncate">{a.brandExtension}</div>
                </div>
                <div>
                  <div className="opacity-40 text-[10px] uppercase tracking-wider mb-0.5">Y1 revenue</div>
                  <div className="font-mono-raas">
                    {a.y1Revenue ? `$${(a.y1Revenue / 1000).toFixed(0)}K` : "—"}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] opacity-50">{a.league} league</span>
                <span className="text-[10px] text-[#fbbf24] opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit territory →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      <Card title="In the pipeline" accent="#fbbf24">
        <p className="text-xs opacity-60 mb-3">
          These artists are mid-build. Their territory goes live the moment their ADTL Licence is signed.
        </p>
        <div className="space-y-2">
          {PIPELINE_ARTISTS.map((p) => (
            <div
              key={p.slug}
              className="flex items-center gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{p.name}</div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${p.progress}%`,
                      background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                    }}
                  />
                </div>
              </div>
              <span className="font-mono-raas text-xs opacity-60">{p.progress}%</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.015] p-4">
        <div className="flex items-center gap-2 text-xs opacity-60">
          <StatusDot color="#fbbf24" pulse />
          <span>Want a territory of your own?</span>
        </div>
        <Link
          href="/artist"
          className="text-xs text-[#fbbf24] hover:underline underline-offset-4"
        >
          Claim your domain →
        </Link>
      </div>
    </PageShell>
  );
}
