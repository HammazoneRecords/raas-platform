"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { FAN_TIERS } from "@/lib/raas/mock-data";

const page = pageById("artist_community")!;

export default function ArtistCommunityPage() {
  const { allowed, denied } = usePageAccess("artist_community", { pageLabel: "Community (Artist View)" });
  if (!allowed) return denied;

  const mrr = FAN_TIERS.reduce((s, t) => {
    const num = parseInt(t.price.replace(/[$,]/g, ""), 10);
    return s + num * t.subs;
  }, 0);
  const totalSubs = FAN_TIERS.reduce((s, t) => s + t.subs, 0);

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "Community" },
      ]}
    >
      <PageHeader
        eyebrow="Artist"
        title="Community"
        sub="Four fan tiers. Real recurring revenue. The artist has the say unless they gave that right away in a prior contract."
        accent="#fbbf24"
        right={
          <Link
            href="/fan"
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
          >
            Fan view →
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total subscribers" value={totalSubs} sub="across 4 tiers" accent="#22C55E" />
        <StatCard label="MRR" value={`$${mrr.toLocaleString()}`} sub="monthly recurring" accent="#fbbf24" />
        <StatCard label="Avg per fan" value={`$${(mrr / totalSubs).toFixed(2)}`} sub="blended ARPU" accent="#06B6D4" />
        <StatCard label="Top tier" value={FAN_TIERS[3].subs} sub="Rastafari ($200/mo)" accent="#A855F7" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FAN_TIERS.map((t) => (
          <Card key={t.name}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Tier</div>
                <h3 className="font-bold text-lg" style={{ color: t.color }}>
                  {t.name}
                </h3>
                <div className="font-mono-raas text-sm opacity-70">{t.price}</div>
              </div>
              <Pill color={t.color}>{t.subs} subs</Pill>
            </div>
            <div className="space-y-1.5">
              {t.perks.map((perk) => (
                <div key={perk} className="flex items-start gap-2 text-xs">
                  <span
                    className="mt-1 h-1 w-1 shrink-0 rounded-full"
                    style={{ background: t.color }}
                  />
                  <span className="opacity-70">{perk}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 text-xs opacity-50">
              Monthly revenue:{" "}
              <span className="font-mono-raas text-foreground font-semibold" style={{ color: t.color }}>
                ${(parseInt(t.price.replace(/[$,]/g, ""), 10) * t.subs).toLocaleString()}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.015] p-4 text-xs opacity-70">
        <strong className="text-foreground">The artist has the say.</strong> Unless you gave that right away in a prior contract, you control pricing, perks, and who can subscribe.
      </div>
    </PageShell>
  );
}
