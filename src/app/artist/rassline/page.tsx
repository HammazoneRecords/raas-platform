"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { RASSLINE_STAGES, UPCOMING_RELEASES } from "@/lib/raas/mock-data";

const page = pageById("artist_rassline")!;

const PAST_RELEASES = [
  { title: "YaadAnthem (2026)", streams: 184210, revenue: 4218.42, released: "2026-09-12" },
  { title: "KingstonLights (2026)", streams: 92140, revenue: 2184.18, released: "2026-07-04" },
  { title: "Roots & Truth (2025)", streams: 412800, revenue: 8842.10, released: "2025-11-20" },
];

export default function ArtistRasslinePage() {
  const { allowed, denied } = usePageAccess("artist_rassline", { pageLabel: "RASSline — Release Pipeline" });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "RASSline" },
      ]}
    >
      <PageHeader
        eyebrow="Artist"
        title="RASSline — Release Pipeline"
        sub="Seven stages from track upload to fan analytics. Every release walks the same path."
        accent="#22C55E"
        right={
          <button
            type="button"
            className="rounded-md bg-[#fbbf24] px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#f59e0b]"
          >
            + New release
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="In pipeline" value={UPCOMING_RELEASES.length} accent="#fbbf24" />
        <StatCard label="Released (12mo)" value={PAST_RELEASES.length} accent="#22C55E" />
        <StatCard label="Avg pre-saves" value="1,129" sub="per release" accent="#06B6D4" />
        <StatCard label="Stages" value={RASSLINE_STAGES.length} sub="upload → analytics" accent="#A855F7" />
      </div>

      {/* Pipeline visualization */}
      <Card title="7-stage release pipeline" className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {RASSLINE_STAGES.map((s, i) => (
            <div key={s} className="flex items-center gap-2 shrink-0">
              <div className="flex flex-col items-center gap-2 min-w-[120px]">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold font-mono-raas"
                  style={{
                    background: "rgba(34, 197, 94, 0.12)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    color: "#22C55E",
                  }}
                >
                  {i + 1}
                </div>
                <div className="text-[11px] text-center font-medium leading-tight">{s}</div>
              </div>
              {i < RASSLINE_STAGES.length - 1 && (
                <div className="h-px w-6 bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming releases */}
      <Card title="Upcoming releases" className="mb-6">
        <div className="space-y-3">
          {UPCOMING_RELEASES.map((r) => {
            const stageName = RASSLINE_STAGES[r.stage - 1];
            const progress = (r.stage / RASSLINE_STAGES.length) * 100;
            return (
              <div
                key={r.title}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="font-semibold">{r.title}</div>
                    <div className="text-xs opacity-60">Release: {r.releaseDate}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill color="#fbbf24">Stage {r.stage}/7</Pill>
                    <Pill color="#22C55E">{r.presaves} pre-saves</Pill>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${progress}%`, background: "linear-gradient(90deg, #fbbf24, #22C55E)" }}
                    />
                  </div>
                  <span className="text-[11px] opacity-70 font-medium whitespace-nowrap">{stageName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Past releases */}
      <Card title="Past releases">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">Title</th>
                <th className="py-2 pr-3 font-medium">Released</th>
                <th className="py-2 pr-3 font-medium">Streams</th>
                <th className="py-2 pr-3 font-medium">Revenue</th>
                <th className="py-2 pr-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {PAST_RELEASES.map((r) => (
                <tr key={r.title} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-medium">{r.title}</td>
                  <td className="py-2.5 pr-3 text-xs opacity-70 font-mono-raas">{r.released}</td>
                  <td className="py-2.5 pr-3 font-mono-raas">{r.streams.toLocaleString()}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-[#22C55E]">${r.revenue.toLocaleString()}</td>
                  <td className="py-2.5 pr-3">
                    <Pill color="#22C55E">
                      <StatusDot color="#22C55E" /> Live
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
