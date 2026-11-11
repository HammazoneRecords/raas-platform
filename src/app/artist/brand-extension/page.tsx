"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { ARTISTS, BRAND_LADDER, MANUFACTURERS } from "@/lib/raas/mock-data";

const page = pageById("artist_brand_extension")!;

export default function ArtistBrandExtensionPage() {
  const { allowed, denied } = usePageAccess("artist_brand_extension", {
    pageLabel: "Brand Extension Manager",
  });
  if (!allowed) return denied;

  const artist = ARTISTS[0];
  // Demo: artist is currently at step 6 (In production)
  const currentStep = 5; // 0-indexed = "Production run scheduled"

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "Brand Extension" },
      ]}
    >
      <PageHeader
        eyebrow="Artist"
        title="Brand Extension Manager"
        sub="Your physical product line — from proposal to available for sale."
        accent="#EC4899"
        right={<Pill color="#EC4899">{artist.brandExtension}</Pill>}
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Current product" value={artist.brandExtension} sub="Energy drink, 12-pack" accent="#EC4899" />
        <StatCard label="Y1 projection" value={artist.y1Revenue ? `$${(artist.y1Revenue / 1000).toFixed(0)}K` : "—"} sub="based on audience" accent="#fbbf24" />
        <StatCard label="Manufacturing partner" value="Sun Island" sub="10K units/mo capacity" accent="#06B6D4" />
        <StatCard label="Stage" value={BRAND_LADDER[currentStep]} sub={`step ${currentStep + 1} of ${BRAND_LADDER.length}`} accent="#22C55E" />
      </div>

      {/* 9-step status ladder */}
      <Card title="9-step status ladder" className="mb-6">
        <p className="text-xs opacity-60 mb-4">
          Every brand extension moves through these 9 stages. Your current product is at stage {currentStep + 1}.
        </p>
        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-white/10" />
          <div
            className="absolute left-4 top-2 w-px bg-[#22C55E] transition-all"
            style={{ height: `${(currentStep / (BRAND_LADDER.length - 1)) * 100}%` }}
          />
          <div className="space-y-2">
            {BRAND_LADDER.map((step, i) => {
              const done = i < currentStep;
              const active = i === currentStep;
              return (
                <div key={step} className="relative flex items-center gap-3 pl-10">
                  <span
                    className="absolute left-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px]"
                    style={{
                      background: done ? "#22C55E" : active ? "#fbbf24" : "rgba(255,255,255,0.05)",
                      border: active ? "2px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
                      color: done ? "#0a0a0f" : active ? "#0a0a0f" : "#94A3B8",
                    }}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <div
                    className={`flex-1 rounded-md border p-3 text-sm ${
                      active
                        ? "border-[#fbbf24]/30 bg-[#fbbf24]/[0.04]"
                        : done
                        ? "border-white/5 bg-white/[0.015] opacity-70"
                        : "border-white/5 bg-white/[0.005] opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{step}</span>
                      {active && (
                        <Pill color="#fbbf24">
                          <StatusDot color="#fbbf24" pulse /> Current
                        </Pill>
                      )}
                      {done && <Pill color="#22C55E">Done</Pill>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Manufacturing partners */}
      <Card
        title="Manufacturing partners"
        action={
          <Link
            href="/admin/manufacturing-partners"
            className="text-[11px] text-[#06B6D4] hover:underline underline-offset-4"
          >
            Admin view →
          </Link>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MANUFACTURERS.map((m) => (
            <div
              key={m.name}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">{m.name}</div>
                <Pill
                  color={
                    m.status === "Active" ? "#22C55E" : m.status === "Onboarding" ? "#fbbf24" : "#94A3B8"
                  }
                >
                  {m.status}
                </Pill>
              </div>
              <div className="text-xs opacity-60 mb-2">{m.specialty}</div>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <div className="opacity-40 uppercase tracking-wider text-[10px]">Capacity</div>
                  <div className="font-mono-raas">{m.capacity}</div>
                </div>
                <div>
                  <div className="opacity-40 uppercase tracking-wider text-[10px]">Lead</div>
                  <div className="font-mono-raas">{m.leadTime}</div>
                </div>
                <div>
                  <div className="opacity-40 uppercase tracking-wider text-[10px]">Orders</div>
                  <div className="font-mono-raas">{m.activeOrders}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[11px] opacity-50">
          Note: Romeich Wear is intentionally excluded from this list. RAAS works only with vetted Jamaican manufacturers.
        </div>
      </Card>
    </PageShell>
  );
}
