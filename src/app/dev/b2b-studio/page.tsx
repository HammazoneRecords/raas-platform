"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { SONIC_SERVICES, PAST_SONIC_ORDERS, MANUFACTURERS } from "@/lib/raas/mock-data";

const page = pageById("b2b_sonic_studio")!;

export default function B2bSonicStudioPage() {
  const { allowed, denied } = usePageAccess("b2b_sonic_studio", { pageLabel: "B2B Sonic Studio" });
  const [service, setService] = useState(SONIC_SERVICES[0].name);

  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Dev", href: "/dev" },
        { label: "B2B Sonic Studio" },
      ]}
    >
      <PageHeader
        eyebrow="B2B Developer"
        title="B2B Sonic Studio"
        sub="Custom jingles, voiceovers, soundtracks, sonic logos — built from RAAS Cultural API stems."
        accent="#A855F7"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Active orders" value="3" accent="#fbbf24" />
        <StatCard label="Delivered this mo" value="2" accent="#22C55E" />
        <StatCard label="Avg turn-around" value="7 days" accent="#06B6D4" />
        <StatCard label="Total revenue YTD" value="$8,200" accent="#EC4899" />
      </div>

      <Card title="Service catalog" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SONIC_SERVICES.map((s) => (
            <div
              key={s.name}
              className={`rounded-lg border p-4 cursor-pointer transition-all ${
                service === s.name
                  ? "border-[#A855F7]/40 bg-[#A855F7]/[0.05]"
                  : "border-white/5 bg-white/[0.015] hover:bg-white/[0.03]"
              }`}
              onClick={() => setService(s.name)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{s.name}</h3>
                {service === s.name && <Pill color="#A855F7">Selected</Pill>}
              </div>
              <div className="font-mono-raas text-xl font-bold text-[#fbbf24]">${s.price}</div>
              <div className="text-xs opacity-60 mt-1">{s.desc}</div>
              <div className="text-[10px] opacity-50 mt-2 font-mono-raas">~{s.days} day delivery</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Order form */}
      <Card title="Order form" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider opacity-50">Service</label>
            <input
              value={service}
              readOnly
              className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-mono-raas outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider opacity-50">Company / client</label>
            <input
              placeholder="Tourism Jamaica"
              className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#A855F7]/50"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[10px] uppercase tracking-wider opacity-50">Brief</label>
            <textarea
              rows={3}
              placeholder="10–30s brand sonic. Opening hook + tagline. Should feel like sunrise over Kingston harbor."
              className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#A855F7]/50"
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-3 w-full sm:w-auto rounded-md bg-[#A855F7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9333ea]"
        >
          Submit brief · ${SONIC_SERVICES.find((s) => s.name === service)?.price} via RASSPay →
        </button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Past orders */}
        <Card title="Past orders">
          <div className="space-y-2">
            {PAST_SONIC_ORDERS.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-raas text-xs opacity-70">{o.id}</span>
                    <span className="text-sm font-medium">{o.service}</span>
                  </div>
                  <div className="text-xs opacity-60 truncate">{o.client}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono-raas text-sm font-semibold text-[#fbbf24]">${o.amount.toLocaleString()}</div>
                  <Pill color={o.status === "delivered" ? "#22C55E" : "#fbbf24"} className="mt-1">
                    <StatusDot color={o.status === "delivered" ? "#22C55E" : "#fbbf24"} />
                    {o.status}
                  </Pill>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Manufacturing partners */}
        <Card
          title="Manufacturing partners"
          action={
            <Link href="/admin/manufacturing-partners" className="text-[11px] text-[#06B6D4] hover:underline underline-offset-4">
              Admin view →
            </Link>
          }
        >
          <div className="space-y-2">
            {MANUFACTURERS.filter((m) => m.status === "Active").map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <div>
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-xs opacity-60">{m.specialty}</div>
                </div>
                <Pill color="#22C55E">{m.status}</Pill>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
