"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { ARTISTS } from "@/lib/raas/mock-data";

const page = pageById("artist_territory_switcher")!;

export default function ArtistMultiTerritoryPage() {
  const { allowed, denied } = usePageAccess("artist_territory_switcher", {
    pageLabel: "Multi-Territory Management",
  });
  if (!allowed) return denied;

  // Demo: the artist also manages 2 other territories
  const territories = [
    { ...ARTISTS[0], current: true },
    { ...ARTISTS[1], current: false },
    { ...ARTISTS[3], current: false },
  ];

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "Multi-Territory" },
      ]}
    >
      <PageHeader
        eyebrow="Artist"
        title="Multi-Territory Management"
        sub="One account, many territories. Switch context without re-logging in. Each territory keeps its own RASSPay balance and ADTL Licence."
        accent="#22C55E"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Territories managed" value={territories.length} accent="#22C55E" />
        <StatCard label="Combined monthly fee" value={`$${territories.reduce((s, a) => s + a.monthlyFee, 0)}`} accent="#fbbf24" />
        <StatCard label="Combined Y1 rev" value="$261K" sub="across territories" accent="#06B6D4" />
        <StatCard label="ADTL active" value={territories.length} sub="all in good standing" accent="#A855F7" />
      </div>

      <Card title="Your territories">
        <div className="space-y-3">
          {territories.map((t) => (
            <div
              key={t.slug}
              className={`flex items-center justify-between gap-3 rounded-lg border p-4 ${
                t.current
                  ? "border-[#22C55E]/30 bg-[#22C55E]/[0.04]"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold truncate">{t.name}</span>
                  {t.current && <Pill color="#22C55E">Current</Pill>}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs opacity-60">
                  <span className="font-mono-raas">{t.domain}</span>
                  <span>·</span>
                  <span>{t.brandExtension}</span>
                  <span>·</span>
                  <span>{t.league} league</span>
                  <span>·</span>
                  <span>${t.monthlyFee}/mo</span>
                </div>
              </div>
              {!t.current && (
                <button
                  type="button"
                  className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
                >
                  Switch to →
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.015] p-4 text-xs opacity-60">
        Need to manage more territories?{" "}
        <Link href="/marketplace" className="text-[#fbbf24] hover:underline underline-offset-4">
          Claim a new domain →
        </Link>
      </div>
    </PageShell>
  );
}
