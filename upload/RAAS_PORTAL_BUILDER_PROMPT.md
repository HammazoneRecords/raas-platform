# RAAS Portal Builder — Agent Prompt

> **What this is:** A comprehensive prompt for an AI agent to build the RAAS (Reggae As A Service) platform portal from scratch. Contains everything the agent needs — the wireframe spec, role/permission model, routing structure, design system, and content rules — without any irrelevant context (no DB facts, no investor financials, no Patois LLM dictionary sizes, no pitch speech scripts).

---

## YOUR TASK

Build the RAAS platform portal as a Next.js 16 application. The platform is a multi-role cultural infrastructure product for Jamaican artists, fans, developers, investors, admins, and archivists. You must build **36 routed pages** across **7 roles**, enforce **role-based permissions** on every page, and follow the **wireframe spec** exactly (no missing routes, no extra routes).

## WHAT IS RAAS

RAAS = **Reggae As A Service**. A Jamaica-based cultural technology platform that gives artists their own digital domain (website, domain, storefront, fan data, brand extension). Think "PayPal for reggae. Starlink for culture. Amazon for riddim." The platform has an 8-layer stack (artist sites, Cultural API, community, archive, sonic studio, records, AI, cloud). Only Layer 1 (artist sites) is fully built today.

**Tagline:** "PayPal for reggae · Starlink for culture · Amazon for riddim"
**Closing:** "Out of silence comes sound. Out of sound comes power."

## WHAT NOT TO INCLUDE

Do NOT add any of the following to the platform:
- Investor financial details (equity %, raise amounts, valuations, KPI tranches, cap tables) — these are PRIVATE, behind investor login only
- Internal metrics (Patois LLM dictionary size, conversion funnel math, support potential calculations)
- Pitch speech scripts or memorized trigger phrases
- Business plan excerpts or BOM (Bill of Materials) hardware details
- Contract clauses or legal text
- Any content that would only interest an investor, not an artist or fan

**Rule:** If a first-time visitor (artist or fan) wouldn't care about it, don't put it on a public page.

## THE WIREFRAME — YOUR SOURCE OF TRUTH

The wireframe defines exactly 36 pages across 7 roles. Every page has:
- `id` — the route slug
- `title` — display title
- `portal` — which role group it belongs to
- `zone` — UI zone (system, artist, patron, investor, admin, settings)
- `depth` — navigation depth (0 = hub, 1+ = sub-pages)
- `navLinks` — which pages this page links to
- `navBar` — which pages appear in the left nav bar for this portal

### Roles (7)

```
public, artist, fan, b2b_dev, investor, admin, archivist
```

### Zones (6)

```
system, artist, patron, investor, admin, settings
```

### Pages (36) — the complete wireframe

