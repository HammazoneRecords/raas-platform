// RAAS core types — wireframe, roles, permissions

export type RoleId =
  | "public"
  | "artist"
  | "fan"
  | "b2b_dev"
  | "investor"
  | "admin"
  | "archivist";

export type Zone =
  | "system"
  | "artist"
  | "patron"
  | "investor"
  | "admin"
  | "settings";

export type Relation = "viewer" | "editor" | "creator" | "deleter";

export interface WireframePage {
  id: string;
  title: string;
  portal: RoleId;
  zone: Zone;
  depth: number;
  navLinks: string[];
  navBar: string[];
  /** Route path (e.g. "/", "/marketplace", "/artist/[slug]"). */
  route: string;
  /** Short description shown in cards / nav. */
  blurb: string;
}

export interface PermissionTuple {
  object: string; // e.g. "page:hub"
  relation: Relation;
  subject: string; // e.g. "role:public"
}

// ---------------------------------------------------------------------------
// ROLE META
// ---------------------------------------------------------------------------

export const ROLES: Record<RoleId, { label: string; color: string; glyph: string }> = {
  public:    { label: "Public",     color: "#94A3B8", glyph: "○" },
  artist:    { label: "Artist",     color: "#22C55E", glyph: "♪" },
  fan:       { label: "Fan",        color: "#EC4899", glyph: "♥" },
  b2b_dev:   { label: "B2B Dev",    color: "#06B6D4", glyph: "❯" },
  investor:  { label: "Investor",   color: "#EF4444", glyph: "$" },
  admin:     { label: "Admin",      color: "#0EA5E9", glyph: "★" },
  archivist: { label: "Archivist",  color: "#A855F7", glyph: "❖" },
};

export const ROLE_ORDER: RoleId[] = [
  "public", "artist", "fan", "b2b_dev", "investor", "admin", "archivist"
];

// ---------------------------------------------------------------------------
// ZONE META
// ---------------------------------------------------------------------------

export const ZONES: Record<Zone, { label: string; color: string }> = {
  system:    { label: "System",    color: "#94A3B8" },
  artist:    { label: "Artist",    color: "#22C55E" },
  patron:    { label: "Patron",    color: "#EC4899" },
  investor:  { label: "Investor",  color: "#EF4444" },
  admin:     { label: "Admin",     color: "#0EA5E9" },
  settings:  { label: "Settings",  color: "#A855F7" },
};

// ---------------------------------------------------------------------------
// THE 36-PAGE WIREFRAME
// ---------------------------------------------------------------------------

