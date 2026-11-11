"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "./role";
import { canView, type RoleId } from "./wireframe";
import { NoAccess } from "@/components/raas/Card";

// Pages that don't require login (the 4 public pages).
// Note: /login, /signup, and /maze are also accessible without login but
// they don't go through usePageAccess — they're meta-routes.
const PUBLIC_PAGE_IDS = new Set([
  "hub",
  "adtl_marketplace",
  "artist_territory_public",
  "territory_marketplace",
]);

function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3 opacity-60">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-white/10"
          style={{ borderTopColor: "#fbbf24" }}
        />
        <div className="text-xs">Loading…</div>
      </div>
    </div>
  );
}

function RedirectingScreen() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3 opacity-60">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-white/10"
          style={{ borderTopColor: "#fbbf24" }}
        />
        <div className="text-xs">Redirecting to sign in…</div>
      </div>
    </div>
  );
}

/**
 * usePageAccess — single entry point every page uses to gate itself.
 *
 * Existing callers don't need to change anything:
 *
 *   const { allowed, denied } = usePageAccess("artist_dashboard", {
 *     pageLabel: "Artist Dashboard",
 *   });
 *   if (!allowed) return denied;
 *
 * Behind the scenes this also handles:
 *   - loading state (before client hydration) → `denied` is a brief spinner
 *   - redirect to /login if not authenticated on a protected page → `denied`
 *     is a "Redirecting…" screen while the router pushes
 *   - logged-in but wrong role → `denied` is the normal <NoAccess> component
 */
export function usePageAccess(
  pageId: string,
  opts?: { also?: RoleId[]; pageLabel?: string }
) {
  const { role, user, hydrated } = useRole();
  const router = useRouter();

  const isPublicPage = PUBLIC_PAGE_IDS.has(pageId);

  // Derived (no setState): a protected page that has no logged-in user is
  // "needs redirect" once we've hydrated.
  const needsRedirect = hydrated && !isPublicPage && !user;

  // Trigger the redirect as a side-effect (not state).
  useEffect(() => {
    if (!needsRedirect) return;
    const next = window.location.pathname + window.location.search;
    router.replace(`/login?next=${encodeURIComponent(next)}`);
  }, [needsRedirect, router]);

  // Effective role is the user's role (or "public" if not logged in).
  const effectiveRole: RoleId = hydrated ? role : "public";

  // Permission check via Zanzibar-style tuples.
  const tupleAllows = canView(effectiveRole, pageId);
  const extraAllows = opts?.also?.includes(effectiveRole) ?? false;
  const tupleAllowed = tupleAllows || extraAllows;

  // Decide what `denied` should render if we're not allowed:
  let denied: React.ReactNode;
  if (!hydrated) {
    denied = <LoadingScreen />;
  } else if (needsRedirect) {
    denied = <RedirectingScreen />;
  } else {
    denied = (
      <div className="py-12">
        <NoAccess
          role={effectiveRole}
          page={opts?.pageLabel ?? pageId}
          required={opts?.also ?? (["admin"] as RoleId[])}
        />
      </div>
    );
  }

  // `allowed` is true only when:
  //   - we're past hydration,
  //   - AND the page is public OR the user is logged in with the right role.
  const allowed =
    hydrated && (isPublicPage ? tupleAllowed : user !== null && tupleAllowed);

  return {
    allowed,
    denied,
    role: effectiveRole,
    user,
    hydrated,
    needsRedirect,
  };
}