```json
[
  {
    "id": "hub",
    "title": "MindWave JA Hub",
    "portal": "public",
    "zone": "system",
    "depth": 0,
    "navLinks": [
      "adtl_marketplace",
      "cultural_api_dev_portal",
      "raas_records_buyer",
      "investor_portal",
      "territory_marketplace",
      "archivist_console"
    ],
    "navBar": [
      "hub",
      "adtl_marketplace",
      "cultural_api_dev_portal",
      "raas_records_buyer",
      "investor_portal"
    ]
  },
  {
    "id": "adtl_marketplace",
    "title": "ADTL Marketplace",
    "portal": "public",
    "zone": "system",
    "depth": 1,
    "navLinks": [
      "artist_territory_public",
      "territory_marketplace"
    ],
    "navBar": [
      "hub",
      "adtl_marketplace",
      "cultural_api_dev_portal",
      "raas_records_buyer",
      "investor_portal"
    ]
  },
  {
    "id": "artist_territory_public",
    "title": "Artist Territory (Public View)",
    "portal": "public",
    "zone": "system",
    "depth": 2,
    "navLinks": [
      "fan_dashboard",
      "artist_merch",
      "artist_brand_extension",
      "artist_dashboard"
    ],
    "navBar": [
      "hub",
      "adtl_marketplace",
      "cultural_api_dev_portal",
      "raas_records_buyer",
      "investor_portal"
    ]
  },
  {
    "id": "territory_marketplace",
    "title": "RAAS Territory Marketplace (Secondary Market)",
    "portal": "public",
    "zone": "system",
    "depth": 1,
    "navLinks": [
      "adtl_marketplace",
      "artist_territory_public",
      "artist_territory_cert"
    ],
    "navBar": [
      "hub",
      "adtl_marketplace",
      "cultural_api_dev_portal",
      "raas_records_buyer",
      "investor_portal"
    ]
  },
  {
    "id": "artist_dashboard",
    "title": "Artist Dashboard",
    "portal": "artist",
    "zone": "artist",
    "depth": 3,
    "navLinks": [
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_territory_switcher",
      "artist_settings"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_merch",
    "title": "Artist Merch Store",
    "portal": "artist",
    "zone": "artist",
    "depth": 3,
    "navLinks": [
      "artist_dashboard"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_brand_extension",
    "title": "Brand Extension Manager",
    "portal": "artist",
    "zone": "artist",
    "depth": 3,
    "navLinks": [
      "admin_manufacturing_partners"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_cultural_api",
    "title": "Cultural API Monetization (Artist View)",
    "portal": "artist",
    "zone": "artist",
    "depth": 2,
    "navLinks": [
      "cultural_api_dev_portal"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_ai_voice",
    "title": "AI Voice Control",
    "portal": "artist",
    "zone": "artist",
    "depth": 2,
    "navLinks": [
      "fan_ai_voice_generator",
      "admin_ai_agents"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_community",
    "title": "Community (Artist View)",
    "portal": "artist",
    "zone": "artist",
    "depth": 2,
    "navLinks": [
      "fan_dashboard"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_territory_cert",
    "title": "Territory Certificate",
    "portal": "artist",
    "zone": "artist",
    "depth": 2,
    "navLinks": [
      "territory_marketplace"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_analytics",
    "title": "Artist Analytics",
    "portal": "artist",
    "zone": "artist",
    "depth": 2,
    "navLinks": [
      "admin_big_rass_data"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_revenue",
    "title": "Artist Revenue",
    "portal": "artist",
    "zone": "artist",
    "depth": 2,
    "navLinks": [
      "investor_portal"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_rassline",
    "title": "RASSline — Release Pipeline",
    "portal": "artist",
    "zone": "artist",
    "depth": 2,
    "navLinks": [
      "artist_dashboard"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_territory_switcher",
    "title": "Multi-Territory Management",
    "portal": "artist",
    "zone": "artist",
    "depth": 2,
    "navLinks": [
      "artist_dashboard"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "artist_settings",
    "title": "Artist Settings",
    "portal": "artist",
    "zone": "artist",
    "depth": 2,
    "navLinks": [
      "artist_dashboard"
    ],
    "navBar": [
      "artist_dashboard",
      "artist_brand_extension",
      "artist_cultural_api",
      "artist_ai_voice",
      "artist_community",
      "artist_territory_cert",
      "artist_analytics",
      "artist_revenue",
      "artist_rassline",
      "artist_settings"
    ]
  },
  {
    "id": "fan_dashboard",
    "title": "Fan Dashboard",
    "portal": "fan",
    "zone": "patron",
    "depth": 3,
    "navLinks": [
      "artist_territory_public"
    ],
    "navBar": [
      "fan_dashboard",
      "fan_ai_voice_generator"
    ]
  },
  {
    "id": "fan_ai_voice_generator",
    "title": "Fan AI Voice Generator",
    "portal": "fan",
    "zone": "patron",
    "depth": 2,
    "navLinks": [
      "artist_ai_voice"
    ],
    "navBar": [
      "fan_dashboard",
      "fan_ai_voice_generator"
    ]
  },
  {
    "id": "cultural_api_dev_portal",
    "title": "Cultural API Developer Portal",
    "portal": "b2b_dev",
    "zone": "admin",
    "depth": 1,
    "navLinks": [
      "cultural_api_billing",
      "b2b_sonic_studio",
      "raas_records_buyer"
    ],
    "navBar": [
      "cultural_api_dev_portal",
      "cultural_api_billing",
      "b2b_sonic_studio",
      "raas_records_buyer"
    ]
  },
  {
    "id": "b2b_sonic_studio",
    "title": "B2B Sonic Studio",
    "portal": "b2b_dev",
    "zone": "admin",
    "depth": 2,
    "navLinks": [
      "artist_territory_public"
    ],
    "navBar": [
      "cultural_api_dev_portal",
      "cultural_api_billing",
      "b2b_sonic_studio",
      "raas_records_buyer"
    ]
  },
  {
    "id": "raas_records_buyer",
    "title": "RAAS Records B2B Buyer Portal",
    "portal": "b2b_dev",
    "zone": "admin",
    "depth": 1,
    "navLinks": [
      "cultural_api_dev_portal"
    ],
    "navBar": [
      "cultural_api_dev_portal",
      "cultural_api_billing",
      "b2b_sonic_studio",
      "raas_records_buyer"
    ]
  },
  {
    "id": "cultural_api_billing",
    "title": "API Rate Limit Tiers + Billing",
    "portal": "b2b_dev",
    "zone": "admin",
    "depth": 2,
    "navLinks": [
      "cultural_api_dev_portal"
    ],
    "navBar": [
      "cultural_api_dev_portal",
      "cultural_api_billing",
      "b2b_sonic_studio",
      "raas_records_buyer"
    ]
  },
  {
    "id": "investor_portal",
    "title": "Investor Portal",
    "portal": "investor",
    "zone": "investor",
    "depth": 1,
    "navLinks": [
      "investor_portfolio",
      "investor_kpi_release"
    ],
    "navBar": [
      "investor_portal",
      "investor_portfolio",
      "investor_kpi_release"
    ]
  },
  {
    "id": "investor_portfolio",
    "title": "Investor Portfolio — Artist Pool View",
    "portal": "investor",
    "zone": "investor",
    "depth": 2,
    "navLinks": [
      "investor_portal"
    ],
    "navBar": [
      "investor_portal",
      "investor_portfolio",
      "investor_kpi_release"
    ]
  },
  {
    "id": "investor_kpi_release",
    "title": "Investor KPI Tranche Release Flow",
    "portal": "investor",
    "zone": "investor",
    "depth": 2,
    "navLinks": [
      "investor_portal"
    ],
    "navBar": [
      "investor_portal",
      "investor_portfolio",
      "investor_kpi_release"
    ]
  },
  {
    "id": "admin_console",
    "title": "Admin Console Home",
    "portal": "admin",
    "zone": "admin",
    "depth": 2,
    "navLinks": [
      "admin_big_rass_data",
      "admin_ai_agents",
      "admin_backup_failover",
      "admin_manufacturing_partners",
      "admin_enterprise_leads",
      "admin_partner_onboarding",
      "admin_compliance",
      "admin_audit_log"
    ],
    "navBar": [
      "admin_console",
      "admin_big_rass_data",
      "admin_ai_agents",
      "admin_backup_failover",
      "admin_manufacturing_partners",
      "admin_enterprise_leads",
      "admin_compliance",
      "admin_audit_log"
    ]
  },
  {
    "id": "admin_big_rass_data",
    "title": "Big RASS Data — Analytics Dashboard",
    "portal": "admin",
    "zone": "admin",
    "depth": 3,
    "navLinks": [
      "admin_console"
    ],
    "navBar": [
      "admin_console",
      "admin_big_rass_data",
      "admin_ai_agents",
      "admin_backup_failover",
      "admin_manufacturing_partners",
      "admin_enterprise_leads",
      "admin_compliance",
      "admin_audit_log"
    ]
  },
  {
    "id": "admin_ai_agents",
    "title": "RAAS AI Agent Management",
    "portal": "admin",
    "zone": "admin",
    "depth": 3,
    "navLinks": [
      "artist_ai_voice"
    ],
    "navBar": [
      "admin_console",
      "admin_big_rass_data",
      "admin_ai_agents",
      "admin_backup_failover",
      "admin_manufacturing_partners",
      "admin_enterprise_leads",
      "admin_compliance",
      "admin_audit_log"
    ]
  },
  {
    "id": "admin_backup_failover",
    "title": "Backup Site Failover Admin",
    "portal": "admin",
    "zone": "admin",
    "depth": 3,
    "navLinks": [
      "admin_console"
    ],
    "navBar": [
      "admin_console",
      "admin_big_rass_data",
      "admin_ai_agents",
      "admin_backup_failover",
      "admin_manufacturing_partners",
      "admin_enterprise_leads",
      "admin_compliance",
      "admin_audit_log"
    ]
  },
  {
    "id": "admin_manufacturing_partners",
    "title": "Manufacturing Partner Portal",
    "portal": "admin",
    "zone": "admin",
    "depth": 3,
    "navLinks": [
      "artist_brand_extension",
      "admin_partner_onboarding"
    ],
    "navBar": [
      "admin_console",
      "admin_big_rass_data",
      "admin_ai_agents",
      "admin_backup_failover",
      "admin_manufacturing_partners",
      "admin_enterprise_leads",
      "admin_compliance",
      "admin_audit_log"
    ]
  },
  {
    "id": "admin_enterprise_leads",
    "title": "Enterprise Lead Intake",
    "portal": "admin",
    "zone": "admin",
    "depth": 3,
    "navLinks": [
      "admin_console"
    ],
    "navBar": [
      "admin_console",
      "admin_big_rass_data",
      "admin_ai_agents",
      "admin_backup_failover",
      "admin_manufacturing_partners",
      "admin_enterprise_leads",
      "admin_compliance",
      "admin_audit_log"
    ]
  },
  {
    "id": "admin_partner_onboarding",
    "title": "Manufacturing Partner Onboarding",
    "portal": "admin",
    "zone": "admin",
    "depth": 3,
    "navLinks": [
      "admin_console"
    ],
    "navBar": [
      "admin_console",
      "admin_big_rass_data",
      "admin_ai_agents",
      "admin_backup_failover",
      "admin_manufacturing_partners",
      "admin_enterprise_leads",
      "admin_compliance",
      "admin_audit_log"
    ]
  },
  {
    "id": "admin_compliance",
    "title": "Compliance + Legal",
    "portal": "admin",
    "zone": "admin",
    "depth": 3,
    "navLinks": [
      "admin_console"
    ],
    "navBar": [
      "admin_console",
      "admin_big_rass_data",
      "admin_ai_agents",
      "admin_backup_failover",
      "admin_manufacturing_partners",
      "admin_enterprise_leads",
      "admin_compliance",
      "admin_audit_log"
    ]
  },
  {
    "id": "admin_audit_log",
    "title": "Audit Log + Security",
    "portal": "admin",
    "zone": "admin",
    "depth": 3,
    "navLinks": [
      "admin_console"
    ],
    "navBar": [
      "admin_console",
      "admin_big_rass_data",
      "admin_ai_agents",
      "admin_backup_failover",
      "admin_manufacturing_partners",
      "admin_enterprise_leads",
      "admin_compliance",
      "admin_audit_log"
    ]
  },
  {
    "id": "archivist_console",
    "title": "Archivist Console",
    "portal": "archivist",
    "zone": "settings",
    "depth": 1,
    "navLinks": [
      "archivist_institution_portal",
      "admin_console"
    ],
    "navBar": [
      "archivist_console",
      "archivist_institution_portal"
    ]
  },
  {
    "id": "archivist_institution_portal",
    "title": "Reggae Archive SaaS — Institution Portal",
    "portal": "archivist",
    "zone": "settings",
    "depth": 2,
    "navLinks": [
      "archivist_console"
    ],
    "navBar": [
      "archivist_console",
      "archivist_institution_portal"
    ]
  }
]
```

