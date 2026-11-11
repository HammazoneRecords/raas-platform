"use client";

import Link from "next/link";
import { TopNav } from "@/components/raas/TopNav";
import { Footer } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { LEAGUES, LAYERS, ARTISTS, PIPELINE_ARTISTS } from "@/lib/raas/mock-data";

export default function HubPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />

      {/* HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="raas-grid-bg absolute inset-0 opacity-50" />
        <div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #fbbf24, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #A855F7, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px]">
              <StatusDot color="#22C55E" pulse />
              <span className="opacity-70">8 artists live · 3 in pipeline</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]">
              Reggae As A Service
            </h1>
            <p className="mt-5 text-lg md:text-xl text-foreground/80 max-w-2xl">
              Own your music. Own your fans. Own your{" "}
              <span className="text-[#fbbf24] font-semibold">digital domain</span>.
            </p>
            <p className="mt-3 text-sm opacity-60 font-mono-raas">
              PayPal for reggae · Starlink for culture · Amazon for riddim
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 rounded-md bg-[#fbbf24] px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-[#f59e0b] hover:shadow-[0_0_24px_#fbbf2455]"
              >
                Browse live artists →
              </Link>
              <Link
                href="/artist"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.06]"
              >
                I&apos;m an artist
              </Link>
            </div>
          </div>

          {/* Stats that matter to a first-time visitor */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
            <StatCard
              label="Free to Start"
              value="$0"
              sub="Under 500 YT or 50 Spotify"
              accent="#22C55E"
            />
            <StatCard
              label="From"
              value="$15/mo"
              sub="When your audience grows"
              accent="#06B6D4"
            />
            <StatCard
              label="You Keep"
              value="78%"
              sub="Of your fan revenue"
              accent="#fbbf24"
            />
          </div>
        </div>
      </section>

      {/* MAIN ───────────────────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 md:px-6 py-12 space-y-16">
        {/* LEAGUES */}
        <section>
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#fbbf24] font-medium mb-1">
              Tiers
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Pick your league
            </h2>
            <p className="mt-1 text-sm opacity-60 max-w-xl">
              From free to enterprise — your tier scales with your audience, not with our greed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {LEAGUES.map((l) => (
              <Card key={l.name} className="transition-colors hover:bg-white/[0.04]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{l.name}</h3>
                  <Pill color={l.color}>{l.price}</Pill>
                </div>
                <p className="text-xs opacity-60">{l.gate}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 8-LAYER STACK */}
        <section>
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#06B6D4] font-medium mb-1">
              Platform
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              The 8-layer stack
            </h2>
            <p className="mt-1 text-sm opacity-60 max-w-xl">
              Only Layer 1 is fully built today. The rest are coming, on a schedule you can verify.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {LAYERS.map((l) => {
              const color =
                l.status === "Live" ? "#22C55E" : l.status === "Building" ? "#fbbf24" : "#94A3B8";
              return (
                <Card key={l.n}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-raas text-[10px] opacity-50">
                        L{l.n}
                      </span>
                      <h3 className="font-semibold text-sm">{l.name}</h3>
                    </div>
                    <Pill color={color}>{l.status}</Pill>
                  </div>
                  <p className="text-xs opacity-60">{l.desc}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* LIVE ARTISTS PREVIEW */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#22C55E] font-medium mb-1">
                Live now
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                See the live artist sites
              </h2>
            </div>
            <Link
              href="/marketplace"
              className="text-sm text-[#fbbf24] hover:underline underline-offset-4"
            >
              All artists →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ARTISTS.slice(0, 6).map((a) => (
              <Link
                key={a.slug}
                href={`/artist/${a.slug}`}
                className="group block rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{a.name}</div>
                    <div className="font-mono-raas text-xs opacity-50 truncate">
                      {a.domain}
                    </div>
                  </div>
                  <Pill color="#22C55E">{a.status}</Pill>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs opacity-60">
                  <span className="truncate">{a.brandExtension}</span>
                  <span
                    className="text-[#fbbf24] opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pipeline */}
          <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.012] p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.18em] opacity-50">
                In the pipeline
              </span>
              <span className="text-[10px] opacity-30">·</span>
              <span className="text-[10px] opacity-50">
                {PIPELINE_ARTISTS.length} artists building their territory
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {PIPELINE_ARTISTS.map((p) => (
                <div
                  key={p.slug}
                  className="rounded-md border border-white/5 bg-white/[0.02] px-3 py-1.5 text-xs"
                >
                  <span className="opacity-70">{p.name}</span>
                  <span className="ml-2 opacity-40">{p.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Out of silence comes sound.
          </h2>
          <p className="mt-1 text-lg opacity-70">Out of sound comes power.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-md bg-[#fbbf24] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#f59e0b]"
            >
              Browse live artists →
            </Link>
            <Link
              href="/dev"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium hover:bg-white/[0.06]"
            >
              Explore the Cultural API
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
