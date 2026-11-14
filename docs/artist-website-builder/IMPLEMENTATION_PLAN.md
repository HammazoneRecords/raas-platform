# RAAS Artist Website Builder — Implementation Plan

**Status:** Architecture and repository plan; implementation has not started.  
**Target branch:** `feat/artist-website-builder-plan`  
**Baseline:** `main` at the time this plan was prepared.  
**Product decisions:** Hybrid hosting; existing domains plus optional new-domain registration; section editor first with drag-and-drop using the same content model.

## 1. Product outcome

Enable an artist to create an account, create or claim an artist profile, choose a website template, upload and organize media, add streaming/social/booking links, preview responsive pages, connect an existing domain or register a new one through a future registrar integration, and publish/manage the site without developer assistance.

The artist owns their content. RAAS operates the platform, rendering, domain routing and publishing infrastructure. Artists and authorized team members may edit only the artist workspaces to which they have been granted access.

## 2. Architecture decisions

### 2.1 Hybrid hosting

**Default:** shared multi-tenant website runtime. One RAAS renderer serves many artist websites. Incoming hostnames are normalized and resolved to an active `CustomDomain`, then to a `Website` and its published version. The renderer must never trust a client-supplied artist ID or slug as proof of ownership.

**Premium/enterprise option:** isolated deployment generated from the same versioned template and content model. Independent deployment is an operational tier, not a separate authoring product. It must consume immutable published artifacts and use the same domain ownership, media and audit controls.

Do not create a separate Git repository or manually maintained codebase per artist.

### 2.2 Domains

Support both:
1. Existing artist-owned domains: artist enters hostname, RAAS issues verification instructions, verifies control through a DNS TXT challenge, checks target records, provisions TLS, and activates routing.
2. New domain registration: provide a registrar adapter interface, but do not promise in-app registration until a registrar, pricing, availability, renewals, transfers, refunds and support workflow have been selected and integrated.

Allow a temporary RAAS subdomain during onboarding. Domain connection must not block template selection, content editing or preview.

A domain must be unique, normalized, verified before activation, and protected against takeover. Support apex and www policy/redirects explicitly. Never activate a domain solely because an artist typed it into a form.

### 2.3 Editor

Use one canonical structured content model:
- Section editor for the first usable release: add, remove, reorder, hide and configure approved sections.
- Drag-and-drop editor later: changes the order/layout of the same typed sections; it does not introduce arbitrary code or a second storage format.
- Templates define presentation and allowed section types. Artist content is stored separately from template code.
- Template changes preserve compatible content. Unsupported section types must be retained as drafts or flagged for mapping, not silently deleted.

### 2.4 Storage and data

The current Prisma datasource is SQLite. Before production multi-tenant websites, move to a managed PostgreSQL database with reviewed Prisma migrations. Use S3-compatible object storage for media; do not store uploaded binaries in the relational database or rely on an application container's local filesystem.

Use a queue/worker for image processing, domain checks, TLS provisioning, publication and isolated deployment jobs. Make these jobs idempotent and observable.

## 3. Verified repository baseline

The inspected code currently includes:
- `src/app/signup/page.tsx`: demo signup UI exposes a role picker and submits the role.
- `src/app/api/auth/signup/route.ts`: accepts caller-supplied roles and optional artist slug.
- `src/lib/raas/auth.ts`: password hashing and user creation; returns a user object, but does not issue a server-verifiable session.
- `src/lib/raas/role.tsx` and `src/lib/raas/fetch.ts`: client localStorage role state and `X-Maze-Role` request header.
- `src/app/api/pages/[pageId]/route.ts`: reads that client-controlled role header for authorization.
- `src/app/api/seed/route.ts`: publicly callable demo-account seeding endpoint; login page calls it automatically.
- `src/app/login/page.tsx`: displays demo credentials and triggers seeding.
- `src/app/artist/page.tsx`, `src/app/artist/settings/page.tsx`: artist-facing pages currently use mock artist data.
- `src/app/artist/[slug]/page.tsx`: public artist territory currently resolves from mock data.
- `prisma/schema.prisma`: SQLite datasource and a small `User` model with `role` and `artistSlug`.
- `next.config.ts`: `typescript.ignoreBuildErrors` is enabled.
- `package.json`: Next.js 16, Prisma 6, React 19, dnd-kit dependencies are already present.