### Permission Model (Zanzibar-style)

Every page has role-based permissions. The permission model uses Zanzibar-style relationship tuples:

```
subject (role) has relation (verb) on object (page)
```

Relations map to actions:
- `viewer` → `view` (can see the page)
- `editor` → `edit` (can modify content)
- `creator` → `create` (can create new items)
- `deleter` → `delete` (can remove items)

**Permission tuples (247 total):**

```json
[
  {
    "object": "page:hub",
    "relation": "viewer",
    "subject": "role:public"
  },
  {
    "object": "page:hub",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:hub",
    "relation": "viewer",
    "subject": "role:fan"
  },
  {
    "object": "page:hub",
    "relation": "viewer",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:hub",
    "relation": "viewer",
    "subject": "role:investor"
  },
  {
    "object": "page:hub",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:hub",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:hub",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:hub",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:hub",
    "relation": "viewer",
    "subject": "role:archivist"
  },
  {
    "object": "page:adtl_marketplace",
    "relation": "viewer",
    "subject": "role:public"
  },
  {
    "object": "page:adtl_marketplace",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:adtl_marketplace",
    "relation": "viewer",
    "subject": "role:fan"
  },
  {
    "object": "page:adtl_marketplace",
    "relation": "viewer",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:adtl_marketplace",
    "relation": "viewer",
    "subject": "role:investor"
  },
  {
    "object": "page:adtl_marketplace",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:adtl_marketplace",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:adtl_marketplace",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:adtl_marketplace",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:adtl_marketplace",
    "relation": "viewer",
    "subject": "role:archivist"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "viewer",
    "subject": "role:public"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "viewer",
    "subject": "role:fan"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "viewer",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "viewer",
    "subject": "role:investor"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_public",
    "relation": "viewer",
    "subject": "role:archivist"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "viewer",
    "subject": "role:public"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "viewer",
    "subject": "role:fan"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "viewer",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "viewer",
    "subject": "role:investor"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:territory_marketplace",
    "relation": "viewer",
    "subject": "role:archivist"
  },
  {
    "object": "page:artist_dashboard",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_dashboard",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_dashboard",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_dashboard",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_dashboard",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_dashboard",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_dashboard",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_dashboard",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_merch",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_merch",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_merch",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_merch",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_merch",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_merch",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_merch",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_merch",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_brand_extension",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_brand_extension",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_brand_extension",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_brand_extension",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_brand_extension",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_brand_extension",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_brand_extension",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_brand_extension",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_cultural_api",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_cultural_api",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_cultural_api",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_cultural_api",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_cultural_api",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_cultural_api",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_cultural_api",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_cultural_api",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_ai_voice",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_ai_voice",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_ai_voice",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_ai_voice",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_ai_voice",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_ai_voice",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_ai_voice",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_ai_voice",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_community",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_community",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_community",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_community",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_community",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_community",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_community",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_community",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_cert",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_cert",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_cert",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_cert",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_cert",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_cert",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_cert",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_cert",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_analytics",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_analytics",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_analytics",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_analytics",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_analytics",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_analytics",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_analytics",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_analytics",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_revenue",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_revenue",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_revenue",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_revenue",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_revenue",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_revenue",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_revenue",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_revenue",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_rassline",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_rassline",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_rassline",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_rassline",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_rassline",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_rassline",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_rassline",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_rassline",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_switcher",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_switcher",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_switcher",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_switcher",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_territory_switcher",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_switcher",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_switcher",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_territory_switcher",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_settings",
    "relation": "viewer",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_settings",
    "relation": "editor",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_settings",
    "relation": "creator",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_settings",
    "relation": "deleter",
    "subject": "role:artist"
  },
  {
    "object": "page:artist_settings",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_settings",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_settings",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:artist_settings",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:fan_dashboard",
    "relation": "viewer",
    "subject": "role:fan"
  },
  {
    "object": "page:fan_dashboard",
    "relation": "creator",
    "subject": "role:fan"
  },
  {
    "object": "page:fan_dashboard",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:fan_dashboard",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:fan_dashboard",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:fan_dashboard",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:fan_ai_voice_generator",
    "relation": "viewer",
    "subject": "role:fan"
  },
  {
    "object": "page:fan_ai_voice_generator",
    "relation": "creator",
    "subject": "role:fan"
  },
  {
    "object": "page:fan_ai_voice_generator",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:fan_ai_voice_generator",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:fan_ai_voice_generator",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:fan_ai_voice_generator",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:cultural_api_dev_portal",
    "relation": "viewer",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:cultural_api_dev_portal",
    "relation": "editor",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:cultural_api_dev_portal",
    "relation": "creator",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:cultural_api_dev_portal",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:cultural_api_dev_portal",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:cultural_api_dev_portal",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:cultural_api_dev_portal",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:b2b_sonic_studio",
    "relation": "viewer",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:b2b_sonic_studio",
    "relation": "editor",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:b2b_sonic_studio",
    "relation": "creator",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:b2b_sonic_studio",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:b2b_sonic_studio",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:b2b_sonic_studio",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:b2b_sonic_studio",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:raas_records_buyer",
    "relation": "viewer",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:raas_records_buyer",
    "relation": "editor",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:raas_records_buyer",
    "relation": "creator",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:raas_records_buyer",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:raas_records_buyer",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:raas_records_buyer",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:raas_records_buyer",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:cultural_api_billing",
    "relation": "viewer",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:cultural_api_billing",
    "relation": "editor",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:cultural_api_billing",
    "relation": "creator",
    "subject": "role:b2b_dev"
  },
  {
    "object": "page:cultural_api_billing",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:cultural_api_billing",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:cultural_api_billing",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:cultural_api_billing",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_portal",
    "relation": "viewer",
    "subject": "role:investor"
  },
  {
    "object": "page:investor_portal",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_portal",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_portal",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_portal",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_portfolio",
    "relation": "viewer",
    "subject": "role:investor"
  },
  {
    "object": "page:investor_portfolio",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_portfolio",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_portfolio",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_portfolio",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_kpi_release",
    "relation": "viewer",
    "subject": "role:investor"
  },
  {
    "object": "page:investor_kpi_release",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_kpi_release",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_kpi_release",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:investor_kpi_release",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_console",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_console",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_console",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_console",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_big_rass_data",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_big_rass_data",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_big_rass_data",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_big_rass_data",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_ai_agents",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_ai_agents",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_ai_agents",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_ai_agents",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_backup_failover",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_backup_failover",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_backup_failover",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_backup_failover",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_manufacturing_partners",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_manufacturing_partners",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_manufacturing_partners",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_manufacturing_partners",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_enterprise_leads",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_enterprise_leads",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_enterprise_leads",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_enterprise_leads",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_partner_onboarding",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_partner_onboarding",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_partner_onboarding",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_partner_onboarding",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_compliance",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_compliance",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_compliance",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_compliance",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_audit_log",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_audit_log",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_audit_log",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:admin_audit_log",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:archivist_console",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:archivist_console",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:archivist_console",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:archivist_console",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:archivist_console",
    "relation": "viewer",
    "subject": "role:archivist"
  },
  {
    "object": "page:archivist_console",
    "relation": "editor",
    "subject": "role:archivist"
  },
  {
    "object": "page:archivist_console",
    "relation": "creator",
    "subject": "role:archivist"
  },
  {
    "object": "page:archivist_institution_portal",
    "relation": "viewer",
    "subject": "role:admin"
  },
  {
    "object": "page:archivist_institution_portal",
    "relation": "editor",
    "subject": "role:admin"
  },
  {
    "object": "page:archivist_institution_portal",
    "relation": "creator",
    "subject": "role:admin"
  },
  {
    "object": "page:archivist_institution_portal",
    "relation": "deleter",
    "subject": "role:admin"
  },
  {
    "object": "page:archivist_institution_portal",
    "relation": "viewer",
    "subject": "role:archivist"
  },
  {
    "object": "page:archivist_institution_portal",
    "relation": "editor",
    "subject": "role:archivist"
  },
  {
    "object": "page:archivist_institution_portal",
    "relation": "creator",
    "subject": "role:archivist"
  }
]
```

