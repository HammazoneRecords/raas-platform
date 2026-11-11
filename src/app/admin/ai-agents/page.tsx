"use client";

import Link from "next/link";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { AI_AGENTS, PILOT_ARTISTS, HARDWARE_STATUS } from "@/lib/raas/mock-data";

const page = pageById("admin_ai_agents")!;

export default function AdminAiAgentsPage() {
  const { allowed, denied } = usePageAccess("admin_ai_agents", { pageLabel: "RAAS AI Agent Management" });
  if (!allowed) return denied;

  const trainingQueue = [
    { id: "JOB-0421", agent: "Patois LLM", dataset: "4,200 patois phrases", progress: 78, eta: "12h" },
    { id: "JOB-0420", agent: "Voice Cloner", dataset: "Pilot artist stems", progress: 34, eta: "2d" },
    { id: "JOB-0419", agent: "Riddim Generator", dataset: "Sleng Teng variations", progress: 92, eta: "1h" },
  ];

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Admin", href: "/admin" },
        { label: "AI Agents" },
      ]}
    >
      <PageHeader
        eyebrow="Admin"
        title="RAAS AI Agent Management"
        sub="Patois LLM, brand extension conceptor, ADTL deployer, fan engagement bot. 4× RTX 4090 cluster."
        accent="#0EA5E9"
        right={
          <Link
            href="/artist/ai-voice"
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium hover:bg-white/[0.06]"
          >
            Artist AI Voice →
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Active agents" value={AI_AGENTS.filter(a => a.status === "active").length} sub={`of ${AI_AGENTS.length}`} accent="#22C55E" />
        <StatCard label="GPU cluster" value="4×" sub="RTX 4090 · 96GB VRAM" accent="#A855F7" />
        <StatCard label="Avg utilization" value={`${Math.round(AI_AGENTS.reduce((s, a) => s + a.utilization, 0) / AI_AGENTS.length)}%`} accent="#fbbf24" />
        <StatCard label="Training queue" value={trainingQueue.length} accent="#06B6D4" />
      </div>

      {/* Hardware status banner */}
      <div
        className="mb-6 rounded-xl border p-4 flex items-center gap-3"
        style={{ borderColor: `${HARDWARE_STATUS.ready ? "#22C55E" : "#fbbf24"}33`, background: `${HARDWARE_STATUS.ready ? "#22C55E" : "#fbbf24"}0a` }}
      >
        <StatusDot color={HARDWARE_STATUS.ready ? "#22C55E" : "#fbbf24"} pulse />
        <div className="flex-1 text-xs">
          <strong>{HARDWARE_STATUS.name}:</strong> {HARDWARE_STATUS.spec} — {HARDWARE_STATUS.ready ? "live" : "pending delivery"}
        </div>
      </div>

      {/* Active AI agents */}
      <Card title="Active AI agents" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AI_AGENTS.map((a) => {
            const color = a.status === "active" ? "#22C55E" : a.status === "training" ? "#fbbf24" : "#94A3B8";
            return (
              <div
                key={a.name}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{a.name}</h3>
                  <Pill color={color}>
                    <StatusDot color={color} pulse={a.status === "training"} />
                    {a.status}
                  </Pill>
                </div>
                <div className="text-[11px] opacity-60 mb-2 font-mono-raas">{a.gpu}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="opacity-50">Utilization</span>
                  <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${a.utilization}%`, background: color }}
                    />
                  </div>
                  <span className="font-mono-raas" style={{ color }}>{a.utilization}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training jobs queue */}
        <Card title="Training jobs queue">
          <div className="space-y-3">
            {trainingQueue.map((j) => (
              <div
                key={j.id}
                className="rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-raas text-xs opacity-70">{j.id}</span>
                    <span className="text-sm font-medium">{j.agent}</span>
                  </div>
                  <span className="text-[11px] opacity-60 font-mono-raas">ETA {j.eta}</span>
                </div>
                <div className="text-[11px] opacity-60 mb-2">{j.dataset}</div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${j.progress}%`, background: "linear-gradient(90deg, #fbbf24, #22C55E)" }}
                    />
                  </div>
                  <span className="font-mono-raas text-[#fbbf24]">{j.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pilot artists */}
        <Card title="Pilot artists (10)">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-50 mb-2">5 upcoming</div>
              <div className="flex flex-wrap gap-1.5">
                {PILOT_ARTISTS.upcoming.map((a) => (
                  <span
                    key={a}
                    className="rounded-md border border-[#fbbf24]/20 bg-[#fbbf24]/[0.04] px-2 py-1 text-xs"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-50 mb-2">5 established</div>
              <div className="flex flex-wrap gap-1.5">
                {PILOT_ARTISTS.established.map((a) => (
                  <span
                    key={a}
                    className="rounded-md border border-[#22C55E]/20 bg-[#22C55E]/[0.04] px-2 py-1 text-xs"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 text-[11px] opacity-60">
            10 pilot artists total. 5 upcoming (smaller audiences, higher engagement) + 5 established (proven reach).
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