The existing artist territory and account pages are useful UI/route starting points, not a working dynamic website builder. Do not assume media storage, domain provisioning, tenant isolation, or a production publishing service already exists.

## 4. Security and platform prerequisites (Phase 0)

These are release blockers, not optional cleanup.

1. **Remove client-selected privileges.** Public signup must create only the least-privileged public account. Artist onboarding may request an artist workspace, but cannot assign admin, archivist, investor or other privileged roles. Privileged promotion is an authenticated server-side administrative operation with audit logging.
2. **Separate authentication from role diagnostics.** `X-Maze-Role` is intentionally retained during development as a convenient diagnostic for probing authorization boundaries and detecting auth leakage. It is not an identity proof and must never become the production source of permissions. Introduce server-verifiable sessions/tokens and derive the real actor identity and permissions from verified credentials and database membership on every protected request. Implement the role header as an explicitly gated diagnostic override/simulation facility: enabled only in approved non-production environments, restricted to authorized testers, clearly logged with the real actor, requested simulated role, route and outcome, and rejected by default when configuration is absent or invalid. Add an unconditional production hard-deny (`NODE_ENV === "production"`) so a mis-set feature flag cannot activate it in production. Keep diagnostic role simulation distinct from authentication bypass: tests must still verify whether unauthenticated and low-privilege actors are denied. Preserve the user's no-cookie preference as an explicit architecture constraint to resolve: a short-lived bearer token in memory avoids persistent browser storage but affects reload UX; a persistent browser token is exposed to XSS; secure HttpOnly cookies provide stronger browser protection but change the stated preference. Document and approve the chosen threat model before implementation.
3. **Disable public demo seeding.** Remove the login page's automatic `/api/seed` call. Make demo seeding development-only or require a deployment-time secret and non-public execution path. Remove hard-coded demo credentials from production UI.
4. **Account protection.** Add email verification, rate limiting, password reset, abuse controls and stronger admin MFA before public launch. Enforce password policy and generic login error responses.
5. **Tenant authorization.** Every artist-owned query must scope by verified membership/workspace ID. Never accept a client-provided artist ID as authorization. Add negative tests for cross-tenant reads and writes.
6. **Media safety.** Validate MIME by inspecting bytes, allowlist formats, cap file size and dimensions, generate random object keys, scan where appropriate, strip metadata where appropriate, and issue short-lived upload/download URLs. Prevent SVG/script payload execution and unsafe remote URL ingestion.
7. **Domain safety.** Verify DNS ownership, protect against dangling DNS and domain reuse, prevent SSRF in DNS/HTTP checks, rate-limit verification, and require explicit detach/release workflows.
8. **Build quality.** Remove `typescript.ignoreBuildErrors` after existing type errors are fixed. Require lint, typecheck, unit, integration and production build checks.

## 5. Proposed data model

Introduce relational workspace ownership rather than overloading `User.artistSlug`.

- `Artist`: canonical artist identity, public slug, profile fields and status.
- `ArtistMember`: user-to-artist membership, role within the workspace, invitation status and permissions.
- `Website`: one or more website instances per artist, template selection, publication state, primary domain and hosting mode.
- `WebsiteTemplate`: stable template key, semantic version, compatibility metadata, supported section types and preview metadata.
- `WebsitePage`: route, title, SEO fields, draft/published state and ordering.
- `WebsiteSection` (or typed `WebsiteContent`): typed section data, schema version, visibility and sort order.
- `MediaAsset`: artist/workspace owner, object key, MIME, dimensions, size, alt text, processing status and attribution metadata.
- `SocialLink`: platform, URL, label, order and visibility.
- `CustomDomain`: normalized hostname, verification challenge/state, DNS/TLS state, primary flag and timestamps.
- `WebsiteVersion`: immutable published snapshot, template version, content checksum and publication metadata.
- `OnboardingProgress`: resumable step state and completion timestamps.
- `AuditEvent`: actor, workspace, action, target, timestamp and safe metadata.
- `DomainRegistration` (later): registrar, external order ID, lifecycle and renewal state.