**Rules:**
- `public` role can view only public pages (hub, marketplace, territory_marketplace, artist_territory_public)
- `artist` role can view artist pages + public pages
- `fan` role can view fan pages + public pages
- `b2b_dev` role can view dev pages + public pages
- `investor` role can view investor pages + public pages
- `admin` role can view ALL pages
- `archivist` role can view archivist pages + public pages
- Only `admin` can edit/create/delete on most pages
- `artist` can edit/create/delete on their own territory pages

## ROUTING STRUCTURE

Build real Next.js routes (not single-page state). Each page gets its own URL:

### Public (4 pages — no login required)
```
/                           → hub (landing page)
/marketplace                → adtl_marketplace
/artist/[slug]              → artist_territory_public
/territory-marketplace      → territory_marketplace
```

### Artist (11 pages — requires artist or admin role)
```
/artist                     → artist_dashboard
/artist/merch               → artist_merch
/artist/brand-extension     → artist_brand_extension
/artist/cultural-api        → artist_cultural_api
/artist/ai-voice            → artist_ai_voice
/artist/community           → artist_community
/artist/territory-cert      → artist_territory_cert
/artist/analytics           → artist_analytics
/artist/revenue             → artist_revenue
/artist/rassline            → artist_rassline
/artist/settings            → artist_settings
```

