"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import {
  AI_VOICE_TOPICS_ALLOWED,
  AI_VOICE_TOPICS_BLOCKED,
  AI_VOICE_REVENUE_SPLIT_ARTIST,
  HARDWARE_STATUS,
} from "@/lib/raas/mock-data";

const page = pageById("artist_ai_voice")!;

export default function ArtistAiVoicePage() {
  const { allowed, denied } = usePageAccess("artist_ai_voice", { pageLabel: "AI Voice Control" });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "AI Voice" },
      ]}
    >
      <PageHeader
        eyebrow="Artist · Pioneer feature"
        title="AI Voice Control"
        sub="Either you have your official AI voice generating income for you, or someone else clones your voice and you get nothing."
        accent="#A855F7"
        right={<Pill color="#A855F7">Pioneer</Pill>}
      />

      {/* Hero quote */}
      <div className="mb-6 rounded-2xl border border-[#A855F7]/20 bg-gradient-to-br from-[#A855F7]/[0.06] to-transparent p-6 md:p-8">
        <p className="text-lg md:text-xl font-medium leading-snug">
          “Either you have your{" "}
          <span className="text-[#A855F7] font-semibold">official AI voice</span>{" "}
          generating income for you, or someone else clones your voice and you get nothing.”
        </p>
        <p className="mt-3 text-xs opacity-50">— RAAS Pioneer Programme</p>
      </div>

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Price per generation" value="$0.50" sub="paid by fan" accent="#fbbf24" />
        <StatCard label="Your share" value={`${AI_VOICE_REVENUE_SPLIT_ARTIST.artist}%`} sub="of each gen" accent="#22C55E" />
        <StatCard label="RAAS share" value={`${AI_VOICE_REVENUE_SPLIT_ARTIST.raas}%`} sub="platform" accent="#06B6D4" />
        <StatCard
          label="Hardware"
          value={HARDWARE_STATUS.ready ? "Live" : "Pending"}
          sub={HARDWARE_STATUS.name}
          accent={HARDWARE_STATUS.ready ? "#22C55E" : "#fbbf24"}
        />
      </div>

      {/* Hardware status */}
      <Card title="Hardware status" className="mb-6">
        <div
          className="rounded-lg border p-4"
          style={{
            borderColor: `${HARDWARE_STATUS.ready ? "#22C55E" : "#fbbf24"}33`,
            background: `${HARDWARE_STATUS.ready ? "#22C55E" : "#fbbf24"}0a`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <StatusDot color={HARDWARE_STATUS.ready ? "#22C55E" : "#fbbf24"} pulse />
              <span className="font-semibold">{HARDWARE_STATUS.name}</span>
            </div>
            <Pill color={HARDWARE_STATUS.ready ? "#22C55E" : "#fbbf24"}>
              {HARDWARE_STATUS.ready ? "Ready" : "Pending delivery"}
            </Pill>
          </div>
          <div className="text-xs opacity-70 mb-2">
            Spec: <span className="font-mono-raas">{HARDWARE_STATUS.spec}</span>
          </div>
          <div className="text-xs opacity-60">{HARDWARE_STATUS.note}</div>
          <div className="mt-3 flex items-center gap-3 text-[11px] opacity-60">
            <Link href="/admin/ai-agents" className="text-[#06B6D4] hover:underline underline-offset-4">
              Admin AI agents →
            </Link>
            <Link href="/fan/ai-voice-generator" className="text-[#EC4899] hover:underline underline-offset-4">
              Fan-side generator →
            </Link>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allowed topics */}
        <Card
          title="Topics you allow"
          action={<Pill color="#22C55E">{AI_VOICE_TOPICS_ALLOWED.length} allowed</Pill>}
        >
          <div className="space-y-2">
            {AI_VOICE_TOPICS_ALLOWED.map((t) => (
              <div
                key={t}
                className="flex items-center gap-3 rounded-md border border-[#22C55E]/15 bg-[#22C55E]/[0.04] p-3"
              >
                <StatusDot color="#22C55E" />
                <span className="text-sm font-medium">{t}</span>
                <Pill color="#22C55E" className="ml-auto">allowed</Pill>
              </div>
            ))}
          </div>
        </Card>

        {/* Blocked topics */}
        <Card
          title="Topics you block"
          action={<Pill color="#EF4444">{AI_VOICE_TOPICS_BLOCKED.length} blocked</Pill>}
        >
          <div className="space-y-2">
            {AI_VOICE_TOPICS_BLOCKED.map((t) => (
              <div
                key={t}
                className="flex items-center gap-3 rounded-md border border-[#EF4444]/15 bg-[#EF4444]/[0.04] p-3"
              >
                <StatusDot color="#EF4444" />
                <span className="text-sm font-medium">{t}</span>
                <Pill color="#EF4444" className="ml-auto">blocked</Pill>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.015] p-4 text-xs opacity-60">
        Pricing per generation and revenue share can be edited in your{" "}
        <Link href="/artist/settings" className="text-[#fbbf24] hover:underline underline-offset-4">
          artist settings
        </Link>
        . Changes take effect for new generations only.
      </div>
    </PageShell>
  );
}
