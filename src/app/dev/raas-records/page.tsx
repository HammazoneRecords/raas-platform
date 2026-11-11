"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { SAMPLE_ERAS, RAAS_RECORDS_TIERS } from "@/lib/raas/mock-data";

const page = pageById("raas_records_buyer")!;

export default function RaasRecordsBuyerPage() {
  const { allowed, denied } = usePageAccess("raas_records_buyer", { pageLabel: "RAAS Records B2B Buyer Portal" });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Dev", href: "/dev" },
        { label: "RAAS Records" },
      ]}
    >
      <PageHeader
        eyebrow="B2B Developer"
        title="RAAS Records — B2B Buyer Portal"
        sub="Sample library by era — 60s ska to 2000s+ modern. Stems, loops, full tracks. Cleared for commercial use."
        accent="#fbbf24"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total samples" value={SAMPLE_ERAS.reduce((s, e) => s + e.tracks, 0)} accent="#fbbf24" />
        <StatCard label="Eras covered" value={SAMPLE_ERAS.length} accent="#22C55E" />
        <StatCard label="Your downloads (mo)" value="142" sub="of 1,000 cap" accent="#06B6D4" />
        <StatCard label="Current plan" value="Pro" sub="$199/mo" accent="#fbbf24" />
      </div>

      {/* Era browser */}
      <Card title="Sample library by era" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SAMPLE_ERAS.map((era) => (
            <div
              key={era.era}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-4 cursor-pointer hover:bg-white/[0.04] transition-colors"
              style={{ borderTop: `2px solid ${era.color}` }}
            >
              <div className="text-xs uppercase tracking-wider opacity-50 mb-1">{era.era.split(" ")[0]}</div>
              <div className="font-semibold text-sm mb-2">{era.era}</div>
              <div className="font-mono-raas text-xl font-bold" style={{ color: era.color }}>
                {era.tracks}
              </div>
              <div className="text-[10px] opacity-50 mt-1">tracks available</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pricing tiers */}
      <Card title="Pricing tiers" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RAAS_RECORDS_TIERS.map((t) => {
            const current = t.name === "Pro";
            return (
              <div
                key={t.name}
                className={`rounded-lg border p-4 ${
                  current
                    ? "border-[#fbbf24]/40 bg-[#fbbf24]/[0.05]"
                    : "border-white/5 bg-white/[0.015]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{t.name}</h3>
                  {current && <Pill color="#fbbf24">Current</Pill>}
                </div>
                <div className="font-mono-raas text-2xl font-bold text-[#fbbf24]">${t.price}</div>
                <div className="text-xs opacity-60 mt-1">{t.limit}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Licensing terms */}
      <Card title="Licensing terms">
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22C55E]" />
            <div>
              <strong className="text-foreground">Commercial use:</strong> All samples cleared for commercial use, including ads, films, games.
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#06B6D4]" />
            <div>
              <strong className="text-foreground">No attribution required:</strong> Pro and Enterprise tiers do not require attribution in the final work.
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fbbf24]" />
            <div>
              <strong className="text-foreground">Revenue share:</strong> Original artist receives 100% of every sample sale. RAAS takes no cut — platform cost is covered by the buyer&apos;s subscription tier.
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF4444]" />
            <div>
              <strong className="text-foreground">No resale:</strong> You may use samples in derivative works but cannot resell them as-is.
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center text-xs opacity-60">
        Need custom stems or one-on-one licensing?{" "}
        <Link href="/dev/b2b-studio" className="text-[#A855F7] hover:underline underline-offset-4">
          Try the B2B Sonic Studio →
        </Link>
      </div>
    </PageShell>
  );
}