### Fan (2 pages — requires fan or admin role)
```
/fan                        → fan_dashboard
/fan/ai-voice-generator     → fan_ai_voice_generator
```

### B2B Developer (4 pages — requires b2b_dev or admin role)
```
/dev                        → cultural_api_dev_portal
/dev/b2b-studio             → b2b_sonic_studio
/dev/raas-records           → raas_records_buyer
/dev/billing                → cultural_api_billing
```

### Investor (3 pages — requires investor or admin role)
```
/investor                   → investor_portal
/investor/portfolio         → investor_portfolio
/investor/kpi-release       → investor_kpi_release
```

### Admin (9 pages — requires admin role only)
```
/admin                              → admin_console
/admin/big-rass-data                → admin_big_rass_data
/admin/ai-agents                    → admin_ai_agents
/admin/backup-failover              → admin_backup_failover
/admin/manufacturing-partners       → admin_manufacturing_partners
/admin/enterprise-leads             → admin_enterprise_leads
/admin/partner-onboarding           → admin_partner_onboarding
/admin/compliance                   → admin_compliance
/admin/audit-log                    → admin_audit_log
```

### Archivist (2 pages — requires archivist or admin role)
```
/archivist                   → archivist_console
/archivist/institution       → archivist_institution_portal
```

## ROLE-BASED ACCESS CONTROL

### How role works

- Role is stored in `localStorage` (key: `raas-role`)
- A `RoleSwitcher` component in the top nav lets users switch roles (for demo/pitch purposes)
- Role persists across page loads via localStorage
- **NO COOKIES** — the founder explicitly ruled: cookies are the main security risk. Role lives ONLY in localStorage.

### Client-side gating

Every protected page must check the role before rendering:

```tsx
const [role] = useRole();
const canView = role === "artist" || role === "admin";
if (!canView) return <NoAccess role={role} page="Page Name" />;
```

If the role doesn't have permission, show a `<NoAccess>` component with a clear message:
"Your role (X) doesn't have permission to view Page Name. Switch role using the toggle in the top nav."

### Server-side API gating (if you build API routes)

API routes must read the role from the `X-Maze-Role` HTTP header ONLY:
```ts
export function getRoleFromRequest(req: NextRequest): RoleId {
  const headerRole = req.headers.get("x-maze-role");
  if (headerRole) return headerRole as RoleId;
  return "public"; // No header = anonymous
}
```

