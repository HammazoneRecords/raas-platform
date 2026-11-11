import { NextRequest, NextResponse } from "next/server";
import { getRoleFromHeaders } from "@/lib/raas/headers";
import { canView, pageById } from "@/lib/raas/wireframe";

/**
 * GET /api/pages/[pageId]
 *
 * Returns metadata for the requested page if the caller's role has viewer
 * permission. Otherwise returns 403.
 *
 * SECURITY MODEL:
 *   1. Role is read from the `X-Maze-Role` HTTP header ONLY.
 *   2. We NEVER read role from a URL query parameter (?role=) — that was a
 *      critical bypass that allowed anyone to visit ?role=admin. The
 *      `searchParams` object is intentionally ignored for auth purposes.
 *   3. We never read cookies. The platform does not set cookies anywhere.
 *
 * Verification curls:
 *   curl -H "X-Maze-Role: admin"   /api/pages/admin_console        → 200
 *   curl -H "X-Maze-Role: public"  /api/pages/admin_console        → 403
 *   curl "/api/pages/admin_console?role=admin"                     → 403 (query ignored)
 *   curl "/api/pages/admin_console"                                → 403 (no header = public)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ pageId: string }> }
) {
  const { pageId } = await params;

  // 1. Role from header ONLY. `?role=` in the URL is intentionally ignored.
  const role = getRoleFromHeaders(req.headers);

  // 2. Resolve page by id (or by route if the id matches a route).
  const page = pageById(pageId);
  if (!page) {
    return NextResponse.json(
      { error: "Page not found", pageId },
      { status: 404 }
    );
  }

  // 3. Permission check — Zanzibar-style: role has viewer relation on page?
  const canAccess = canView(role, page.id);

  // 4. Audit-friendly response. We deliberately echo the *effective* role
  //    (read from header) so the test harness can verify ?role= is ignored.
  if (!canAccess) {
    return NextResponse.json(
      {
        error: "Access denied",
        pageId,
        page: page.title,
        role,
        source: "header",
        note: "Role is read from X-Maze-Role header only. URL query (?role=) is ignored for auth.",
      },
      { status: 403 }
    );
  }

  return NextResponse.json(
    {
      pageId: page.id,
      title: page.title,
      portal: page.portal,
      zone: page.zone,
      depth: page.depth,
      route: page.route,
      blurb: page.blurb,
      navLinks: page.navLinks,
      navBar: page.navBar,
      role,
      source: "header",
    },
    { status: 200 }
  );
}
