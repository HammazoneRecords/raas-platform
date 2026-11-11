---
name: raas-auth
description: RAAS Portal authentication — credentials, architecture, and migration plan. Use this whenever you need to log in as any RAAS role, modify the auth flow, or migrate to Supabase / self-hosted auth.
---

# RAAS Portal — Auth Skill

> Single source of truth for RAAS Portal authentication. Load this skill
> whenever you need to: (1) sign in to the portal as any of the 7 roles,
> (2) modify the login/signup flow, (3) seed or reset demo users, or
> (4) migrate auth to Supabase (external demos) or self-hosted (long-term).
>
> **Note**: This file is the in-repo copy of the `raas-auth` skill at
> `skills/raas-auth/SKILL.md`. The skills/ directory is gitignored (it's
> agent-private metadata), so this docs/ copy is what travels with the
> repo on GitHub.

---

## 1. Demo Credentials (7 users, one per role)

These accounts are **pre-seeded** into the SQLite database on first visit to
`/login`. They are idempotent — calling `POST /api/seed` repeatedly is safe.

| Role       | Email                 | Password          | Display name         | Artist slug        |
|------------|-----------------------|-------------------|----------------------|--------------------|
| Public     | `public@raas.ja`      | `onelove`         | Public Visitor       | —                  |
| Artist     | `artist@raas.ja`      | `rootsartist`     | Kabaka Pyramid       | `kabaka-pyramid`   |
| Fan        | `fan@raas.ja`         | `rootsrockers`    | Yardie Fan           | —                  |
| B2B Dev    | `dev@raas.ja`         | `riddimdev`       | Studio23 Dev         | —                  |
| Investor   | `investor@raas.ja`   | `rootscapital`    | Investor Pool        | —                  |
| Admin      | `admin@raas.ja`       | `rasadmin2026`    | RAAS Admin           | —                  |
| Archivist  | `archivist@raas.ja`   | `heritage2026`    | Heritage Archivist   | —                  |

**URLs:**
- Sign in: `/login` (supports `?next=/some/path` for redirect-after-login)
- Sign up: `/signup` (pick a role from the 7-button picker)
- Logout: button in the top-right user menu → "Sign out"

### Quick login via curl

```bash
# Returns SafeUser JSON; sets no cookies.
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@raas.ja","password":"rasadmin2026"}'
```

### Reset / re-seed

```bash
# Idempotent — creates missing users, skips existing ones.
curl -X POST http://localhost:3000/api/seed
```

To wipe and rebuild from scratch:
```bash
rm /home/z/my-project/db/custom.db
cd /home/z/my-project && bun run db:push
curl -X POST http://localhost:3000/api/seed
```

---

## 2. Architecture (Phase 1 — current)

### Stack

- **Database**: SQLite via Prisma (`prisma/schema.prisma`, `db/custom.db`)
- **Password hashing**: Node `crypto.scryptSync` (built-in, no deps), 16-byte salt, 64-byte key
- **Session storage**: `localStorage` ONLY (two keys: `raas-role`, `raas-user`)
- **Auth header**: `X-Maze-Role` (sent on every API call via `raasFetch()`)
- **Cookies**: NONE. Founder ruling — cookies are the main security risk and
  are forbidden on the entire platform.

### Prisma model

```prisma
enum Role {
  public
  artist
  fan
  b2b_dev
  investor
  admin
  archivist
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  displayName  String
  passwordHash String   // scrypt "salt:hash" hex format
  role         Role     @default(public)
  artistSlug   String?  // set when role=artist
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([role])
}
```

### File layout

```
src/lib/raas/
  auth.ts          # server-only: hashPassword, verifyPassword, signIn, signUp, seedDemoUsers
  headers.ts       # server-safe: getRoleFromHeaders (reads X-Maze-Role only)
  fetch.ts         # client: raasFetch() — attaches X-Maze-Role to every call
  role.tsx         # client: useRole() — useSyncExternalStore over localStorage
  access.tsx       # client: usePageAccess() — handles login-gate + permission check

src/app/api/auth/
  login/route.ts     # POST {email, password} → {user: SafeUser} | {error}
  signup/route.ts    # POST {email, displayName, password, role?} → {user} | {error}
  logout/route.ts    # POST → {ok: true} (client clears localStorage)
  me/route.ts        # GET → {role, source: "header"} (lightweight auth check)

src/app/api/seed/route.ts   # POST → {created, skipped, total} (idempotent)

src/app/login/page.tsx      # Login form + demo credential quick-pick
src/app/signup/page.tsx     # Signup form + 7-button role picker
```

### Security invariants (NEVER break these)

1. **No cookies.** Verified by `curl -D - http://localhost:3000/ | grep -i set-cookie` returning nothing.
2. **No `?role=` URL query.** The `/api/pages/[pageId]` route ignores URL query params for auth — it reads ONLY the `X-Maze-Role` header. `?role=admin` returns 403.
3. **Header is the only source of truth on the server.** The client may store the user object in localStorage for UI, but the server only trusts the header.
4. **`public` role is the default** when no header is present.
5. **Passwords are never logged, never sent to the client, never stored in plaintext.**

### Verification curls (run after any auth change)