**NEVER** read role from:
- `?role=` URL query parameter (CRITICAL: this was a security bypass that allowed anyone to visit `?role=admin` and get full access. REMOVED. Never re-add.)
- Cookies (founder ruling: no cookies)
- localStorage on the server (impossible — localStorage is client-only)

### Client-side fetch wrapper

Create a `raasFetch()` function that automatically attaches the `X-Maze-Role` header to every API call:

```ts
export async function raasFetch(input: string, init?: RequestInit): Promise<Response> {
  const role = typeof window !== "undefined" ? localStorage.getItem("raas-role") || "public" : "public";
  return fetch(input, {
    ...init,
    headers: { ...init?.headers, "X-Maze-Role": role },
  });
}
```

## DESIGN SYSTEM

### Colors (Night Wave theme)
```
Background:     #0a0a0f (near-black)
Text primary:   #e2e8f0 (off-white)
Text dim:       opacity 0.4-0.6
Gold accent:    #fbbf24
Green (artist): #22C55E
Pink (fan):     #EC4899
Cyan (dev):     #06B6D4
Red (investor): #EF4444
Sky (admin):    #0EA5E9
Purple (arch):  #A855F7
Slate (public): #94A3B8
```

### Typography
```
Headings:  Inter, system-ui (font-weight 700-900)
Body:      Inter, system-ui (font-weight 400-500)
Mono:      JetBrains Mono / monospace (for data, code, domains)
```

### Card component pattern
```tsx
<div style={{
  background: "rgba(255,255,255,0.02)",
  borderRadius: 12,
  padding: 20,
  border: "1px solid rgba(255,255,255,0.05)",
  marginBottom: 16,
}}>
  {title && <h3 style={{ fontSize: 14, fontWeight: 600 }}>{title}</h3>}
  {children}
</div>
```

### Stat card pattern
```tsx
<div style={{
  background: "rgba(255,255,255,0.03)",
  borderRadius: 10,
  padding: 16,
  border: "1px solid rgba(255,255,255,0.05)",
}}>
  <div style={{ fontSize: 10, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
  <div style={{ fontSize: 22, fontWeight: 700, color: accentColor }}>{value}</div>
  <div style={{ fontSize: 10, opacity: 0.4 }}>{sub}</div>
</div>
```

### Layout pattern
- Sticky top nav (logo left, portal links center, role switcher right)
- Max width 1280px content container
- Breadcrumbs below nav
- Footer: "Out of silence comes sound · Out of sound comes power · RAAS · MindWave JA"

## CONTENT RULES

### Hub landing page (`/`)
The FIRST thing a visitor sees. Must answer 3 questions in 5 seconds:
1. What is this? → "Reggae As A Service"
2. Who is it for? → "Own your music. Own your fans. Own your digital domain."
3. What's next? → CTA button: "Browse live artists →"

Stats that matter to a first-time visitor (NOT internal metrics):
- Free to Start: $0 (under 500 YT or 50 Spotify)
- From: $15/mo (when your audience grows)
- You Keep: 78% (of your fan revenue)

DO NOT show: investor pool %, raise amounts, KPI tranches, cap table, revenue projections, Patois LLM size, brand extension count, portfolio Y1 revenue.

### Marketplace (`/marketplace`)
- Grid of live artist sites (name, domain, brand extension, Y1 revenue if available)
- Status badges (Live / Expired / Incomplete)
- Simple stats: live count, pipeline count
- Link each artist to `/artist/[slug]`

### Artist Territory (`/artist/[slug]`)
- Artist name + domain
- Brand extension + Y1 revenue (if available)
- CTA: "Support [artist] →" and "Visit live site ↗"
- Brief "What this territory includes" list (domain, site, store, Cultural API, fan data, inheritance)
- DO NOT show: resell schedule tables, full ADTL Licence details essays, League cards

### Protected pages (artist, fan, dev, investor, admin, archivist)
- Role-gated via `useRole()` + `<NoAccess>`
- Content-rich: stat cards, tables, forms, charts
- Use the wireframe `navBar` to build the left navigation for each portal
- Cross-link to related pages per the wireframe `navLinks`

### Investor pages (BEHIND LOGIN)
- These pages CAN show investor-specific content (pool model, KPI tranches, cap table, etc.)
- But ONLY when role = "investor" or "admin"
- The public Hub must NOT link to or show any investor info

## PAGE-BY-PAGE CONTENT GUIDE

### Hub (`/`) — PUBLIC
- Hero: "Reggae As A Service" + "Own your music. Own your fans. Own your digital domain." + tagline + 2 CTAs
- 3 stats: Free to Start ($0), From ($15/mo), You Keep (78%)
- 4 leagues: Free, Supporter, Custom, Enterprise (with gate + price)
- 8-layer stack: name + status badge only (Live / Building / Coming)
- CTA: "See the live artist sites →"

### ADTL Marketplace (`/marketplace`) — PUBLIC
- Artist tiles: name, domain, brand extension, Y1 revenue, status badge
- Pipeline section: incomplete artist names
- Stats: Live count, Pipeline count

### Artist Territory Public (`/artist/[slug]`) — PUBLIC
- Artist header: name, domain, status badge
- Brand extension + Y1 revenue
- Actions: Support artist, Visit live site
- "What's included" list

