"use client";

import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, StatCard, Pill, StatusDot } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById } from "@/lib/raas/wireframe";
import { PORTFOLIO_POOL, EXPIRED_DOMAINS } from "@/lib/raas/mock-data";

const page = pageById("investor_portfolio")!;

export default function InvestorPortfolioPage() {
  const { allowed, denied } = usePageAccess("investor_portfolio", {
    pageLabel: "Investor Portfolio — Artist Pool View",
  });
  if (!allowed) return denied;

  const totalY1 = PORTFOLIO_POOL.reduce((s, a) => s + a.y1Revenue, 0);
  const avgY1 = totalY1 / PORTFOLIO_POOL.length;

  return (
    <PageShell
      page={page}
      breadcrumbs={[
        { label: "Hub", href: "/" },
        { label: "Investor", href: "/investor" },
        { label: "Portfolio" },
      ]}
    >
      <PageHeader
        eyebrow="Investor · Behind login"
        title="Investor Portfolio — Artist Pool View"
        sub="23 artist sites with brand extensions and Y1 revenue. Plus domain portfolio leverage and 3 expired-domain cautionary tales."
        accent="#EF4444"
      />

      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Live artist sites" value={PORTFOLIO_POOL.length} accent="#22C55E" />
        <StatCard label="Combined Y1 revenue" value={`$${(totalY1 / 1000).toFixed(0)}K`} accent="#fbbf24" />
        <StatCard label="Avg per artist" value={`$${(avgY1 / 1000).toFixed(1)}K`} accent="#06B6D4" />
        <StatCard label="Brand extensions live" value={PORTFOLIO_POOL.filter((a) => a.brandExtension).length} accent="#EC4899" />
      </div>

      {/* Artist pool table */}
      <Card title="Artist pool — Y1 revenue" className="mb-6">
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#0a0a0f]">
              <tr className="text-left text-[10px] uppercase tracking-wider opacity-50 border-b border-white/5">
                <th className="py-2 pr-3 font-medium">Artist</th>
                <th className="py-2 pr-3 font-medium">Domain</th>
                <th className="py-2 pr-3 font-medium">Brand ext.</th>
                <th className="py-2 pr-3 font-medium">Y1 revenue</th>
                <th className="py-2 pr-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {PORTFOLIO_POOL.sort((a, b) => b.y1Revenue - a.y1Revenue).map((a) => (
                <tr key={a.slug} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 font-medium">{a.name}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-xs opacity-70">{a.domain}</td>
                  <td className="py-2.5 pr-3 text-xs opacity-70">{a.brandExtension}</td>
                  <td className="py-2.5 pr-3 font-mono-raas text-[#fbbf24]">
                    ${a.y1Revenue.toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-3">
                    <Pill color="#22C55E">
                      <StatusDot color="#22C55E" /> {a.status}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Domain portfolio */}
      <Card title="Domain portfolio (leverage)" className="mb-6">
        <p className="text-xs opacity-60 mb-3">
          RAAS holds {PORTFOLIO_POOL.length} active .ja domains plus 4 leverage domains not yet assigned to artists.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {["kingston.ja", "montego.ja", "yaad.ja", "roots.ja"].map((d) => (
            <div
              key={d}
              className="rounded-md border border-white/5 bg-white/[0.015] p-3 text-center"
            >
              <div className="font-mono-raas text-sm text-[#06B6D4]">{d}</div>
              <Pill color="#fbbf24" className="mt-1">Leverage · held</Pill>
            </div>
          ))}
        </div>
      </Card>

      {/* Expired domains cautionary */}
      <Card
        title="Expired domains — cautionary tale"
        action={<Pill color="#EF4444">{EXPIRED_DOMAINS.length} expired</Pill>}
      >
        <p className="text-xs opacity-60 mb-3">
          These are territories that were abandoned. Each represents a leak in the pool — and a lesson in artist support.
        </p>
        <div className="space-y-2">
          {EXPIRED_DOMAINS.map((d) => (
            <div
              key={d.domain}
              className="flex items-center justify-between gap-3 rounded-md border border-[#EF4444]/15 bg-[#EF4444]/[0.04] p-3"
            >
              <div className="min-w-0">
                <div className="font-mono-raas text-sm text-[#EF4444]">{d.domain}</div>
                <div className="text-xs opacity-70 mt-0.5">{d.reason}</div>
              </div>
              <div className="text-[11px] opacity-60 font-mono-raas whitespace-nowrap">
                expired {d.expired}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
