"use client";

import Link from "next/link";
import { PageShell, PageHeader, LinkCard } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import {
  API_KEYS,
  API_TIERS,
  CULTURAL_ENDPOINTS,
  RECENT_API_CALLS,
} from "@/lib/raas/mock-data";

const page = pageById("cultural_api_dev_portal")!;

const CURL_EXAMPLE = `curl -X GET "https://api.raas.ja/v1/dubloop" \\
  -H "Authorization: Bearer raas_live_8f3a...c21" \\
  -H "X-Maze-Role: b2b_dev"`;

export default function DevPortalPage() {
  const { allowed, denied } = usePageAccess("cultural_api_dev_portal", {
    pageLabel: "Cultural API Developer Portal",
  });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[{ label: "Hub", href: "/" }, { label: "Cultural API Dev Portal" }]}
    >
      <PageHeader
        eyebrow="B2B Developer"
        title="Cultural API — Developer Portal"
        sub="Six cultural endpoints. Three tiers. Live usage stats. Build with reggae."
        accent="#06B6D4"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="API calls this month" value="8,421" sub="of 10K daily cap" accent="#06B6D4" />
        <StatCard label="Avg latency" value="142ms" sub="p95" accent="#22C55E" />
        <StatCard label="Error rate" value="0.4%" sub="last 7 days" accent="#fbbf24" />
        <StatCard label="Current tier" value="Pro" sub="$49/mo" accent="#fbbf24" />
      </div>

      {/* API keys */}
      <Card title="API keys" className="mb-6">
        <div className="space-y-2">
          {API_KEYS.map((k) => (
            <div
              key={k.label}
              className="flex items-center justify-between gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium">{k.label}</div>
                <div className="text-xs font-mono-raas opacity-60 truncate">{k.key}</div>
                <div className="text-[10px] opacity-50 mt-1">
                  Created {k.created} · Last used {k.lastUsed}
                </div>
              </div>
              <button
                type="button"
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] font-medium hover:bg-white/[0.06]"
              >
                Rotate
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Rate limits */}
      <Card title="Rate limit tiers" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {API_TIERS.map((t) => {
            const current = t.name === "Pro";
            return (
              <div
                key={t.name}
                className={`rounded-lg border p-4 ${
                  current
                    ? "border-[#06B6D4]/40 bg-[#06B6D4]/[0.05]"
                    : "border-white/5 bg-white/[0.015]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: t.color }}>{t.name}</h3>
                  {current && <Pill color="#06B6D4">Current</Pill>}
                </div>
                <div className="font-mono-raas text-2xl font-bold text-foreground">{t.price}</div>
                <div className="text-xs opacity-60 mt-1">{t.callsPerDay}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Endpoints */}
      <Card title="Endpoints" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CULTURAL_ENDPOINTS.map((ep) => (
            <div
              key={ep.path}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-raas text-xs text-[#06B6D4]">GET {ep.path}</span>
                <Pill color="#22C55E">
                  <StatusDot color="#22C55E" pulse /> 200
                </Pill>
              </div>
              <div className="font-semibold text-sm">{ep.name}</div>
              <div className="mt-1 text-xs opacity-60">{ep.desc}</div>
              <div className="mt-3 font-mono-raas text-xs text-[#fbbf24]">{ep.price}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Curl example */}
      <Card title="Example request" className="mb-6">
        <pre className="overflow-x-auto rounded-md border border-white/5 bg-black/40 p-4 text-xs font-mono-raas text-[#06B6D4]">
{`$ ${CURL_EXAMPLE}

# Response:
{
  "track_id": "dubloop_001",
  "era": "70s roots dub",
  "bpm": 72,
  "stems": ["bass", "drums", "echo"],
  "duration_sec": 8.0,
  "license": "commercial",
  "price_usd": 9.40
}`}
        </pre>
      </Card>

      {/* Recent API calls */}
      <Card title="Recent API calls">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">Endpoint</th>
                <th className="py-2 pr-3 font-medium">Status</th>
                <th className="py-2 pr-3 font-medium">Latency</th>
                <th className="py-2 pr-3 font-medium">When</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_API_CALLS.map((c, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-mono-raas text-xs text-[#06B6D4]">{c.endpoint}</td>
                  <td className="py-2.5 pr-3">
                    <Pill color={c.status === 200 ? "#22C55E" : c.status === 429 ? "#fbbf24" : "#EF4444"}>
                      {c.status}
                    </Pill>
                  </td>
                  <td className="py-2.5 pr-3 font-mono-raas">{c.latency}ms</td>
                  <td className="py-2.5 pr-3 text-xs opacity-60">{c.ts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <LinkCard href="/dev/billing" title="Billing & rate limits →" desc="Three tiers, monthly bills" accent="#06B6D4" />
        <LinkCard href="/dev/b2b-studio" title="B2B Sonic Studio →" desc="Custom jingles & soundtracks" accent="#A855F7" />
        <LinkCard href="/dev/raas-records" title="RAAS Records →" desc="Sample library by era" accent="#fbbf24" />
      </div>
    </PageShell>
  );
}