### Territory Marketplace (`/territory-marketplace`) — PUBLIC
- Resell schedule (6 cells: <1yr=$50, 1yr=$1,300, 2yr=$2,600, 3yr=$3,900, 4yr=$5,200, 5yr+=$6,500)
- Decline path: "$50 to buy back your domain, or RAAS holds it"

### Artist Dashboard (`/artist`) — artist, admin, investor
- Welcome message with artist name + territory info
- Stats: monthly fee, ADTL Licence active, brand extension Y1, territory valuation
- Quick action buttons
- Sub-page grid: links to all 10 artist sub-pages
- Supporter League pricing reference (the formula + subdivision table)

### Artist Merch (`/artist/merch`) — artist, admin
- Product catalog (mock: energy drinks, T-shirts, hoodies, caps, vinyl)
- RASSPay escrow balance
- Recent transactions
- 60-day merch claim reference

### Artist Brand Extension (`/artist/brand-extension`) — artist, admin
- Current brand extension product + Y1 revenue projection
- 9-step status ladder (Proposed → Available for sale)
- Manufacturing partners: Sun Island, Rebel13, Twins of Twins (NOT Romeich Wear)

### Artist Cultural API (`/artist/cultural-api`) — artist, admin
- 6 endpoints with descriptions: /nyabinghi /dubloop /archive /riddim /voice /balance
- Pricing: vocals $9.40, loops $9.40, B2B ads variable
- Recent sales
- Revenue share: 70% artist / 30% RAAS

### Artist AI Voice (`/artist/ai-voice`) — artist, admin
- Pioneer feature: artist controls topics (allowed/blocked), pricing per generation, revenue share
- "Either you have your official AI voice generating income for you, or someone else clones your voice and you get nothing."
- Requires Tranche 2 hardware (4× RTX 4090, 96GB VRAM) — show status as pending

### Artist Community (`/artist/community`) — artist, admin
- 4 fan tiers: Roots ($5/mo), Rockers ($15/mo), Royalty ($50/mo), Rastafari ($200/mo)
- Perks per tier
- Subscriber counts + MRR
- "Artist has the say unless they gave that right away in a prior contract"

### Artist Territory Cert (`/artist/territory-cert`) — artist, admin
- ADTL Licence certificate (digital title)
- Current owner + successor (heir designation)
- Transfer terms: inheritable, sellable, or both
- "ADTL territories are heritable — artist can will the domain to whoever they choose"

### Artist Analytics (`/artist/analytics`) — artist, admin
- Audience metrics: YouTube subs, Spotify monthly listeners
- Revenue breakdown: merch, Cultural API, community, brand extension
- Territory valuation (20-year projection)
- Cohort retention

### Artist Revenue (`/artist/revenue`) — artist, admin
- RASSPay escrow balance + available balance
- RASSPay mode: escrow (default) vs direct send (optional)
- Streaming royalty splits
- Withdrawal methods
- Transaction history

### Artist RASSline (`/artist/rassline`) — artist, admin
- Release pipeline: 7 stages (Track uploaded → Metadata → Release date → Pre-save → Distribution → Fan notification → Analytics)
- Upcoming releases with progress bars
- Past releases with performance metrics

### Artist Settings (`/artist/settings`) — artist, admin
- Profile: artist name, domain, brand extension
- Audience connections: YouTube, Spotify (NOT IG/TikTok for tier gating)
- Payment methods: RASSPay, PayPal
- Notification preferences
- Price change policy note

### Fan Dashboard (`/fan`) — fan, admin
- Stats: artists supported, monthly support, lifetime support, fan rank
- AI Voice Generator CTA
- Fan rank tiers: Roots → Rockers → Royalty → Rastafari
- Artists you support (grid)
- RASSPay info (escrow vs direct send)

