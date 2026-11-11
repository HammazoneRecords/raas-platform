import { NextResponse } from "next/server";
import { seedDemoUsers } from "@/lib/raas/auth";

/**
 * POST /api/seed
 *
 * Seeds the 7 demo users (one per role) into the database. Idempotent —
 * calling it multiple times is safe. Existing users are skipped.
 *
 * Called automatically by the /login page on first load (the response is
 * best-effort: if seeding fails, login still works for any users that
 * already exist).
 */
export async function POST() {
  try {
    const result = await seedDemoUsers();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Seeding failed" },
      { status: 500 }
    );
  }
}
