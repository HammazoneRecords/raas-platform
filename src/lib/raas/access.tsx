"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "./role";
import { canView, type RoleId } from "./wireframe";
import { NoAccess } from "@/components/raas/Card";

// Pages that don't require login (the 4 public pages + login/signup/maze).
const PUBLIC_PAGE_IDS = new Set([
  "hub",
  "adtl_marketplace",
  "artist_territory_public",
  "territory_marketplace",
]);

/**
 * usePageAccess — the single entry point every page uses to gate itself.
 *
 * Returns:
 *   - `loading` true while we wait for client hydration (render nothing
 *     jumpy during this window).
 *   - `redirecting` true if the user isn't logged in and is on a protected
 *     page — caller should render null while we push them to /login.
 *   - `allowed` true if the user IS logged in AND their role can view the
 *     page. Otherwise `denied` holds a ready-to-render `<NoAccess>`.
 *
 * Usage:
 *
 *   const { allowed, denied, loading, redirecting } = usePageAccess("artist_dashboard", {
 *     pageLabel: "Artist Dashboard",
 *   });
 *   if (loading || redirecting) return null;
 *   if (!allowed) return denied;
 *
 * The page's `id` is the wireframe page id (e.g. "artist_dashboard").
 * If `id` is in PUBLIC_PAGE_IDS, login is NOT required.
 */
export function usePageAccess(
  pageId: string,
  opts?: { also?: RoleId[]; pageLabel?: string }
) {
  const { role, user, hydrated } = useRole();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const isPublicPage = PUBLIC_PAGE_IDS.has(pageId);

  // After hydration: if this is a protected page and the user isn't logged
  // in, redirect to /login?next=<current path>.
  useEffect(() => {
    if (!hydrated) return;
    if (isPublicPage) return;
    if (!user) {
      const next = window.location.pathname + window.location.search;
      setRedirecting(true);
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [hydrated, isPublicPage, user, router]);

  // Loading state — true until we've read localStorage.
  const loading = !hydrated;

  // Effective role is the user's role (or "public" if not logged in).
  const effectiveRole: RoleId = hydrated ? role : "public";

  // Permission check via Zanzibar-style tuples.
  const tupleAllows = canView(effectiveRole, pageId);
  const extraAllows = opts?.also?.includes(effectiveRole) ?? false;
  const allowed = tupleAllows || extraAllows;

  const denied = (
    <div className="py-12">
      <NoAccess
        role={effectiveRole}
        page={opts?.pageLabel ?? pageId}
        required={opts?.also ?? (["admin"] as RoleId[])}
      />
    </div>
  );

  return {
    allowed,
    denied,
    role: effectiveRole,
    user,
    hydrated,
    loading,
    redirecting,
  };
}
