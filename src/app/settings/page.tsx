"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageShell, PageHeader } from "@/components/raas/PageShell";
import { Card, Pill } from "@/components/raas/Card";
import { usePageAccess } from "@/lib/raas/access";
import { pageById, ROLES, type RoleId } from "@/lib/raas/wireframe";
import { useRole } from "@/lib/raas/role";

const page = pageById("account_settings")!;

const NOTIFICATION_DEFAULTS: Record<string, boolean> = {
  "Platform announcements": true,
  "Weekly digest": true,
  "Security alerts": true,
  "Product updates": false,
};

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-[#fbbf24]" : "bg-white/10"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-0.5"}`}
      />
    </button>
  );
}

export default function AccountSettingsPage() {
  const { allowed, denied } = usePageAccess("account_settings", { pageLabel: "Account Settings" });
  const { role, user, clearSession } = useRole();
  const router = useRouter();

  const [prefs, setPrefs] = useState<Record<string, boolean>>(NOTIFICATION_DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("raas-settings");
      if (raw) setPrefs({ ...NOTIFICATION_DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* keep defaults */
    }
  }, []);

  if (!allowed) return denied;

  const accent = ROLES[(role ?? "public") as RoleId].color;

  const savePrefs = (nextPrefs: Record<string, boolean>) => {
    setPrefs(nextPrefs);
    localStorage.setItem("raas-settings", JSON.stringify(nextPrefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  const changePassword = async () => {
    setPwMsg("");
    setPwErr("");
    if (!current || !next) {
      setPwErr("Fill in both fields.");
      return;
    }
    if (next.length < 8) {
      setPwErr("New password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Maze-Role": String(role) },
        body: JSON.stringify({ email: user?.email, current, next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPwErr(data.error || "Could not change password.");
      } else {
        setPwMsg("Password updated.");
        setCurrent("");
        setNext("");
      }
    } catch {
      setPwErr("Network error — try again.");
    } finally {
      setBusy(false);
    }
  };

  const signOut = () => {
    clearSession();
    router.replace("/");
  };

  return (
    <PageShell
      page={page}
      breadcrumbs={[{ label: "Hub", href: "/" }, { label: "Account Settings" }]}
    >
      <PageHeader
        eyebrow="Account"
        title="Settings"
        sub="Profile, password, notifications and session — shared surface for every logged-in role."
        accent={accent}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Profile">
          <div className="space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider opacity-50">Display name</label>
              <input
                defaultValue={user?.displayName ?? ""}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none"
                style={{ borderColor: `${accent}44` }}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider opacity-50">Email</label>
              <input
                defaultValue={user?.email ?? ""}
                readOnly
                className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-mono-raas opacity-70"
              />
            </div>
            <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3">
              <span className="text-xs opacity-70">Role in the Maze</span>
              <Pill color={accent}>{ROLES[(role ?? "public") as RoleId].label}</Pill>
            </div>
          </div>
        </Card>

        <Card title="Change password">
          <div className="space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider opacity-50">Current password</label>
              <input
                type="password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none"
                style={{ borderColor: `${accent}44` }}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider opacity-50">New password</label>
              <input
                type="password"
                value={next}
                onChange={(e) => setNext(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none"
                style={{ borderColor: `${accent}44` }}
              />
            </div>
            {pwErr && <p className="text-xs text-red-400">{pwErr}</p>}
            {pwMsg && <p className="text-xs text-emerald-400">{pwMsg}</p>}
            <button
              type="button"
              onClick={changePassword}
              disabled={busy}
              className="rounded-md px-4 py-2 text-xs font-semibold text-black disabled:opacity-50"
              style={{ background: "#fbbf24" }}
            >
              {busy ? "Updating…" : "Update password"}
            </button>
            <p className="text-[11px] opacity-50">
              No cookies — your session lives in this browser only and travels per-request as the
              X-Maze-Role header.
            </p>
          </div>
        </Card>

        <Card
          title="Notification preferences"
          action={saved ? <Pill color="#22C55E">Saved</Pill> : undefined}
        >
          <div className="space-y-2">
            {Object.entries(prefs).map(([label, on]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.015] p-3"
              >
                <span className="text-xs">{label}</span>
                <Toggle on={on} onToggle={() => savePrefs({ ...prefs, [label]: !on })} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Session">
          <div className="space-y-3">
            <p className="text-xs opacity-70">
              Signed in as <strong className="text-foreground">{user?.displayName}</strong> ({user?.email}).
              Sessions live in localStorage only — no cookies, no server session state.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={signOut}
                className="rounded-md border border-red-400/40 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-400/10"
              >
                Sign out
              </button>
              <Link
                href="/maze"
                className="rounded-md border border-white/15 px-4 py-2 text-xs font-semibold hover:bg-white/5"
              >
                View the Maze
              </Link>
            </div>
            <p className="text-[11px] opacity-50">
              Artist-specific settings (domain, tier gating, payouts) live in{" "}
              <Link href="/artist/settings" className="text-[#fbbf24] hover:underline underline-offset-4">
                Artist Settings
              </Link>
              .
            </p>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
