import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 *
 * On the server side there's nothing to clear (we never set cookies).
 * The client clears localStorage on receipt of a 200 response from this
 * route. We keep the endpoint for symmetry with login/signup.
 */
export async function POST() {
  return NextResponse.json({ ok: true });
}
