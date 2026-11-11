"use client";

import Link from "next/link";
import { PageShell, PageHeader, LinkCard } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { ARCHIVE_STATS, ARCHIVE_CATALOG, INSTITUTIONS } from "@/lib/raas/mock-data";

const page = pageById("archivist_console")!;

const HERITAGE_ARCHIVIST_ROLE = {
  title: "Heritage Archivist",
  desc: "Curates, tags, and verifies reggae heritage entries. Has full edit rights on the archive catalog but cannot grant institutional access.",
  perms: ["view archive catalog", "edit entries", "tag by era", "verify authenticity", "submit licensing requests"],
};

export default function ArchivistConsolePage() {
  const { allowed, denied } = usePageAccess("archivist_console", { pageLabel: "Archivist Console" });
  if (!allowed) return denied;

  return (
    <PageShell
      page={page}
      breadcrumbs={[{ label: "Hub", href: "/" }, { label: "Archivist Console" }]}
    >
      <PageHeader
        eyebrow="Archivist"
        title="Archivist Console"
        sub={`${ARCHIVE_STATS.entries.toLocaleString()} archive entries across ${ARCHIVE_STATS.eras} eras. ${ARCHIVE_STATS.institutions} institutional partners.`}
        accent="#A855F7"
        right={<Pill color="#A855F7">Heritage</Pill>}
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Archive entries" value={ARCHIVE_STATS.entries.toLocaleString()} accent="#A855F7" />
        <StatCard label="Eras covered" value={ARCHIVE_STATS.eras} accent="#06B6D4" />
        <StatCard label="Institutions" value={ARCHIVE_STATS.institutions} accent="#22C55E" />
        <StatCard label="Pending ingest" value="42" sub="awaiting verification" accent="#fbbf24" />
      </div>

      {/* Archive catalog */}
      <Card title="Archive catalog" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">ID</th>
                <th className="py-2 pr-3 font-medium">Era</th>
                <th className="py-2 pr-3 font-medium">Title</th>
                <th className="py-2 pr-3 font-medium">Type</th>
                <th className="py-2 pr-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ARCHIVE_CATALOG.map((c) => (
                <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-mono-raas text-xs opacity-70">{c.id}</td>
                  <td className="py-2.5 pr-3 text-xs">{c.era}</td>
                  <td className="py-2.5 pr-3 font-medium">{c.title}</td>
                  <td className="py-2.5 pr-3">
                    <Pill color="#06B6D4">{c.type}</Pill>
                  </td>
                  <td className="py-2.5 pr-3">
                    <Pill color="#22C55E">
                      <StatusDot color="#22C55E" /> Verified
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Institutions */}
      <Card
        title="Institutional partners"
        action={
          <Link href="/archivist/institution" className="text-[11px] text-[#A855F7] hover:underline underline-offset-4">
            Manage access →
          </Link>
        }
        className="mb-6"
      >
        <div className="space-y-2">
          {INSTITUTIONS.map((inst) => (
            <div
              key={inst.name}
              className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3"
            >
              <div>
                <div className="text-sm font-medium">{inst.name}</div>
                <div className="text-xs opacity-60">{inst.plan} plan</div>
              </div>
              <Pill color={inst.status === "Active" ? "#22C55E" : "#fbbf24"}>
                <StatusDot color={inst.status === "Active" ? "#22C55E" : "#fbbf24"} pulse={inst.status !== "Active"} />
                {inst.status}
              </Pill>
            </div>
          ))}
        </div>
      </Card>

      {/* Heritage Archivist role */}
      <Card title="Heritage Archivist role" accent="#A855F7">
        <p className="text-sm opacity-80 mb-3">{HERITAGE_ARCHIVIST_ROLE.desc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {HERITAGE_ARCHIVIST_ROLE.perms.map((p) => (
            <div key={p} className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6">
        <LinkCard
          href="/archivist/institution"
          title="Reggae Archive SaaS — Institution Portal →"
          desc="Academic / Cultural / Enterprise plans for institutions"
          accent="#A855F7"
        />
      </div>
    </PageShell>
  );
}