```bash
# Login works
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@raas.ja","password":"rasadmin2026"}'
# → 200, {user: {...}}

# Wrong password is rejected
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@raas.ja","password":"wrong"}'
# → 401, {error: "Incorrect password."}

# No cookies set on login response
curl -sD - -o /dev/null -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@raas.ja","password":"rasadmin2026"}' | grep -i set-cookie
# → (nothing)

# ?role=admin URL query is BLOCKED
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/api/pages/admin_console?role=admin"
# → 403

# X-Maze-Role: admin header WORKS
curl -s -o /dev/null -w "%{http_code}\n" -H "X-Maze-Role: admin" "http://localhost:3000/api/pages/admin_console"
# → 200
```

---

## 3. Migration Plan

### Phase 1 — current (scrypt + SQLite + localStorage)
- Good for: local dev, single-server demos, founder-only access
- Limitation: no rate limiting, no email verification, no password reset,
  no account lockout, no 2FA, no audit trail of login events

### Phase 2 — Supabase (for external demos)
- **When**: before showing the portal to investors / external partners
- **Why**: Supabase handles email verification, password reset, magic links,
  rate limiting, and gives a polished auth UI out of the box. Lets us
  demo the platform to outsiders without exposing our hand-rolled auth.
- **Migration path**:
  1. Create Supabase project, add `SUPABASE_URL` + `SUPABASE_ANON_KEY` to `.env`
  2. Install `@supabase/supabase-js`
  3. Add `auth.users` table mirror — keep our `User` model for the role +
     artistSlug metadata, link via Supabase user id
  4. Replace `signIn`/`signUp` in `src/lib/raas/auth.ts` with Supabase calls
  5. Keep the `X-Maze-Role` header pattern (Supabase JWT in localStorage
     + our role header on top — still no cookies)
  6. Migrate the 7 demo users to Supabase Auth (same emails + passwords)
- **Rollback**: keep `src/lib/raas/auth.ts.scrypt.ts` as a backup; flip back
  via an env flag (`AUTH_PROVIDER=scrypt|supabase`)

### Phase 3 — self-hosted (long-term)
- **When**: once RAAS has its own auth service running on RAAS Cloud
- **Why**: founder wants everything hosted in-house eventually
- **Approach**: stand up a dedicated auth microservice (probably Go or
  Bun + Postgres) that issues JWTs. The X-Maze-Role header pattern stays
  the same — only the JWT issuer changes.

---

## 4. Adding a New Role or Permission

If a new role is added (e.g. "label_manager"):

1. Add to the `Role` enum in `prisma/schema.prisma`
2. Add to `RoleId` type + `ROLES` map + `ROLE_ORDER` in `src/lib/raas/wireframe.ts`
3. Add to `VALID_ROLES` array in `src/lib/raas/role.tsx`
4. Add to `VALID_ROLES` array in `src/lib/raas/headers.ts`
5. Add a demo user to `DEMO_USERS` in `src/lib/raas/auth.ts`
6. Add a corresponding row to the `buildPermissionTuples()` switch in `wireframe.ts`
7. Re-run `bun run db:push` then `curl -X POST http://localhost:3000/api/seed`

---

## 5. Common Operations

### "I forgot the admin password"
- It's `rasadmin2026`. See the table in §1.

### "I want to log in as a different role without signing out"
- Sign out from the user menu (top right), then sign in with a different
  demo account. There's no in-session role switching — that was the old
  flow and is intentionally removed.

### "I want to test the signup flow"
- Sign out, go to `/signup`, fill the form, pick any role from the picker.

### "The 7 demo users aren't loading"
- Visit `/login` — it auto-seeds on first load. Or `curl -X POST http://localhost:3000/api/seed`.

### "I changed the Prisma schema and now login is broken"
- Run `cd /home/z/my-project && bun run db:push --accept-data-loss` then re-seed.

---

## 6. GitHub Repository

- **Remote**: `git@github.com:HammazoneRecords/raas-maze.git`
- **Active branch for this work**: `feature/auth-flow-and-revenue-fixes`
- **PR URL**: https://github.com/HammazoneRecords/raas-maze/pull/new/feature/auth-flow-and-revenue-fixes

### To push updates after future edits

```bash
# At session start, restore the SSH shim + deploy key
bash /home/z/my-project/skills/mindwave-deploy/install.sh

# Add remote if missing
cd /home/z/my-project
git remote add origin git@github.com:HammazoneRecords/raas-maze.git 2>/dev/null

# Switch to the feature branch
git checkout feature/auth-flow-and-revenue-fixes

# Push
export PATH=/home/z/bin:$PATH
export GIT_SSH_COMMAND="/home/z/bin/ssh -o StrictHostKeyChecking=accept-new"
git push origin feature/auth-flow-and-revenue-fixes
```

### Branch context

The remote `main` branch contains the prior portal build-out from earlier
sessions (Phase A through B-2, security fixes, "Own your digital domain"
cleanup). The local repo for this session was re-initialized with no shared
history, so we pushed our work as `feature/auth-flow-and-revenue-fixes`
rather than force-pushing over `main`.

**To merge**: open a PR from `feature/auth-flow-and-revenue-fixes` into
`main` on GitHub, review the diff (mostly new files for the auth flow +
edits to TopNav, role.tsx, access.tsx, and the revenue-split pages), then
squash-merge.

---

## 7. What this skill does NOT cover

- Page-level permission tuples (see the wireframe in `src/lib/raas/wireframe.ts`)
- The Maze visualizer (`/maze`)
- Per-page content (see the `RAAS_PORTAL_BUILDER_PROMPT.md` in `upload/`)

If you need to modify what each role can see on a specific page, that's the
wireframe + permission tuples, not this skill.
