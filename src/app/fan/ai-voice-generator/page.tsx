"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import {
  ARTISTS,
  AI_VOICE_TOPICS_ALLOWED,
  AI_VOICE_PRICE_PER_GEN,
  AI_VOICE_REVENUE_SPLIT_FAN,
  HARDWARE_STATUS,
} from "@/lib/raas/mock-data";

const page = pageById("fan_ai_voice_generator")!;

export default function FanAiVoiceGeneratorPage() {
  const { allowed, denied } = usePageAccess("fan_ai_voice_generator", {
    pageLabel: "Fan AI Voice Generator",
  });
  const [artistSlug, setArtistSlug] = useState(ARTISTS[0].slug);
  const [topic, setTopic] = useState(AI_VOICE_TOPICS_ALLOWED[0]);
  const [generated, setGenerated] = useState<string | null>(null);

  if (!allowed) return denied;

  const handleGenerate = () => {
    setGenerated(`Generated ${topic} song with ${artistSlug}'s official AI voice · $0.50 charged`);
  };

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Fan", href: "/fan" },
        { label: "AI Voice Generator" },
      ]}
    >
      <PageHeader
        eyebrow="Fan · Pioneer feature"
        title="Suno for Yardies"
        sub="Generate personalized songs with an artist's official AI voice. The artist sets the boundaries — and gets 65% of every generation."
        accent="#EC4899"
        right={<Pill color="#A855F7">Pioneer</Pill>}
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Price per generation" value={`$${AI_VOICE_PRICE_PER_GEN.toFixed(2)}`} sub="via RASSPay" accent="#fbbf24" />
        <StatCard label="Artist share" value={`${AI_VOICE_REVENUE_SPLIT_FAN.artist}%`} accent="#22C55E" />
        <StatCard label="RAAS share" value={`${AI_VOICE_REVENUE_SPLIT_FAN.raas}%`} accent="#06B6D4" />
        <StatCard label="Compute" value={`${AI_VOICE_REVENUE_SPLIT_FAN.compute}%`} sub="GPU cost" accent="#A855F7" />
      </div>

      {/* Hardware status banner */}
      {!HARDWARE_STATUS.ready && (
        <div
          className="mb-6 rounded-xl border p-4 flex items-center gap-3"
          style={{
            borderColor: "#fbbf2433",
            background: "#fbbf240a",
          }}
        >
          <StatusDot color="#fbbf24" pulse />
          <div className="flex-1 text-xs">
            <strong>Tranche 2 hardware pending.</strong>{" "}
            {HARDWARE_STATUS.spec} not yet delivered. Your generation will queue and process when hardware is live.
          </div>
          <Link
            href="/artist/ai-voice"
            className="text-[11px] text-[#fbbf24] hover:underline underline-offset-4"
          >
            Artist view →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generator */}
        <Card title="Generate">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider opacity-50">Artist</label>
              <select
                value={artistSlug}
                onChange={(e) => setArtistSlug(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#EC4899]/50"
              >
                {ARTISTS.map((a) => (
                  <option key={a.slug} value={a.slug} className="bg-[#0a0a0f]">
                    {a.name} — {a.domain}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider opacity-50">
                Topic (from artist&apos;s allowed list)
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#EC4899]/50"
              >
                {AI_VOICE_TOPICS_ALLOWED.map((t) => (
                  <option key={t} value={t} className="bg-[#0a0a0f]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-md border border-white/5 bg-white/[0.015] p-3 text-xs opacity-60">
              You can only generate on topics the artist has explicitly allowed. Blocked topics are filtered out at the API level.
            </div>
            <button
              type="button"
              onClick={handleGenerate}
              className="w-full rounded-md bg-[#EC4899] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#db2777] transition-colors"
            >
              Generate · $0.50 via RASSPay →
            </button>
            {generated && (
              <div className="rounded-md border border-[#22C55E]/20 bg-[#22C55E]/[0.04] p-3 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <StatusDot color="#22C55E" />
                  <span className="font-semibold">Generation queued</span>
                </div>
                <div className="opacity-70 font-mono-raas">{generated}</div>
              </div>
            )}
          </div>
        </Card>

        {/* Revenue split + artist boundaries */}
        <div className="space-y-6">
          <Card title="Revenue split per generation">
            <div className="flex h-3 overflow-hidden rounded-full bg-white/5">
              <div style={{ width: `${AI_VOICE_REVENUE_SPLIT_FAN.artist}%`, background: "#22C55E" }} />
              <div style={{ width: `${AI_VOICE_REVENUE_SPLIT_FAN.raas}%`, background: "#06B6D4" }} />
              <div style={{ width: `${AI_VOICE_REVENUE_SPLIT_FAN.compute}%`, background: "#A855F7" }} />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#22C55E]" /> Artist
                </div>
                <div className="font-mono-raas mt-1 text-[#22C55E]">
                  ${((AI_VOICE_PRICE_PER_GEN * AI_VOICE_REVENUE_SPLIT_FAN.artist) / 100).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#06B6D4]" /> RAAS
                </div>
                <div className="font-mono-raas mt-1 text-[#06B6D4]">
                  ${((AI_VOICE_PRICE_PER_GEN * AI_VOICE_REVENUE_SPLIT_FAN.raas) / 100).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#A855F7]" /> Compute
                </div>
                <div className="font-mono-raas mt-1 text-[#A855F7]">
                  ${((AI_VOICE_PRICE_PER_GEN * AI_VOICE_REVENUE_SPLIT_FAN.compute) / 100).toFixed(2)}
                </div>
              </div>
            </div>
          </Card>

          <Card title={"Artist's AI boundaries"}>
            <div className="space-y-1.5 text-xs">
              {AI_VOICE_TOPICS_ALLOWED.map((t) => (
                <div key={t} className="flex items-center gap-2 text-[#22C55E]">
                  <StatusDot color="#22C55E" /> {t}
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 text-[11px] opacity-60">
              The artist has full control over their AI voice — they decide what topics are allowed, what&apos;s blocked, and how much each generation costs.{" "}
              <Link href="/artist/ai-voice" className="text-[#EC4899] hover:underline underline-offset-4">
                See how artists configure this →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
