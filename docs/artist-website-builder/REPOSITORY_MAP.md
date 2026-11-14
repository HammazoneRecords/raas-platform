# RAAS Artist Website Builder — Repository Map

This document distinguishes verified current files from proposed files.

## Verified current integration points

| Current file | Verified responsibility / limitation |
|---|---|
| `package.json` | Next.js 16, React 19, Prisma 6; dnd-kit dependencies already available. |
| `prisma/schema.prisma` | SQLite datasource; `User` includes email, passwordHash, role and optional artistSlug. |
| `src/app/signup/page.tsx` | Client signup page; exposes role picker and submits role. |
| `src/app/api/auth/signup/route.ts` | Accepts role and optional artistSlug from request body. |
| `src/app/api/auth/login/route.ts` | Returns SafeUser after password verification; no server-verifiable session is issued. |
| `src/lib/raas/auth.ts` | scrypt password hashing, user lookup/create and demo seed users. |
| `src/lib/raas/role.tsx` | Stores user and role in localStorage. |
| `src/lib/raas/fetch.ts` | Sends localStorage-derived `X-Maze-Role` header. |
| `src/app/api/pages/[pageId]/route.ts` | Uses `X-Maze-Role` as authorization input. |
| `src/app/api/seed/route.ts` | Exposes demo seeding through POST. |
| `src/app/login/page.tsx` | Calls seed endpoint and displays demo credentials. |
| `src/app/artist/page.tsx` | Artist dashboard uses mock artist data. |
| `src/app/artist/settings/page.tsx` | Artist settings use mock artist data and non-persistent inputs. |
| `src/app/artist/[slug]/page.tsx` | Public territory uses mock-data lookup. |
| `src/lib/db.ts` | Prisma client singleton. |
| `next.config.ts` | TypeScript build errors are currently ignored. |

## Proposed integration map

| Capability | Reuse / change | New implementation |
|---|---|---|
| Account signup | Modify existing signup page and API; remove privilege selection | Email verification and secure session lifecycle |
| Artist workspace | Replace single artistSlug assumption with membership | Artist, ArtistMember, OnboardingProgress |
| Template selection | Reuse RAAS design system | Template registry, preview and version metadata |
| Website content | Replace mock-only settings | Typed page and section content |
| Media | No verified production upload system found in inspected files | Object storage adapter, upload intents and media library |
| Social/music links | Extend artist profile/content model | Validated SocialLink and release sections |
| Domain connection | Existing settings show a mock domain field only | DNS challenge, domain lifecycle and TLS provisioning |
| Publishing | Existing public territory is a mock-data page | Immutable snapshots, publish jobs and renderer |
| Hybrid hosting | Existing Next standalone output can support a deployment target, but does not itself provide tenant isolation | HostingAdapter with shared and isolated implementations |

## Proposed route ownership

- `/artist/onboarding/*`: authenticated artist owner/member only.
- `/artist/website/*`: authenticated artist workspace members with appropriate edit permission.
- `/api/artists/*`: server-side membership authorization.
- `/api/websites/*`: website-level permission checks and immutable publication operations.
- `/api/media/*`: signed upload/download authorization scoped to artist workspace.
- `/api/domains/*`: ownership verification and domain lifecycle controls.
- Public website renderer: host-based lookup of an active verified domain and published website version only.

## Change safety

The plan is intentionally documentation-only. It does not alter Prisma schema, application routes, authentication, production data or the default branch. Implementation should happen in separately reviewable pull requests, beginning with security and database foundations.
