"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopNav } from "@/components/raas/TopNav";
import { Footer } from "@/components/raas/PageShell";
import { Card, Pill } from "@/components/raas/Card";
import { useRole } from "@/lib/raas/role";
import { ROLES, ROLE_ORDER, type RoleId } from "@/lib/raas/wireframe";
import { raasFetch } from "@/lib/raas/fetch";

export default function SignupPage() {
  const router = useRouter();
  const { setSession, user, hydrated } = useRole();

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleId>("fan");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect home.
  useEffect(() => {
    if (hydrated && user) {
      router.replace("/");
    }
  }, [hydrated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await raasFetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, displayName, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed.");
        return;
      }
      setSession(data.user);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form */}
          <div>
            <div className="mb-6">
              <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#22C55E]">
                Sign up
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
              <p className="mt-1.5 text-sm opacity-60">
                Pick a portal to sign up for. You can change roles later by signing in as a different account.
              </p>
            </div>

            <Card>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider opacity-50">
                    Display name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Yardie Fan"
                    required
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#22C55E]/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider opacity-50">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#22C55E]/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider opacity-50">
                    Password (min 6 chars)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#22C55E]/50"
                  />
                </div>
                {error && (
                  <div className="rounded-md border border-[#EF4444]/30 bg-[#EF4444]/[0.06] p-3 text-xs text-[#EF4444]">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-[#22C55E] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#16a34a] disabled:opacity-50"
                >
                  {loading ? "Creating…" : "Create account →"}
                </button>
              </form>
              <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs opacity-60">
                Already have an account?{" "}
                <Link href="/login" className="text-[#fbbf24] hover:underline underline-offset-4">
                  Sign in →
                </Link>
              </div>
            </Card>
          </div>

          {/* Role picker */}
          <div>
            <div className="mb-6">
              <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#06B6D4]">
                Pick a portal
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Which role are you signing up as?</h2>
              <p className="mt-1.5 text-sm opacity-60">
                For the demo, you can pick any of the 7 portals. In production this would default to <em>public</em> with admin-only promotion for higher roles.
              </p>
            </div>
            <Card>
              <div className="space-y-2">
                {ROLE_ORDER.map((r) => {
                  const meta = ROLES[r];
                  const active = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`group flex w-full items-center gap-3 rounded-md border p-3 text-left transition-all ${
                        active
                          ? "border-[#fbbf24]/40 bg-[#fbbf24]/[0.06]"
                          : "border-white/5 bg-white/[0.015] hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shrink-0"
                        style={{
                          background: `${meta.color}1a`,
                          color: meta.color,
                          border: `1px solid ${meta.color}33`,
                        }}
                      >
                        {meta.glyph}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium" style={{ color: meta.color }}>
                          {meta.label}
                        </div>
                        <div className="text-[11px] opacity-60">
                          {r === "public" && "Browse the marketplace and artist territories."}
                          {r === "artist" && "Own a territory, sell merch, monetize your Cultural API."}
                          {r === "fan" && "Support artists, generate AI voice songs."}
                          {r === "b2b_dev" && "Build with the Cultural API, B2B Sonic Studio, RAAS Records."}
                          {r === "investor" && "Pool model, KPI tranches, cap table, portfolio."}
                          {r === "admin" && "System health, AI agents, compliance, audit log."}
                          {r === "archivist" && "Heritage archive, institution access, licensing."}
                        </div>
                      </div>
                      {active && <Pill color="#fbbf24">Selected</Pill>}
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
