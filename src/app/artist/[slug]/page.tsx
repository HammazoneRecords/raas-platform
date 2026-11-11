"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, Pill, StatCard, StatusDot } from "@/components/raas/Card";
import { artistBySlug } from "@/lib/raas/mock-data";
import { pageById } from "@/lib/raas/wireframe";

const page = pageById("artist_territory_public")!;

const INCLUDED = [
  { label: "Domain", desc: "Your own .ja web address, fully owned." },
  { label: "Site", desc: "Mobile-first artist site built on RAAS Layer 1." },
  { label: "Storefront", desc: "Merch, vinyl, digital — escrow-protected sales." },
  { label: "Cultural API", desc: "Six endpoints, 100% of revenue to you, metered." },
  { label: "Fan data", desc: "First-party fan list you own. Not rented from a platform." },
  { label: "Inheritance", desc: "ADTL territories are heritable. Will it to whoever you choose." },
];

export default function ArtistTerritoryPublicPage() {
  const params = useParams<{ slug: string }>();
  const artist = artistBySlug(params.slug);
  if (!artist) notFound();

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Marketplace", href: "/marketplace" },
        { label: artist.name },
      ]}
      showLeftNav={false}
    >
      {/* Hero */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/5 p-8 md:p-10 mb-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(34,197,94,0.04) 50%, transparent)",
        }}
      >
        <div className="raas-grid-bg absolute inset-0 opacity-30" />
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs">
              <Pill color="#22C55E">
                <StatusDot color="#22C55E" pulse /> Live
              </Pill>
              <span className="opacity-50">{artist.league} league</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">{artist.name}</h1>
            <a
              href={`https://${artist.domain}`}
              className="mt-2 inline-flex items-center gap-1 font-mono-raas text-sm text-[#fbbf24] hover:underline underline-offset-4"
              target="_blank"
              rel="noreferrer noopener"
            >
              {artist.domain} ↗
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/fan"
              className="inline-flex items-center gap-2 rounded-md bg-[#fbbf24] px-4 py-2 text-sm font-semibold text-black hover:bg-[#f59e0b]"
            >
              Support {artist.name.split(" ")[0]} →
            </Link>
            <a
              href={`https://${artist.domain}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium hover:bg-white/[0.06]"
            >
              Visit live site ↗
            </a>
          </div>
        </div>
      </div>

      {/* Stats — public-facing only */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          label="Brand extension"
          value={artist.brandExtension}
          sub="Live product line"
          accent="#EC4899"
        />
        <StatCard
          label="Year-1 revenue"
          value={artist.y1Revenue ? `$${(artist.y1Revenue / 1000).toFixed(0)}K` : "—"}
          sub={artist.y1Revenue ? "Reported by artist" : "Not yet reported"}
          accent="#fbbf24"
        />
        <StatCard
          label="Monthly fee"
          value={artist.monthlyFee === 0 ? "Free" : `$${artist.monthlyFee}/mo`}
          sub={`${artist.league} league`}
          accent="#06B6D4"
        />
      </div>

      {/* What's included */}
      <Card title="What this territory includes" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INCLUDED.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fbbf24]" />
              <div className="min-w-0">
                <div className="text-sm font-medium">{item.label}</div>
                <div className="mt-0.5 text-xs opacity-60">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Cross-links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href="/fan"
          className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
        >
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Fan</div>
          <div className="text-sm font-medium">Become a supporter →</div>
          <div className="text-xs opacity-55 mt-1">Four tiers from $5/mo</div>
        </Link>
        <Link
          href={`/artist/merch`}
          className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
        >
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Merch</div>
          <div className="text-sm font-medium">Browse the merch store →</div>
          <div className="text-xs opacity-55 mt-1">RASSPay escrow-protected</div>
        </Link>
        <Link
          href="/artist/brand-extension"
          className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
        >
          <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Brand extension</div>
          <div className="text-sm font-medium">See the product line →</div>
          <div className="text-xs opacity-55 mt-1">{artist.brandExtension}</div>
        </Link>
      </div>

      <div className="mt-6 text-center text-xs opacity-50">
        Want a territory like this one?{" "}
        <Link href="/artist" className="text-[#fbbf24] hover:underline underline-offset-4">
          Claim your domain
        </Link>
      </div>
    </PageShell>
  );
}