Use foreign keys, unique constraints and indexes for normalized domain, public slug, artist membership and website route. Use soft deletion/retention policies where needed. Model template and content schema versions so old published sites remain renderable during template upgrades.

## 6. Proposed repository changes

The paths below are proposed implementation targets. They are not claimed to exist yet.

### 6.1 Existing files to modify

| Existing path | Change |
|---|---|
| `prisma/schema.prisma` | Move datasource to PostgreSQL; add workspace, website, template, content, media, domain, version, onboarding and audit models; retain a migration path for current users. |
| `src/app/signup/page.tsx` | Replace seven-role picker with artist/public account intent; remove role selection; route artists into resumable onboarding. |
| `src/app/api/auth/signup/route.ts` | Ignore/reject privilege fields; create least-privileged account; validate input; issue approved session after verified account creation. |
| `src/app/api/auth/login/route.ts` | Issue server-verifiable session/token; use generic errors and rate limits. |
| `src/lib/raas/auth.ts` | Separate authentication from authorization; add session lifecycle and verified identity lookup. |
| `src/lib/raas/role.tsx` | Remove role as a client authority; retain only safe display/session state. |
| `src/lib/raas/fetch.ts` | Send verified bearer/session credential; keep `X-Maze-Role` available only through the gated non-production diagnostic mode, never as normal authorization input. |
| `src/lib/raas/headers.ts` and protected API routes | Use shared server-side auth and policy helpers; accept `X-Maze-Role` only through the gated diagnostic adapter in non-production, never as the real actor's authority. |
| `src/app/api/seed/route.ts` | Remove public production seeding path or guard it as development-only. |
| `src/app/login/page.tsx` | Remove public demo credential display and automatic seeding. |
| `src/app/artist/page.tsx` | Load current artist workspace from authenticated membership, replacing `ARTISTS[0]`. |
| `src/app/artist/settings/page.tsx` | Persist actual profile and website settings; remove mock domain status. |
| `src/app/artist/[slug]/page.tsx` | Resolve published website data through the website renderer, not mock data. |
| `src/lib/db.ts` | Configure production-safe Prisma lifecycle/logging and PostgreSQL deployment. |
| `next.config.ts` | Remove ignored TypeScript build errors once baseline is clean. |
| `package.json` | Add explicit typecheck/test/migration/worker scripts and only the dependencies selected for storage, validation, queue and domain provider. |

### 6.2 New application routes

```text
src/app/artist/onboarding/
  page.tsx
  profile/page.tsx
  templates/page.tsx
  content/page.tsx
  media/page.tsx
  domain/page.tsx
  preview/page.tsx
  publish/page.tsx

src/app/artist/website/
  page.tsx
  editor/page.tsx
  media/page.tsx
  links/page.tsx
  domains/page.tsx
  settings/page.tsx
  versions/page.tsx

src/app/api/onboarding/route.ts
src/app/api/artists/route.ts
src/app/api/artists/[artistId]/route.ts
src/app/api/templates/route.ts
src/app/api/websites/route.ts
src/app/api/websites/[websiteId]/route.ts
src/app/api/websites/[websiteId]/pages/route.ts
src/app/api/websites/[websiteId]/publish/route.ts
src/app/api/websites/[websiteId]/versions/route.ts
src/app/api/media/upload-intent/route.ts
src/app/api/media/complete/route.ts
src/app/api/media/[assetId]/route.ts
src/app/api/domains/route.ts
src/app/api/domains/[domainId]/verify/route.ts
src/app/api/domains/[domainId]/activate/route.ts
src/app/api/domains/[domainId]/detach/route.ts
```