export const PAGES: WireframePage[] = [
  // ── PUBLIC (4) ──────────────────────────────────────────────────────────
  {
    id: "hub",
    title: "MindWave JA Hub",
    portal: "public",
    zone: "system",
    depth: 0,
    navLinks: ["adtl_marketplace", "cultural_api_dev_portal", "raas_records_buyer", "investor_portal", "territory_marketplace", "archivist_console"],
    navBar: ["hub", "adtl_marketplace", "cultural_api_dev_portal", "raas_records_buyer", "investor_portal"],
    route: "/",
    blurb: "Reggae As A Service — own your music, your fans, your digital domain.",
  },
  {
    id: "adtl_marketplace",
    title: "ADTL Marketplace",
    portal: "public",
    zone: "system",
    depth: 1,
    navLinks: ["artist_territory_public", "territory_marketplace"],
    navBar: ["hub", "adtl_marketplace", "cultural_api_dev_portal", "raas_records_buyer", "investor_portal"],
    route: "/marketplace",
    blurb: "Browse live artist sites built on RAAS.",
  },
  {
    id: "artist_territory_public",
    title: "Artist Territory (Public View)",
    portal: "public",
    zone: "system",
    depth: 2,
    navLinks: ["fan_dashboard", "artist_merch", "artist_brand_extension", "artist_dashboard"],
    navBar: ["hub", "adtl_marketplace", "cultural_api_dev_portal", "raas_records_buyer", "investor_portal"],
    route: "/artist/[slug]",
    blurb: "Public view of an artist's digital domain.",
  },
  {
    id: "territory_marketplace",
    title: "RAAS Territory Marketplace (Secondary Market)",
    portal: "public",
    zone: "system",
    depth: 1,
    navLinks: ["adtl_marketplace", "artist_territory_public", "artist_territory_cert"],
    navBar: ["hub", "adtl_marketplace", "cultural_api_dev_portal", "raas_records_buyer", "investor_portal"],
    route: "/territory-marketplace",
    blurb: "Secondary market for artist territory domains.",
  },

  // ── ARTIST (11) ─────────────────────────────────────────────────────────
  {
    id: "artist_dashboard",
    title: "Artist Dashboard",
    portal: "artist",
    zone: "artist",
    depth: 3,
    navLinks: ["artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_territory_switcher", "artist_settings"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist",
    blurb: "Your territory at a glance — fee, ADTL, brand extension, valuation.",
  },
  {
    id: "artist_merch",
    title: "Artist Merch Store",
    portal: "artist",
    zone: "artist",
    depth: 3,
    navLinks: ["artist_dashboard"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/merch",
    blurb: "Product catalog, RASSPay escrow, recent transactions.",
  },
  {
    id: "artist_brand_extension",
    title: "Brand Extension Manager",
    portal: "artist",
    zone: "artist",
    depth: 3,
    navLinks: ["admin_manufacturing_partners"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/brand-extension",
    blurb: "Manage your physical brand extensions and manufacturing partners.",
  },
  {
    id: "artist_cultural_api",
    title: "Cultural API Monetization (Artist View)",
    portal: "artist",
    zone: "artist",
    depth: 2,
    navLinks: ["cultural_api_dev_portal"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/cultural-api",
    blurb: "Six cultural endpoints. 100% of revenue to you. Live revenue.",
  },
  {
    id: "artist_ai_voice",
    title: "AI Voice Control",
    portal: "artist",
    zone: "artist",
    depth: 2,
    navLinks: ["fan_ai_voice_generator", "admin_ai_agents"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/ai-voice",
    blurb: "Control your official AI voice — topics, pricing, revenue share.",
  },
  {
    id: "artist_community",
    title: "Community (Artist View)",
    portal: "artist",
    zone: "artist",
    depth: 2,
    navLinks: ["fan_dashboard"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/community",
    blurb: "Four fan tiers — Roots, Rockers, Royalty, Rastafari.",
  },
  {
    id: "artist_territory_cert",
    title: "Territory Certificate",
    portal: "artist",
    zone: "artist",
    depth: 2,
    navLinks: ["territory_marketplace"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/territory-cert",
    blurb: "Your ADTL Licence — inheritable, sellable, or both.",
  },
  {
    id: "artist_analytics",
    title: "Artist Analytics",
    portal: "artist",
    zone: "artist",
    depth: 2,
    navLinks: ["admin_big_rass_data"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/analytics",
    blurb: "Audience, revenue breakdown, 20-year territory valuation.",
  },
  {
    id: "artist_revenue",
    title: "Artist Revenue",
    portal: "artist",
    zone: "artist",
    depth: 2,
    navLinks: ["investor_portal"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/revenue",
    blurb: "RASSPay escrow, royalty splits, withdrawals, history.",
  },
  {
    id: "artist_rassline",
    title: "RASSline — Release Pipeline",
    portal: "artist",
    zone: "artist",
    depth: 2,
    navLinks: ["artist_dashboard"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/rassline",
    blurb: "Seven-stage release pipeline from upload to analytics.",
  },
  {
    id: "artist_territory_switcher",
    title: "Multi-Territory Management",
    portal: "artist",
    zone: "artist",
    depth: 2,
    navLinks: ["artist_dashboard"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/multi-territory",
    blurb: "Manage multiple artist territories from one account.",
  },
  {
    id: "artist_settings",
    title: "Artist Settings",
    portal: "artist",
    zone: "artist",
    depth: 2,
    navLinks: ["artist_dashboard"],
    navBar: ["artist_dashboard", "artist_brand_extension", "artist_cultural_api", "artist_ai_voice", "artist_community", "artist_territory_cert", "artist_analytics", "artist_revenue", "artist_rassline", "artist_settings"],
    route: "/artist/settings",
    blurb: "Profile, audience connections, payment, notifications.",
  },

  // ── FAN (2) ─────────────────────────────────────────────────────────────
  {
    id: "fan_dashboard",
    title: "Fan Dashboard",
    portal: "fan",
    zone: "patron",
    depth: 3,
    navLinks: ["artist_territory_public"],
    navBar: ["fan_dashboard", "fan_ai_voice_generator"],
    route: "/fan",
    blurb: "Your support history, fan rank, AI voice credits.",
  },
  {
    id: "fan_ai_voice_generator",
    title: "Fan AI Voice Generator",
    portal: "fan",
    zone: "patron",
    depth: 2,
    navLinks: ["artist_ai_voice"],
    navBar: ["fan_dashboard", "fan_ai_voice_generator"],
    route: "/fan/ai-voice-generator",
    blurb: "Suno for Yardies — generate songs with artist's official AI voice.",
  },

  // ── B2B DEV (4) ──────────────────────────────────────────────────────────
  {
    id: "cultural_api_dev_portal",
    title: "Cultural API Developer Portal",
    portal: "b2b_dev",
    zone: "admin",
    depth: 1,
    navLinks: ["cultural_api_billing", "b2b_sonic_studio", "raas_records_buyer"],
    navBar: ["cultural_api_dev_portal", "cultural_api_billing", "b2b_sonic_studio", "raas_records_buyer"],
    route: "/dev",
    blurb: "API keys, rate limits, six endpoints, billing.",
  },
  {
    id: "b2b_sonic_studio",
    title: "B2B Sonic Studio",
    portal: "b2b_dev",
    zone: "admin",
    depth: 2,
    navLinks: ["artist_territory_public"],
    navBar: ["cultural_api_dev_portal", "cultural_api_billing", "b2b_sonic_studio", "raas_records_buyer"],
    route: "/dev/b2b-studio",
    blurb: "Jingles, voiceovers, soundtracks, sonic logos.",
  },
  {
    id: "raas_records_buyer",
    title: "RAAS Records B2B Buyer Portal",
    portal: "b2b_dev",
    zone: "admin",
    depth: 1,
    navLinks: ["cultural_api_dev_portal"],
    navBar: ["cultural_api_dev_portal", "cultural_api_billing", "b2b_sonic_studio", "raas_records_buyer"],
    route: "/dev/raas-records",
    blurb: "Sample library by era — ska to modern dancehall.",
  },
  {
    id: "cultural_api_billing",
    title: "API Rate Limit Tiers + Billing",
    portal: "b2b_dev",
    zone: "admin",
    depth: 2,
    navLinks: ["cultural_api_dev_portal"],
    navBar: ["cultural_api_dev_portal", "cultural_api_billing", "b2b_sonic_studio", "raas_records_buyer"],
    route: "/dev/billing",
    blurb: "Three tiers, monthly bills, RASSPay (PayPal underlying).",
  },

  // ── INVESTOR (3) ─────────────────────────────────────────────────────────
  {
    id: "investor_portal",
    title: "Investor Portal",
    portal: "investor",
    zone: "investor",
    depth: 1,
    navLinks: ["investor_portfolio", "investor_kpi_release"],
    navBar: ["investor_portal", "investor_portfolio", "investor_kpi_release"],
    route: "/investor",
    blurb: "Pool model, KPI tranches, cap table, projections.",
  },
  {
    id: "investor_portfolio",
    title: "Investor Portfolio — Artist Pool View",
    portal: "investor",
    zone: "investor",
    depth: 2,
    navLinks: ["investor_portal"],
    navBar: ["investor_portal", "investor_portfolio", "investor_kpi_release"],
    route: "/investor/portfolio",
    blurb: "23 artist sites with brand extensions + Y1 revenue.",
  },
  {
    id: "investor_kpi_release",
    title: "Investor KPI Tranche Release Flow",
    portal: "investor",
    zone: "investor",
    depth: 2,
    navLinks: ["investor_portal"],
    navBar: ["investor_portal", "investor_portfolio", "investor_kpi_release"],
    route: "/investor/kpi-release",
    blurb: "Five tranche status, verification, milestone penalties.",
  },

  // ── ADMIN (9) ───────────────────────────────────────────────────────────
  {
    id: "admin_console",
    title: "Admin Console Home",
    portal: "admin",
    zone: "admin",
    depth: 2,
    navLinks: ["admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_partner_onboarding", "admin_compliance", "admin_audit_log"],
    navBar: ["admin_console", "admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_compliance", "admin_audit_log", "admin_deliverables"],
    route: "/admin",
    blurb: "System health, audit log, tranche deployment, quick links.",
  },
  {
    id: "admin_big_rass_data",
    title: "Big RASS Data — Analytics Dashboard",
    portal: "admin",
    zone: "admin",
    depth: 3,
    navLinks: ["admin_console"],
    navBar: ["admin_console", "admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_compliance", "admin_audit_log", "admin_deliverables"],
    route: "/admin/big-rass-data",
    blurb: "Platform-wide metrics, funnel, growth, top territories.",
  },
  {
    id: "admin_ai_agents",
    title: "RAAS AI Agent Management",
    portal: "admin",
    zone: "admin",
    depth: 3,
    navLinks: ["artist_ai_voice"],
    navBar: ["admin_console", "admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_compliance", "admin_audit_log", "admin_deliverables"],
    route: "/admin/ai-agents",
    blurb: "Patois LLM, brand conceptor, ADTL deployer, fan bot. 4× RTX 4090.",
  },
  {
    id: "admin_backup_failover",
    title: "Backup Site Failover Admin",
    portal: "admin",
    zone: "admin",
    depth: 3,
    navLinks: ["admin_console"],
    navBar: ["admin_console", "admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_compliance", "admin_audit_log", "admin_deliverables"],
    route: "/admin/backup-failover",
    blurb: "Primary + backup, 3-2-1 strategy, failover history.",
  },
  {
    id: "admin_manufacturing_partners",
    title: "Manufacturing Partner Portal",
    portal: "admin",
    zone: "admin",
    depth: 3,
    navLinks: ["artist_brand_extension", "admin_partner_onboarding"],
    navBar: ["admin_console", "admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_compliance", "admin_audit_log", "admin_deliverables"],
    route: "/admin/manufacturing-partners",
    blurb: "Sun Island, Rebel13, Twins of Twins + local printery.",
  },
  {
    id: "admin_enterprise_leads",
    title: "Enterprise Lead Intake",
    portal: "admin",
    zone: "admin",
    depth: 3,
    navLinks: ["admin_console"],
    navBar: ["admin_console", "admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_compliance", "admin_audit_log", "admin_deliverables"],
    route: "/admin/enterprise-leads",
    blurb: "Enterprise League pipeline: 5M+ YT AND 500K+ Spotify.",
  },
  {
    id: "admin_partner_onboarding",
    title: "Manufacturing Partner Onboarding",
    portal: "admin",
    zone: "admin",
    depth: 3,
    navLinks: ["admin_console"],
    navBar: ["admin_console", "admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_compliance", "admin_audit_log", "admin_deliverables"],
    route: "/admin/partner-onboarding",
    blurb: "Checklist, pending applications, approved partners.",
  },
  {
    id: "admin_compliance",
    title: "Compliance + Legal",
    portal: "admin",
    zone: "admin",
    depth: 3,
    navLinks: ["admin_console"],
    navBar: ["admin_console", "admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_compliance", "admin_audit_log", "admin_deliverables"],
    route: "/admin/compliance",
    blurb: "KYC/AML, PDPA, GDPR, no cookies, minimum data.",
  },
  {
    id: "admin_audit_log",
    title: "Audit Log + Security",
    portal: "admin",
    zone: "admin",
    depth: 3,
    navLinks: ["admin_console"],
    navBar: ["admin_console", "admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_compliance", "admin_audit_log", "admin_deliverables"],
    route: "/admin/audit-log",
    blurb: "50 mock entries, filters, security alerts, export.",
  },
  {
    id: "admin_deliverables",
    title: "Deliverables & Hierarchy",
    portal: "admin",
    zone: "admin",
    depth: 2,
    navLinks: ["admin_console", "admin_enterprise_leads", "admin_manufacturing_partners", "admin_partner_onboarding"],
    navBar: ["admin_console", "admin_deliverables", "admin_big_rass_data", "admin_ai_agents", "admin_backup_failover", "admin_manufacturing_partners", "admin_enterprise_leads", "admin_compliance", "admin_audit_log", "admin_deliverables"],
    route: "/admin/deliverables",
    blurb: "Stakeholder hierarchy, per-role deliverables, supplier on-time & logistics board.",
  },

  // ── ACCOUNT (all logged-in roles) ──────────────────────────────────────
  {
    id: "account_settings",
    title: "Account Settings",
    portal: "artist",
    zone: "settings",
    depth: 1,
    navLinks: [],
    navBar: [],
    route: "/settings",
    blurb: "Profile, password, notifications, session — for every logged-in role.",
  },

  {
    id: "archivist_console",
    title: "Archivist Console",
    portal: "archivist",
    zone: "settings",
    depth: 1,
    navLinks: ["archivist_institution_portal", "admin_console"],
    navBar: ["archivist_console", "archivist_institution_portal"],
    route: "/archivist",
    blurb: "Archive entries, eras covered, institutional partners.",
  },
  {
    id: "archivist_institution_portal",
    title: "Reggae Archive SaaS — Institution Portal",
    portal: "archivist",
    zone: "settings",
    depth: 2,
    navLinks: ["archivist_console"],
    navBar: ["archivist_console", "archivist_institution_portal"],
    route: "/archivist/institution",
    blurb: "UWI, JCDC, museums. Academic / Cultural / Enterprise plans.",
  },
];

// Quick lookup maps
export const PAGE_BY_ID: Record<string, WireframePage> = Object.fromEntries(
  PAGES.map((p) => [p.id, p]),
);

export function pageById(id: string): WireframePage | undefined {
  return PAGE_BY_ID[id];
}

// ---------------------------------------------------------------------------
// PERMISSION TUPLES (Zanzibar-style) — built deterministically from rules
// ---------------------------------------------------------------------------

const ALL_ROLES: RoleId[] = ROLE_ORDER;

function buildPermissionTuples(): PermissionTuple[] {
  const t: PermissionTuple[] = [];

  const add = (pageId: string, relation: Relation, role: RoleId) => {
    t.push({ object: `page:${pageId}`, relation, subject: `role:${role}` });
  };

  for (const p of PAGES) {
    // Account settings: every logged-in role can view; admin can edit
    if (p.id === "account_settings") {
      for (const r of ROLE_ORDER) {
        if (r !== "public") add(p.id, "viewer", r);
      }
      add(p.id, "editor", "admin");
      continue;
    }
    switch (p.portal) {
      case "public": {
        // Every role can view public pages
        for (const r of ALL_ROLES) add(p.id, "viewer", r);
        // admin full control
        for (const rel of ["editor", "creator", "deleter"] as Relation[]) {
          add(p.id, rel, "admin");
        }
        // artist can edit/create/delete on the two territory pages
        if (p.id === "artist_territory_public" || p.id === "territory_marketplace") {
          for (const rel of ["editor", "creator", "deleter"] as Relation[]) {
            add(p.id, rel, "artist");
          }
        }
        break;
      }
      case "artist": {
        // artist + admin full control
        for (const r of ["artist", "admin"] as RoleId[]) {
          for (const rel of ["viewer", "editor", "creator", "deleter"] as Relation[]) {
            add(p.id, rel, r);
          }
        }
        break;
      }
      case "fan": {
        // fan: viewer + creator; admin: all four
        for (const rel of ["viewer", "creator"] as Relation[]) add(p.id, rel, "fan");
        for (const rel of ["viewer", "editor", "creator", "deleter"] as Relation[]) {
          add(p.id, rel, "admin");
        }
        break;
      }
      case "b2b_dev": {
        // b2b_dev: viewer + editor + creator; admin: all four
        for (const rel of ["viewer", "editor", "creator"] as Relation[]) add(p.id, rel, "b2b_dev");
        for (const rel of ["viewer", "editor", "creator", "deleter"] as Relation[]) {
          add(p.id, rel, "admin");
        }
        break;
      }
      case "investor": {
        // investor: viewer only; admin: all four
        add(p.id, "viewer", "investor");
        for (const rel of ["viewer", "editor", "creator", "deleter"] as Relation[]) {
          add(p.id, rel, "admin");
        }
        break;
      }
      case "admin": {
        // admin: all four
        for (const rel of ["viewer", "editor", "creator", "deleter"] as Relation[]) {
          add(p.id, rel, "admin");
        }
        break;
      }
      case "archivist": {
        // archivist: viewer + editor + creator; admin: all four
        for (const rel of ["viewer", "editor", "creator"] as Relation[]) add(p.id, rel, "archivist");
        for (const rel of ["viewer", "editor", "creator", "deleter"] as Relation[]) {
          add(p.id, rel, "admin");
        }
        break;
      }
    }
  }

  return t;
}

export const PERMISSIONS: PermissionTuple[] = buildPermissionTuples();

// Index for fast lookup: object → relation → Set<role>
const PERM_INDEX: Record<string, Record<Relation, Set<string>>> = {};
for (const t of PERMISSIONS) {
  const obj = t.object;
  if (!PERM_INDEX[obj]) PERM_INDEX[obj] = { viewer: new Set(), editor: new Set(), creator: new Set(), deleter: new Set() };
  PERM_INDEX[obj][t.relation].add(t.subject.replace("role:", ""));
}

/**
 * Check whether `role` has `relation` on `pageId`.
 */
export function can(role: RoleId, relation: Relation, pageId: string): boolean {
  const obj = `page:${pageId}`;
  const idx = PERM_INDEX[obj];
  if (!idx) return false;
  return idx[relation].has(role);
}

/** Whether `role` can VIEW a page (the main check used by every protected route). */
export function canView(role: RoleId, pageId: string): boolean {
  return can(role, "viewer", pageId);
}

/** Roles that can view a page (for the maze visualizer). */
export function viewersOf(pageId: string): RoleId[] {
  const obj = `page:${pageId}`;
  const idx = PERM_INDEX[obj];
  if (!idx) return [];
  return ROLE_ORDER.filter((r) => idx.viewer.has(r));
}

export const PERMISSION_COUNT = PERMISSIONS.length;
