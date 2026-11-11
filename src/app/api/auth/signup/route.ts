import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/lib/raas/auth";
import type { RoleId } from "@/lib/raas/wireframe";

const VALID_ROLES: RoleId[] = [
  "public",
  "artist",
  "fan",
  "b2b_dev",
  "investor",
  "admin",
  "archivist",
];

/**
 * POST /api/auth/signup
 * Body: { email, displayName, password, role?, artistSlug? }
 * Returns: { user: SafeUser } on success, { error } on failure.
 *
 * For the demo, role can be set by the user so they can pick which portal
 * to sign up for. In production this would be locked to "public" by default
 * with admin-only promotion for higher roles.
 */
export async function POST(req: NextRequest) {
  let body: {
    email?: string;
    displayName?: string;
    password?: string;
    role?: string;
    artistSlug?: string | null;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const displayName = body.displayName?.trim();
  const password = body.password;
  const role = body.role as RoleId | undefined;

  if (!email || !displayName || !password) {
    return NextResponse.json(
      { error: "Email, name, and password are required." },
      { status: 400 }
    );
  }

  if (role && !VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  // If someone signs up as artist, they need an artistSlug — generate a
  // slug from their displayName if they didn't provide one.
  let artistSlug: string | null = body.artistSlug ?? null;
  if (role === "artist" && !artistSlug) {
    artistSlug = displayName!
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const result = await signUp({
    email,
    displayName: displayName!,
    password,
    role: role ?? "public",
    artistSlug,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ user: result.user });
}