All route handlers must call shared authentication, authorization, validation and audit helpers. Avoid duplicating security checks ad hoc.

### 6.3 New libraries and components

```text
src/lib/auth/
  require-session.ts
  require-artist-permission.ts
  session.ts
  policy.ts

src/lib/website/
  tenant-resolution.ts
  template-registry.ts
  template-versioning.ts
  content-schema.ts
  renderer.ts
  publishing.ts
  domain-normalization.ts
  domain-verification.ts
  hosting-adapter.ts

src/lib/media/
  storage-adapter.ts
  upload-policy.ts
  image-processing.ts

src/lib/jobs/
  queue.ts
  domain-check-job.ts
  publish-job.ts
  image-processing-job.ts

src/components/website-builder/
  TemplateGallery.tsx
  TemplatePreview.tsx
  SectionEditor.tsx
  SectionLibrary.tsx
  SortableSections.tsx
  DragDropCanvas.tsx
  MediaUploader.tsx
  MediaLibrary.tsx
  SocialLinksEditor.tsx
  DomainConnector.tsx
  PublishChecklist.tsx

src/templates/
  headliner/
  minimalist/
  culture/
  musician/
```

Template folders should expose registered, versioned components; they must not execute artist-supplied code.

### 6.4 Infrastructure and tests

Add:
- `prisma/migrations/` for reviewed schema migrations; do not use `db:push --accept-data-loss` in production.
- `tests/unit/` for domain normalization, content validation, template compatibility and policy functions.
- `tests/integration/` for signup, membership authorization, upload intents, domain verification and publishing.
- `tests/e2e/` for the artist onboarding journey and public website rendering.
- `docs/artist-website-builder/` for runbooks, provider decisions, threat model and deployment operations.
- Environment variable documentation for PostgreSQL, object storage, queue, token/session secrets, domain provider and optional isolated-hosting provider. Never commit credentials.

## 7. API and workflow contract

### Artist onboarding

1. Register account with email and password; no role parameter.
2. Verify email.
3. Create artist profile/workspace; user receives owner membership through a server-side transaction.
4. Create draft website and onboarding progress record.
5. Select a template/version.
6. Add profile, biography, music links and social links.
7. Upload images using signed upload intents; complete processing before assets become selectable.
8. Build pages from typed sections; preview on desktop/tablet/mobile.
9. Use RAAS temporary subdomain or connect a custom domain.
10. Verify domain and TLS; publish immutable version.
11. Dashboard shows live URL, domain status, media library, editor, versions and analytics.

### Draft/publish lifecycle

`draft -> validating -> queued -> publishing -> published`

Failures must return to a retryable state with a visible reason. Publishing must be idempotent. Public rendering reads only the latest successfully published immutable snapshot; drafts are never exposed.

### Hybrid hosting contract

Define a `HostingAdapter` interface with:
- `provision(siteVersion)`
- `getStatus(deploymentId)`
- `promote(deploymentId)`
- `rollback(deploymentId)`
- `retire(deploymentId)`

The shared adapter is implemented first. The isolated adapter is implemented only after the shared runtime, immutable artifacts and domain routing are stable.

## 8. Delivery phases and exit criteria

### Phase 0 — Security and baseline
- Remove public role selection and role-header authorization.
- Disable public seed route and demo credentials in production.
- Decide and document the no-cookie/session threat model.
- Establish typecheck/lint/test/build gates.
**Exit:** forged role headers and client role edits cannot grant access; production signup cannot create privileged users.

### Phase 1 — Database and workspace foundation
- Move SQLite to PostgreSQL with migration and data migration rehearsal.
- Add Artist, ArtistMember, AuditEvent and OnboardingProgress.
- Add server-side membership authorization.
**Exit:** one user can own an artist workspace; a second unrelated user cannot read or mutate it.

### Phase 2 — Website and template registry
- Add Website, WebsiteTemplate, WebsitePage and WebsiteSection models.
- Build four starter templates: Headliner, Minimalist, Culture and Musician.
- Add responsive previews and version compatibility.
**Exit:** artist can select a template and render a draft website from structured data.

