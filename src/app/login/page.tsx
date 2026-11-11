"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TopNav } from "@/components/raas/TopNav";
import { Footer } from "@/components/raas/PageShell";
import { Card, Pill, StatusDot } from "@/components/raas/Card";
import { useRole } from "@/lib/raas/role";
import { ROLES, type RoleId } from "@/lib/raas/wireframe";
import { raasFetch } from "@/lib/raas/fetch";

const DEMO_CREDENTIALS: Array<{ role: RoleId; email: string; password: string }> = [
  { role: "public",    email: "public@raas.ja",    password: "onelove" },
  { role: "artist",    email: "artist@raas.ja",    password: "rootsartist" },
  { role: "fan",       email: "fan@raas.ja",       password: "rootsrockers" },
  { role: "b2b_dev",   email: "dev@raas.ja",       password: "riddimdev" },
  { role: "investor",  email: "investor@raas.ja",  password: "rootscapital" },
  { role: "admin",     email: "admin@raas.ja",     password: "rasadmin2026" },
  { role: "archivist", email: "archivist@raas.ja", password: "heritage2026" },
];

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const { setSession, user, hydrated } = useRole();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [seedStatus, setSeedStatus] = useState<"idle" | "seeding" | "done">("idle");

  // If already logged in, redirect away from /login.
  useEffect(() => {
    if (hydrated && user) {
      const next = search.get("next");
      router.replace(next || "/");
    }
  }, [hydrated, user, router, search]);

  // Seed demo users on first load (best-effort).
  useEffect(() => {
    if (seedStatus !== "idle") return;
    setSeedStatus("seeding");
    fetch("/api/seed", { method: "POST" })
      .then(() => setSeedStatus("done"))
      .catch(() => setSeedStatus("done"));
  }, [seedStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await raasFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      setSession(data.user);
      const next = search.get("next");
      router.replace(next || "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demo: { email: string; password: string }) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form */}
          <div>
            <div className="mb-6">
              <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#fbbf24]">
                Sign in
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
              <p className="mt-1.5 text-sm opacity-60">
                Log in to access your RAAS portal. No cookies — your session lives in localStorage.
              </p>
            </div>

            <Card>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider opacity-50">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="artist@raas.ja"
                    required
                    autoComplete="email"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#fbbf24]/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider opacity-50">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#fbbf24]/50"
                  />
                </div>
                {error && (
                  <div className="rounded-md border border-[#EF4444]/30 bg-[#EF4444]/[0.06] p-3 text-xs text-[#EF4444]">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading || seedStatus === "seeding"}
                  className="w-full rounded-md bg-[#fbbf24] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#f59e0b] disabled:opacity-50"
                >
                  {loading ? "Signing in…" : seedStatus === "seeding" ? "Preparing…" : "Sign in →"}
                </button>
              </form>
              <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs opacity-60">
                No account?{" "}
                <Link href="/signup" className="text-[#fbbf24] hover:underline underline-offset-4">
                  Create one →
                </Link>
              </div>
            </Card>
          </div>

          {/* Demo credentials quick-pick */}
          <div>
            <div className="mb-6">
              <div className="mb-1 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#06B6D4]">
                <StatusDot color="#06B6D4" pulse /> Demo accounts
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Quick sign-in</h2>
              <p className="mt-1.5 text-sm opacity-60">
                Click any role to autofill the form, then hit <em>Sign in</em>.
              </p>
            </div>
            <Card>
              <div className="space-y-2">
                {DEMO_CREDENTIALS.map((d) => {
                  const meta = ROLES[d.role];
                  return (
                    <button
                      key={d.role}
                      type="button"
                      onClick={() => fillDemo(d)}
                      className="group flex w-full items-center gap-3 rounded-md border border-white/5 bg-white/[0.015] p-3 text-left transition-colors hover:bg-white/[0.04]"
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
                        <div className="text-[11px] opacity-60 font-mono-raas truncate">
                          {d.email} · {d.password}
                        </div>
                      </div>
                      <Pill color={meta.color} className="opacity-0 transition-opacity group-hover:opacity-100">
                        Use →
                      </Pill>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 text-[11px] opacity-60">
                These 7 accounts are pre-seeded. Pick the one matching the portal you want to test.
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
