"use client";

import { useRole } from "./role";
import { canView, type RoleId } from "./wireframe";
import { NoAccess } from "@/components/raas/Card";

/**
 * usePageAccess — returns whether the current role can view a page,
 * plus a ready-to-render `<NoAccess>` if not.
 *
 * Usage:
 *
 *   const { allowed, denied } = usePageAccess("artist_dashboard");
 *   if (!allowed) return denied;
 *
 * The optional `also` param adds extra allowed roles (for pages where
 * the permission tuples already cover the role but you want a quick
 * escape valve — e.g. artist pages can be viewed by admin via the tuples).
 */
export function usePageAccess(
  pageId: string,
  opts?: { also?: RoleId[]; pageLabel?: string }
) {
  const { role, hydrated } = useRole();

  // Before hydration, render as if "public" so SSR and the first client
  // paint match. After hydration, enforce the real role.
  const effectiveRole: RoleId = hydrated ? role : "public";

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

  return { allowed, denied, role: effectiveRole, hydrated };
}