### Phase 3 — Content and media
- Add biography/profile, streaming/social links, gallery and music-release sections.
- Add object storage, signed upload flow, image processing, alt text and media library.
- Add section ordering and visibility.
**Exit:** artist can upload, reuse, reorder and remove their own media and update content without code.

### Phase 4 — Editor expansion
- Deliver robust section-based editor.
- Add drag-and-drop ordering/layout on the same typed section schema.
- Add autosave, validation, undo/redo where feasible and preview.
**Exit:** both editor modes produce equivalent valid website content.

### Phase 5 — Domains
- Add temporary RAAS subdomains.
- Add custom domain challenge/verification, DNS status and TLS provisioning.
- Add registrar adapter only after provider selection.
**Exit:** verified custom domain routes to the correct published artist site; unverified or detached domains do not.

### Phase 6 — Publishing and hybrid hosting
- Add immutable website versions, validation checklist, publish queue and rollback.
- Add shared-hosting adapter.
- Add isolated deployment adapter for selected premium/enterprise sites.
**Exit:** successful publish is atomic; rollback restores a prior version; isolated deployment uses the same content and template contract.

### Phase 7 — Operations and growth
- Add analytics, team invitations/permissions, audit history, support tooling and billing/tier entitlements.
- Add monitoring for domain expiry, TLS renewal, job failures, storage use and tenant isolation.
**Exit:** operations can support many artists without manual code edits per website.

## 9. Acceptance and security test matrix

- Signup request with `role=admin` cannot create an admin.
- In normal mode, forged `X-Maze-Role: admin` cannot grant access to protected APIs. 
- In diagnostic mode, role simulation is possible only for authorized testers in approved non-production environments and is recorded in audit logs. 
- Production rejects the diagnostic header even if diagnostic environment flags are accidentally enabled. 
- Diagnostic role simulation does not bypass authentication; unauthenticated requests remain unauthenticated.
- User A cannot read, update, delete or publish User B's artist resources by changing IDs/slugs.
- Artist cannot use another artist's media asset ID.
- Invalid, oversized or executable uploads are rejected.
- Signed upload URLs expire and are restricted to a specific object key and content policy.
- Domain cannot be activated before DNS ownership verification.
- Duplicate normalized domains are rejected.
- Domain removal stops routing and follows a safe release/retention process.
- Draft content is never served publicly.
- Failed publish does not replace the previous live version.
- Rollback restores a known-good published version.
- Template upgrade preserves content or reports explicit incompatibilities.
- Shared and isolated hosting render the same published snapshot.
- Build, lint, typecheck, unit, integration and end-to-end suites pass.

## 10. Decisions still required before production implementation

1. **Session model:** confirm whether to retain the no-cookie preference with bearer tokens, or adopt secure HttpOnly cookies. Raw role headers are not an option.
2. **Database hosting:** choose managed PostgreSQL provider and migration window.
3. **Media storage:** choose S3-compatible provider, region, retention and backup policy.
4. **Domain registrar:** choose provider, supported TLDs, billing, renewals and transfer policy.
5. **DNS/TLS:** choose whether RAAS controls authoritative DNS or only verifies and routes domains.
6. **Queue/worker:** select a durable job queue and worker deployment model.
7. **Isolated hosting:** define which plans qualify and which deployment provider/runtime is supported.
8. **Pricing and entitlements:** define included domains, storage, bandwidth, team seats and isolated deployments.

## 11. Implementation order recommendation

Do not start by building the visual editor. First fix identity and tenant authorization, then establish PostgreSQL and workspace ownership. The editor, upload manager, domain manager and publisher all depend on those foundations. Build the shared renderer before adding isolated hosting.

**Immediate next engineering milestone:** Phase 0 security remediation plus Phase 1 workspace/database design review. The current plan branch contains documentation only; no application behavior, production data or default-branch code has been changed.
