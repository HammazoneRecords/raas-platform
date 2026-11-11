import { NextRequest, NextResponse } from "next/server";
import { getRoleFromHeaders } from "@/lib/raas/headers";

/**
 * GET /api/auth/me
 *
 * Returns the role that the server sees from the X-Maze-Role header. This
 * is a low-overhead "am I still authenticated?" check the client can call
 * without needing to send the full user object.
 *
 * For the full user object, the client reads localStorage — the server
 * doesn't need to know who you are, only what role you're acting as.
 */
export async function GET(req: NextRequest) {
  const role = getRoleFromHeaders(req.headers);
  return NextResponse.json({ role, source: "header" });
}
