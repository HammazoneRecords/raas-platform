"use client";

import Link from "next/link";
import { PageShell, PageHeader, LinkCard } from "@/components/raas/PageShell";
import { Card, StatCard, Pill } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById, PAGES } from "@/lib/raas/wireframe";
import {
  SUPPORTER_LEAGUE_FORMULA,
  SUPPORTER_LEAGUE_TABLE,
  ARTISTS,
} from "@/lib/raas/mock-data";

const page = pageById("artist_dashboard")!;

export default function ArtistDashboardPage() {
  const { allowed, denied } = usePageAccess("artist_dashboard", {
    pageLabel: "Artist Dashboard",
  });
  if (!allowed) return denied;

  const artist = ARTISTS[0];

  // Sub-pages (all 10) — driven by navBar minus dashboard itself
  const subPages = page.navBar
    .filter((id) => id !== "artist_dashboard")
    .map((id) => PAGES.find((p) => p.id === id)!)
    .filter(Boolean);

  return (
    <PageShell
      page={page}
      breadcrumbs={[{ label: "Hub", href: "/" }, { label: "Artist Dashboard" }]}
    >
      <PageHeader
        eyebrow="Artist"
        title={`Welcome back, ${artist.name}`}
        sub={`Your territory: ${artist.domain} · ${artist.league} league · $${artist.monthlyFee}/mo`}
        accent="#22C55E"
        right={
          <div className="flex gap-2">
            <Pill color="#22C55E">ADTL active</Pill>
            <Pill color="#fbbf24">{artist.brandExtension}</Pill>
          </div>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Monthly fee" value={`$${artist.monthlyFee}`} sub={artist.league} accent="#22C55E" />
        <StatCard label="ADTL Licence" value="Active" sub="Inheritable + sellable" accent="#06B6D4" />
        <StatCard label="Brand ext. Y1" value={artist.y1Revenue ? `$${(artist.y1Revenue / 1000).toFixed(0)}K` : "—"} sub={artist.brandExtension} accent="#EC4899" />
        <StatCard label="Territory value" value="$84K" sub="5yr+ resale ceiling: $6.5K" accent="#fbbf24" />
      </div>

      {/* Quick actions */}
      <Card title="Quick actions" className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/artist/rassline"
            className="rounded-md bg-[#fbbf24] px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#f59e0b]"
          >
            Drop a new release →
          </Link>
          <Link
            href="/artist/merch"
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
          >
            Add merch →
          </Link>
          <Link
            href="/artist/cultural-api"
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
          >
            Check API revenue →
          </Link>
          <Link
            href="/artist/community"
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
          >
            View community →
          </Link>
          <Link
            href="/artist/revenue"
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
          >
            Withdraw from RASSPay →
          </Link>
        </div>
      </Card>

      {/* Sub-page grid */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {subPages.map((p) => (
          <LinkCard
            key={p.id}
            href={p.route}
            title={p.title}
            desc={p.blurb}
            accent="#22C55E"
          />
        ))}
      </div>

      {/* Supporter League pricing reference */}
      <Card title="Supporter League — pricing reference">
        <p className="text-xs opacity-60 mb-3 font-mono-raas">{SUPPORTER_LEAGUE_FORMULA}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SUPPORTER_LEAGUE_TABLE.map((row) => (
            <div
              key={row.subs}
              className="rounded-md border border-white/5 bg-white/[0.015] p-3 text-center"
            >
              <div className="text-[10px] uppercase tracking-wider opacity-50">
                {row.subs} subs
              </div>
              <div className="mt-1 font-mono-raas text-sm font-bold text-[#fbbf24]">
                {row.price}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
