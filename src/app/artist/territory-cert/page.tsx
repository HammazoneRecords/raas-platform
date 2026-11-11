"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { ARTISTS } from "@/lib/raas/mock-data";

const page = pageById("artist_territory_cert")!;

export default function ArtistTerritoryCertPage() {
  const { allowed, denied } = usePageAccess("artist_territory_cert", {
    pageLabel: "Territory Certificate",
  });
  if (!allowed) return denied;

  const artist = ARTISTS[0];
  const certId = `ADTL-${artist.slug.toUpperCase().slice(0, 4)}-0001`;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "Territory Certificate" },
      ]}
    >
      <PageHeader
        eyebrow="Artist"
        title="Territory Certificate"
        sub="Your ADTL Licence — the digital title for your domain. Inheritable, sellable, or both."
        accent="#fbbf24"
      />

      {/* Certificate */}
      <Card className="mb-6 !p-0 overflow-hidden">
        <div
          className="relative p-8 md:p-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.05), rgba(168,85,247,0.03) 50%, transparent)",
          }}
        >
          <div className="raas-grid-bg absolute inset-0 opacity-20" />
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md font-mono-raas font-bold"
                  style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", color: "#0a0a0f" }}
                >
                  R
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">
                    RAAS · MindWave JA
                  </div>
                  <div className="text-sm font-semibold">ADTL Licence</div>
                </div>
              </div>
              <Pill color="#22C55E">
                <StatusDot color="#22C55E" pulse /> Active
              </Pill>
            </div>

            <div className="text-[10px] uppercase tracking-[0.18em] opacity-50 mb-1">
              Territory holder
            </div>
            <div className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              {artist.name}
            </div>
            <div className="font-mono-raas text-sm text-[#fbbf24] mb-8">{artist.domain}</div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Certificate ID</div>
                <div className="font-mono-raas text-sm">{certId}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Issued</div>
                <div className="font-mono-raas text-sm">2026-08-12</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1">Transfer terms</div>
                <div className="font-mono-raas text-sm">Inheritable + sellable</div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-2">Current owner</div>
                <div className="text-sm font-medium">{artist.name}</div>
                <div className="text-xs opacity-60 font-mono-raas">artist@{artist.domain}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-50 mb-2">Successor (heir)</div>
                <div className="text-sm font-medium">Designated on file</div>
                <div className="text-xs opacity-60">Edit in artist settings</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Status" value="Active" sub="since 2026-08-12" accent="#22C55E" />
        <StatCard label="Inheritable" value="Yes" sub="will to anyone" accent="#A855F7" />
        <StatCard label="Sellable" value="Yes" sub="on secondary market" accent="#fbbf24" />
        <StatCard label="5yr+ resale" value="$6,500" sub="current ceiling" accent="#06B6D4" />
      </div>

      {/* Heir / transfer terms */}
      <Card title="Inheritance & transfer terms">
        <p className="text-sm opacity-70 mb-4">
          ADTL territories are <strong className="text-foreground">heritable</strong> — artist can will the domain to whoever they choose. They are also sellable on the{" "}
          <Link href="/territory-marketplace" className="text-[#fbbf24] hover:underline underline-offset-4">
            territory marketplace
          </Link>{" "}
          if the artist wants out.
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="opacity-60">Heir designation</span>
            <span className="font-mono-raas">Editable in settings</span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="opacity-60">Inheritance cost</span>
            <span className="font-mono-raas">$0 (free for heir)</span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="opacity-60">Sale fee (artist → buyer)</span>
            <span className="font-mono-raas">5% of sale price</span>
          </div>
          <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="opacity-60">Buy-back floor (decline path)</span>
            <span className="font-mono-raas">$50</span>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