### Fan AI Voice Generator (`/fan/ai-voice-generator`) — fan, admin
- "Suno for Yardies" — generate personalized songs with artist's official AI voice
- Artist selector
- Topic selector (from artist's allowed list)
- Generate button ($0.50 per generation via RASSPay)
- Revenue split: artist 65% / RAAS 20% / compute 15%
- Artist's AI boundaries (allowed vs blocked topics)
- Hardware status: pending Tranche 2

### Cultural API Dev Portal (`/dev`) — b2b_dev, admin
- API key section
- Rate limits: Free (100/day), Pro ($49/mo, 10K/day), Enterprise ($499/mo, 100K/day)
- 6 endpoints with example curl commands
- Recent API calls
- Billing summary

### B2B Sonic Studio (`/dev/b2b-studio`) — b2b_dev, admin
- Service catalog: jingles ($500), voiceovers ($300), soundtracks ($2,000), sonic logos ($1,500)
- Order form
- Past orders
- Manufacturing partners

### RAAS Records Buyer (`/dev/raas-records`) — b2b_dev, admin
- Sample library by era: 60s ska → 90s dancehall → 2000s+ modern
- Pricing: Starter $49, Pro $199, Enterprise $499
- Licensing terms
- Recent purchases

### Cultural API Billing (`/dev/billing`) — b2b_dev, admin
- 3 tiers with current usage
- Monthly bill history
- Payment method: RASSPay (PayPal underlying)
- API key management

### Investor Portal (`/investor`) — investor, admin
- Pool model: 20% equity for $4M, $20M post-money, $200K per 1%
- 5 KPI tranches with equity %, cash, trigger, verification, timeline
- 6 investor protections
- Cap table: Ovando 70% + Option pool 10% + Investor 20%
- Revenue projections
- Decline path

### Investor Portfolio (`/investor/portfolio`) — investor, admin
- 23 artist sites with brand extensions + Y1 revenue
- Domain portfolio (leverage domains)
- 3 expired domains (cautionary tale)

### Investor KPI Release (`/investor/kpi-release`) — investor, admin
- 5 tranche status (Released / Pending / Locked)
- Verification checklist per tranche
- Milestone penalties (4 options)
- Capital deployment timeline

### Admin Console (`/admin`) — admin only
- System health: VPS, sites, Starlink, AI server
- Audit log entries
- Tranche deployment status
- Quick links to 8 admin sub-pages

### Admin Big RASS Data (`/admin/big-rass-data`) — admin only
- Platform-wide metrics: total artists, fans, revenue, MRR
- Conversion funnel
- Growth charts
- Top artists + territories

### Admin AI Agents (`/admin/ai-agents`) — admin only
- Active AI agents (Patois LLM, brand extension conceptor, ADTL deployer, fan engagement bot)
- GPU utilization (4× RTX 4090)
- Training jobs queue
- 10 pilot artists (5 upcoming + 5 established)

### Admin Backup Failover (`/admin/backup-failover`) — admin only
- Primary + backup server status
- Failover test history
- 3-2-1 backup strategy
- "If Jamaica should sink tomorrow, our data needs to be on servers elsewhere"

### Admin Manufacturing Partners (`/admin/manufacturing-partners`) — admin only
- 3 partners: Sun Island, Rebel13, Twins of Twins (+ generic local printery)
- Partner status, capacity, lead times
- Active orders
- 60-day merch claim

### Admin Enterprise Leads (`/admin/enterprise-leads`) — admin only
- Lead pipeline (Enterprise League: 5M+ YT AND 500K+ Spotify)
- Lead status, value proposition

### Admin Partner Onboarding (`/admin/partner-onboarding`) — admin only
- Onboarding checklist
- Pending applications
- Approved partners

### Admin Compliance (`/admin/compliance`) — admin only
- KYC/AML status
- Data protection compliance (PDPA, GDPR, no cookies, minimum data)
- Active contracts
- Compliance checklist

### Admin Audit Log (`/admin/audit-log`) — admin only
- Recent audit log entries (50 mock entries)
- Filter controls
- Security alerts
- Export options (CSV, JSON)

### Archivist Console (`/archivist`) — archivist, admin
- Archive entries count, eras covered, institutional partners
- Archive catalog table
- Heritage Archivist role reference

### Archivist Institution Portal (`/archivist/institution`) — archivist, admin
- Institution accounts (UWI, JCDC, museums)
- Plan tiers: Academic $99/mo, Cultural $499/mo, Enterprise $1,999/mo
- Archive access controls
- Licensing request queue

## MAZE AUDIT TOOL

After building all 36 pages, the `/maze` route should render the existing MindWave Maze Visualizer — a 3D Voronoi permission graph that visualizes all 36 pages and their permission relationships. This is a quality control tool, not a user-facing feature. It lets the admin walk the 3D maze as any role and see what each role can access.

## SHARED COMPONENTS TO BUILD

1. **Layout** — TopNav (logo, portal links, role switcher), Breadcrumbs, PageContainer, footer
2. **RoleSwitcher** — 7 buttons (Public, Artist, Fan, B2B Dev, Investor, Admin, Archivist), stores in localStorage
3. **Card** — titled container with optional action button
4. **StatCard** — label + value + sub + color
5. **NoAccess** — lock icon + "Your role (X) doesn't have permission to view Page Name"
6. **raasFetch** — client-side fetch wrapper that auto-attaches X-Maze-Role header

## VERIFICATION CHECKLIST

After building, verify:
- [ ] All 36 routes return HTTP 200
- [ ] Public pages (4) show NO investor financials
- [ ] Protected pages (32) show `<NoAccess>` for unauthorized roles
- [ ] Role switcher persists in localStorage across page loads
- [ ] No cookies are set (check: `curl -D - http://localhost:3000/ | grep -i set-cookie` returns nothing)
- [ ] `?role=admin` query param does NOT bypass auth (curl `/api/pages/admin_console?role=admin` returns 403)
- [ ] `X-Maze-Role: admin` header DOES work (curl `-H "X-Maze-Role: admin" /api/pages/admin_console` returns 200)
- [ ] Breadcrumbs work on every page
- [ ] TopNav highlights the current section
- [ ] Hub landing answers "what/who/next" in 5 seconds with no internal metrics

## TECH STACK

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS (or inline styles — the current codebase uses inline styles for simplicity)
- shadcn/ui components (already installed: button, card, table, dialog, tabs, etc.)
- No external auth provider (localStorage + header only for Phase 1)
- Prisma ORM (schema exists but not wired up — use mock data for now)

## FINAL RULES

1. **Follow the wireframe exactly** — 36 pages, no more, no less. Use the page IDs as route slugs.
2. **No investor info on public pages** — if a first-time visitor wouldn't care, don't show it.
3. **No cookies** — localStorage + X-Maze-Role header only.
4. **No `?role=` query param** — this was a critical security bypass. Never re-add.
5. **Role-gate every protected page** — use `useRole()` + `<NoAccess>`.
6. **Use the Maze** — the wireframe + permission tuples define what each role can see. Respect them.
7. **Keep text minimal** — SaaS landing page best practices: 5th-7th grade reading level, scannable, one CTA per section.
8. **"Own your digital domain"** — not "territory" (founder corrected this).
9. **"Amazon for riddim"** — not "AWS for riddim" (founder corrected this).
10. **Tagline:** "PayPal for reggae · Starlink for culture · Amazon for riddim"
