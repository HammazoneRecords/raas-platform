import "server-only";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";
import type { RoleId } from "./wireframe";

// ---------------------------------------------------------------------------
// RAAS AUTH LIBRARY
//
// Security model (per founder ruling):
//   - NO COOKIES. Cookies are the main security risk and are forbidden.
//   - Passwords are hashed with scrypt (Node built-in, no deps).
//   - On successful login, the server returns the user object (minus the
//     password hash). The CLIENT stores it in localStorage and sends the
//     X-Maze-Role header on every subsequent API call.
//   - The X-Maze-Role header is still the source of truth for server-side
//     authorization (see /api/pages/[pageId]/route.ts).
//   - The `?role=` URL query bypass is still blocked.
//
// This is demo-grade auth. For production we'd add: rate limiting, email
// verification, password reset flow, account lockout, 2FA for admin.
// ---------------------------------------------------------------------------

const SCRYPT_KEYLEN = 64;
const SCRYPT_SALTLEN = 16;

/** Hash a password using scrypt. Returns "salt:hash" (both hex). */
export function hashPassword(password: string): string {
  const salt = randomBytes(SCRYPT_SALTLEN).toString("hex");
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return `${salt}:${hash}`;
}

/** Verify a password against a "salt:hash" string. Constant-time. */
export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const candidate = scryptSync(password, salt, SCRYPT_KEYLEN);
    const candidateHex = candidate.toString("hex");
    const hashBuf = Buffer.from(hash, "hex");
    const candBuf = Buffer.from(candidateHex, "hex");
    if (hashBuf.length !== candBuf.length) return false;
    return timingSafeEqual(hashBuf, candBuf);
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Public user shape (safe to send to client — never includes passwordHash)
// ---------------------------------------------------------------------------

export interface SafeUser {
  id: string;
  email: string;
  displayName: string;
  role: RoleId;
  artistSlug: string | null;
  createdAt: string;
}

function toSafe(u: {
  id: string;
  email: string;
  displayName: string;
  role: string;
  artistSlug: string | null;
  createdAt: Date;
  passwordHash: string;
}): SafeUser {
  return {
    id: u.id,
    email: u.email,
    displayName: u.displayName,
    role: u.role as RoleId,
    artistSlug: u.artistSlug,
    createdAt: u.createdAt.toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Sign in / sign up
// ---------------------------------------------------------------------------

export async function signIn(
  email: string,
  password: string
): Promise<{ ok: true; user: SafeUser } | { ok: false; error: string }> {
  const user = await db.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) {
    return { ok: false, error: "No account found with that email." };
  }
  if (!verifyPassword(password, user.passwordHash)) {
    return { ok: false, error: "Incorrect password." };
  }
  return { ok: true, user: toSafe(user) };
}

export async function signUp(input: {
  email: string;
  displayName: string;
  password: string;
  role?: RoleId;
  artistSlug?: string | null;
}): Promise<{ ok: true; user: SafeUser } | { ok: false; error: string }> {
  const email = input.email.toLowerCase().trim();
  const displayName = input.displayName.trim();
  if (!email || !displayName || !input.password) {
    return { ok: false, error: "All fields are required." };
  }
  if (input.password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "An account with that email already exists." };
  }
  const role = input.role ?? "public";
  const passwordHash = hashPassword(input.password);
  const user = await db.user.create({
    data: {
      email,
      displayName,
      passwordHash,
      role,
      artistSlug: input.artistSlug ?? null,
    },
  });
  return { ok: true, user: toSafe(user) };
}

export async function findUserById(id: string): Promise<SafeUser | null> {
  const u = await db.user.findUnique({ where: { id } });
  return u ? toSafe(u) : null;
}

// ---------------------------------------------------------------------------
// Demo seed — 7 users, one per role. Idempotent.
// ---------------------------------------------------------------------------

export const DEMO_USERS: Array<{
  email: string;
  displayName: string;
  password: string;
  role: RoleId;
  artistSlug?: string;
}> = [
  { email: "public@raas.ja",    displayName: "Public Visitor",  password: "onelove",         role: "public" },
  { email: "artist@raas.ja",    displayName: "Kabaka Pyramid",  password: "rootsartist",     role: "artist", artistSlug: "kabaka-pyramid" },
  { email: "fan@raas.ja",       displayName: "Yardie Fan",      password: "rootsrockers",    role: "fan" },
  { email: "dev@raas.ja",       displayName: "Studio23 Dev",    password: "riddimdev",       role: "b2b_dev" },
  { email: "investor@raas.ja",  displayName: "Investor Pool",    password: "rootscapital",    role: "investor" },
  { email: "admin@raas.ja",     displayName: "RAAS Admin",       password: "rasadmin2026",    role: "admin" },
  { email: "archivist@raas.ja", displayName: "Heritage Archivist", password: "heritage2026",  role: "archivist" },
];

/**
 * Seed the 7 demo users (one per role) if they don't already exist.
 * Safe to call repeatedly — it's idempotent.
 * Returns a summary of what was created.
 */
export async function seedDemoUsers(): Promise<{
  created: number;
  skipped: number;
  total: number;
}> {
  let created = 0;
  let skipped = 0;
  for (const demo of DEMO_USERS) {
    const existing = await db.user.findUnique({ where: { email: demo.email } });
    if (existing) {
      skipped++;
      continue;
    }
    await db.user.create({
      data: {
        email: demo.email,
        displayName: demo.displayName,
        passwordHash: hashPassword(demo.password),
        role: demo.role,
        artistSlug: demo.artistSlug ?? null,
      },
    });
    created++;
  }
  return { created, skipped, total: DEMO_USERS.length };
}
