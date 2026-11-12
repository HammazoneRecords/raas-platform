import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/raas/auth";

/**
 * POST /api/auth/password
 * Body: { email, current, next }
 * Verifies the current password, then re-hashes with a fresh salt.
 * NO COOKIES — nothing session-like is issued here.
 */
export async function POST(req: NextRequest) {
  let body: { email?: string; current?: string; next?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const { current, next } = body;

  if (!email || !current || !next) {
    return NextResponse.json(
      { error: "Email, current and new password are required." },
      { status: 400 }
    );
  }
  if (next.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(current, user.passwordHash)) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  await db.user.update({
    where: { id: user.id },
    data: { passwordHash: hashPassword(next) },
  });

  return NextResponse.json({ ok: true });
}
