"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import {
  CULTURAL_ENDPOINTS,
  CULTURAL_API_RECENT_SALES,
  CULTURAL_API_REVENUE_SHARE,
} from "@/lib/raas/mock-data";

const page = pageById("artist_cultural_api")!;

export default function ArtistCulturalApiPage() {
  const { allowed, denied } = usePageAccess("artist_cultural_api", {
    pageLabel: "Cultural API Monetization",
  });
  if (!allowed) return denied;

  const total = CULTURAL_API_RECENT_SALES.reduce((s, x) => s + x.amount, 0);
  const artistShare = (total * CULTURAL_API_REVENUE_SHARE.artist) / 100;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "Cultural API" },
      ]}
    >
      <PageHeader
        eyebrow="Artist"
        title="Cultural API Monetization"
        sub="Six cultural endpoints. 70/30 split. Live revenue. You own the culture — you should get paid when anyone uses it."
        accent="#06B6D4"
        right={
          <Link
            href="/dev"
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
          >
            Dev portal →
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Last 5 sales" value={`$${total.toFixed(2)}`} sub="trailing 48h" accent="#fbbf24" />
        <StatCard label="Your share (70%)" value={`$${artistShare.toFixed(2)}`} sub="auto-released" accent="#22C55E" />
        <StatCard label="RAAS share (30%)" value={`$${(total - artistShare).toFixed(2)}`} sub="platform fee" accent="#06B6D4" />
        <StatCard label="Endpoints live" value={CULTURAL_ENDPOINTS.length} sub="all monetized" accent="#EC4899" />
      </div>

      {/* Revenue split bar */}
      <Card title="Revenue share" className="mb-6">
        <div className="flex h-3 overflow-hidden rounded-full bg-white/5">
          <div
            style={{
              width: `${CULTURAL_API_REVENUE_SHARE.artist}%`,
              background: "#22C55E",
            }}
          />
          <div
            style={{
              width: `${CULTURAL_API_REVENUE_SHARE.raas}%`,
              background: "#06B6D4",
            }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
            Artist {CULTURAL_API_REVENUE_SHARE.artist}%
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />
            RAAS {CULTURAL_API_REVENUE_SHARE.raas}%
          </span>
        </div>
      </Card>

      {/* 6 endpoints */}
      <Card title="Your 6 cultural endpoints" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CULTURAL_ENDPOINTS.map((ep) => (
            <div
              key={ep.path}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-raas text-xs text-[#06B6D4]">{ep.path}</span>
                <Pill color="#22C55E">
                  <StatusDot color="#22C55E" pulse /> Live
                </Pill>
              </div>
              <div className="font-semibold text-sm">{ep.name}</div>
              <div className="mt-1 text-xs opacity-60">{ep.desc}</div>
              <div className="mt-3 font-mono-raas text-xs text-[#fbbf24]">{ep.price}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent sales */}
      <Card title="Recent sales">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">Endpoint</th>
                <th className="py-2 pr-3 font-medium">Buyer</th>
                <th className="py-2 pr-3 font-medium">Amount</th>
                <th className="py-2 pr-3 font-medium">Your share</th>
                <th className="py-2 pr-3 font-medium">When</th>
              </tr>
            </thead>
            <tbody>
              {CULTURAL_API_RECENT_SALES.map((s, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-mono-raas text-xs text-[#06B6D4]">{s.endpoint}</td>
                  <td className="py-2.5 pr-3">{s.buyer}</td>
                  <td className="py-2.5 pr-3 font-mono-raas">${s.amount.toFixed(2)}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-[#22C55E]">
                    ${(s.amount * 0.7).toFixed(2)}
                  </td>
                  <td className="py-2.5 pr-3 text-xs opacity-60">{s.ts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
