import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/lib/raas/auth";

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { user: SafeUser } on success, { error } on failure.
 *
 * SECURITY: We never set a cookie. The client stores the returned user
 * object in localStorage and sends X-Maze-Role on subsequent requests.
 */
export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const result = await signIn(email, password);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  return NextResponse.json({ user: result.user });
}
