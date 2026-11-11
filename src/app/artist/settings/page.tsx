"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, Pill } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { ARTISTS } from "@/lib/raas/mock-data";

const page = pageById("artist_settings")!;

export default function ArtistSettingsPage() {
  const { allowed, denied } = usePageAccess("artist_settings", { pageLabel: "Artist Settings" });
  if (!allowed) return denied;

  const artist = ARTISTS[0];

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Artist", href: "/artist" },
        { label: "Settings" },
      ]}
    >
      <PageHeader
        eyebrow="Artist"
        title="Settings"
        sub="Profile, audience connections, payment methods, notifications."
        accent="#22C55E"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <Card title="Profile">
          <div className="space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider opacity-50">Artist name</label>
              <input
                defaultValue={artist.name}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#22C55E]/50"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider opacity-50">Domain</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  defaultValue={artist.domain}
                  className="flex-1 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-mono-raas outline-none focus:border-[#22C55E]/50"
                />
                <Pill color="#22C55E">Verified</Pill>
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider opacity-50">Brand extension</label>
              <input
                defaultValue={artist.brandExtension}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#22C55E]/50"
              />
            </div>
          </div>
        </Card>

        {/* Audience connections */}
        <Card
          title="Audience connections"
          action={<Pill color="#fbbf24">Tier gating</Pill>}
        >
          <p className="text-xs opacity-60 mb-3">
            We use <strong className="text-foreground">YouTube and Spotify</strong> only — not IG/TikTok — for tier gating. They give us subscriber counts that are stable and verifiable.
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <div className="flex items-center gap-3">
                <span className="font-mono-raas text-xs">YouTube</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-60">184K subs</span>
                <Pill color="#22C55E">Connected</Pill>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <div className="flex items-center gap-3">
                <span className="font-mono-raas text-xs">Spotify</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-60">92K monthly</span>
                <Pill color="#22C55E">Connected</Pill>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3 opacity-50">
              <div className="flex items-center gap-3">
                <span className="font-mono-raas text-xs">Instagram</span>
              </div>
              <Pill color="#94A3B8">Not used for gating</Pill>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3 opacity-50">
              <div className="flex items-center gap-3">
                <span className="font-mono-raas text-xs">TikTok</span>
              </div>
              <Pill color="#94A3B8">Not used for gating</Pill>
            </div>
          </div>
        </Card>

        {/* Payment methods */}
        <Card title="Payment methods">
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <div>
                <div className="text-sm font-medium">RASSPay (default)</div>
                <div className="text-[11px] opacity-60">PayPal underlying · escrow mode</div>
              </div>
              <Pill color="#22C55E">Active</Pill>
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <div>
                <div className="text-sm font-medium">PayPal direct</div>
                <div className="text-[11px] opacity-60">For direct-send withdrawals only</div>
              </div>
              <Pill color="#06B6D4">Linked</Pill>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card title="Notification preferences">
          <div className="space-y-2 text-xs">
            {[
              { label: "New fan subscribes", on: true },
              { label: "Merch sale", on: true },
              { label: "Cultural API sale", on: true },
              { label: "AI Voice generation", on: false },
              { label: "RASSPay escrow release", on: true },
              { label: "60-day claim dispute", on: true },
              { label: "Weekly revenue digest", on: true },
              { label: "Platform announcements", on: false },
            ].map((n) => (
              <div
                key={n.label}
                className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <span>{n.label}</span>
                <span
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    n.on ? "bg-[#22C55E]" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      n.on ? "left-[18px]" : "left-0.5"
                    }`}
                  />
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Price change policy */}
      <Card title="Price change policy" className="mt-6" accent="#fbbf24">
        <p className="text-xs opacity-70">
          If you change your subscription prices, existing subscribers keep their current rate for{" "}
          <strong className="text-foreground">6 months</strong>. New subscribers pay the new rate immediately.
          This protects the fans who backed you first.
        </p>
      </Card>

      <div className="mt-6 text-center text-xs opacity-50">
        Need help? <Link href="/" className="text-[#fbbf24] hover:underline underline-offset-4">Contact RAAS support</Link>
      </div>
    </PageShell>
  );
}
