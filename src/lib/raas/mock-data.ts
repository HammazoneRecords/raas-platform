// RAAS mock data — used by every page. No DB needed for Phase 1.

import type { RoleId } from "./wireframe";

// ---------------------------------------------------------------------------
// PUBLIC MARKETPLACE — live artist sites (visible to everyone)
// NOTE: We expose ONLY what a first-time visitor cares about — name, domain,
// brand extension, Y1 revenue (only if "available"), status. No investor %
// or cap table here.
// ---------------------------------------------------------------------------

export interface ArtistTerritory {
  slug: string;
  name: string;
  domain: string;
  brandExtension: string;
  y1Revenue?: number; // only shown when "available"
  status: "Live" | "Expired" | "Incomplete";
  league: "Free" | "Supporter" | "Custom" | "Enterprise";
  monthlyFee: number;
}

export const ARTISTS: ArtistTerritory[] = [
  { slug: "kabaka-pyramid", name: "Kabaka Pyramid", domain: "kabaka.ja", brandExtension: "Energy Drink", y1Revenue: 84000, status: "Live", league: "Supporter", monthlyFee: 99 },
  { slug: "protoge", name: "Protoje", domain: "protoje.ja", brandExtension: "Vinyl Series", y1Revenue: 142000, status: "Live", league: "Custom", monthlyFee: 249 },
  { slug: "chronixx", name: "Chronixx", domain: "chronixx.ja", brandExtension: "Tee Line", y1Revenue: 67000, status: "Live", league: "Supporter", monthlyFee: 99 },
  { slug: "lashana", name: "Lashana", domain: "lashana.ja", brandExtension: "Hoodie Drop", status: "Live", league: "Free", monthlyFee: 0 },
  { slug: "jemerhc", name: "Jemerhc", domain: "jemerhc.ja", brandExtension: "Hat Series", status: "Live", league: "Free", monthlyFee: 0 },
  { slug: "sean-khari", name: "Sean Khari", domain: "seankhari.ja", brandExtension: "Energy Drink", y1Revenue: 28000, status: "Live", league: "Supporter", monthlyFee: 99 },
  { slug: "rebel-roots", name: "Rebel Roots", domain: "rebelroots.ja", brandExtension: "Vinyl Box Set", y1Revenue: 195000, status: "Live", league: "Enterprise", monthlyFee: 999 },
  { slug: "mavado-jr", name: "Mavado Jr.", domain: "mavadojr.ja", brandExtension: "Hoodie Drop", y1Revenue: 51000, status: "Live", league: "Supporter", monthlyFee: 99 },
];

export const PIPELINE_ARTISTS: { slug: string; name: string; progress: number }[] = [
  { slug: "tarrus-riley-jr", name: "Tarrus Riley Jr.", progress: 60 },
  { slug: "queen-ifrica-ii", name: "Queen Ifrica II", progress: 30 },
  { slug: "judy-mowatt-iii", name: "Judy Mowatt III", progress: 10 },
];

export function artistBySlug(slug: string): ArtistTerritory | undefined {
  return ARTISTS.find((a) => a.slug === slug);
}

// ---------------------------------------------------------------------------
// LEAGUE TIERS (public — shown on Hub)
// ---------------------------------------------------------------------------

export interface LeagueTier {
  name: "Free" | "Supporter" | "Custom" | "Enterprise";
  price: string;
  gate: string;
  color: string;
}

export const LEAGUES: LeagueTier[] = [
  { name: "Free", price: "$0", gate: "Under 500 YT or 50 Spotify", color: "#94A3B8" },
  { name: "Supporter", price: "$15–99/mo", gate: "Growing audience", color: "#22C55E" },
  { name: "Custom", price: "Custom", gate: "Mid-tier artists", color: "#06B6D4" },
  { name: "Enterprise", price: "$999/mo+", gate: "5M+ YT AND 500K+ Spotify", color: "#fbbf24" },
];

// ---------------------------------------------------------------------------
// 8-LAYER STACK
// ---------------------------------------------------------------------------

export interface Layer {
  n: number;
  name: string;
  status: "Live" | "Building" | "Coming";
  desc: string;
}

export const LAYERS: Layer[] = [
  { n: 1, name: "Artist Sites", status: "Live", desc: "Your domain, storefront, fan data." },
  { n: 2, name: "Cultural API", status: "Live", desc: "Six endpoints: nyabinghi, dubloop, archive, riddim, voice, balance." },
  { n: 3, name: "Community", status: "Live", desc: "Four tiers — Roots → Rastafari." },
  { n: 4, name: "Archive", status: "Building", desc: "Reggae heritage SaaS for institutions." },
  { n: 5, name: "Sonic Studio", status: "Building", desc: "Jingles, voiceovers, soundtracks, sonic logos." },
  { n: 6, name: "Records", status: "Building", desc: "Sample library by era — ska to modern." },
  { n: 7, name: "AI", status: "Building", desc: "Official artist voices, Patois LLM. Tranche 2." },
  { n: 8, name: "Cloud", status: "Coming", desc: "Backup failover, 3-2-1 strategy." },
];

// ---------------------------------------------------------------------------
// TERRITORY MARKETPLACE — resell schedule (public)
// ---------------------------------------------------------------------------

export const RESELL_SCHEDULE = [
  { held: "< 1 year", price: 50 },
  { held: "1 year", price: 1300 },
  { held: "2 years", price: 2600 },
  { held: "3 years", price: 3900 },
  { held: "4 years", price: 5200 },
  { held: "5 years+", price: 6500 },
];

// ---------------------------------------------------------------------------
// SUPPORTER LEAGUE — pricing reference (Artist Dashboard)
// ---------------------------------------------------------------------------

export const SUPPORTER_LEAGUE_FORMULA =
  "Tier = $0.005 × max(YouTube subs, Spotify monthly listeners) × brand-extension multiplier (1.0–2.5)";

export const SUPPORTER_LEAGUE_TABLE = [
  { subs: "1K", price: "$5/mo" },
  { subs: "3K", price: "$15/mo" },
  { subs: "10K", price: "$50/mo" },
  { subs: "40K", price: "$200/mo" },
  { subs: "100K", price: "$500/mo" },
  { subs: "1M+", price: "$2,500/mo" },
];

// ---------------------------------------------------------------------------
// CULTURAL API — 6 endpoints
// ---------------------------------------------------------------------------

export interface CulturalEndpoint {
  path: string;
  name: string;
  desc: string;
  price: string;
}

export const CULTURAL_ENDPOINTS: CulturalEndpoint[] = [
  { path: "/v1/nyabinghi", name: "Nyabinghi", desc: "Sacred drum patterns, devotional chants.", price: "$9.40 / call" },
  { path: "/v1/dubloop", name: "Dub Loop", desc: "Loopable bass + drum patterns from 70s dub.", price: "$9.40 / call" },
  { path: "/v1/archive", name: "Archive", desc: "Historic reggae recordings, era-tagged.", price: "$9.40 / call" },
  { path: "/v1/riddim", name: "Riddim", desc: "Versioned riddim tracks (Sleng Teng, Pocomania, etc).", price: "$9.40 / call" },
  { path: "/v1/voice", name: "Voice", desc: "Official artist voice generations.", price: "variable" },
  { path: "/v1/balance", name: "Balance", desc: "Check your RASSPay balance + escrow.", price: "free" },
];

export const CULTURAL_API_REVENUE_SHARE = { artist: 70, raas: 30 };

export const CULTURAL_API_RECENT_SALES = [
  { endpoint: "/v1/dubloop", buyer: "studio23", amount: 9.4, ts: "2h ago" },
  { endpoint: "/v1/riddim", buyer: "kingstonfm", amount: 9.4, ts: "5h ago" },
  { endpoint: "/v1/voice", buyer: "fan_8821", amount: 0.5, ts: "8h ago" },
  { endpoint: "/v1/nyabinghi", buyer: "uwimusic", amount: 9.4, ts: "1d ago" },
  { endpoint: "/v1/archive", buyer: "jcdc", amount: 9.4, ts: "2d ago" },
];

// ---------------------------------------------------------------------------
// API RATE LIMIT TIERS (B2B Dev Portal + Billing)
// ---------------------------------------------------------------------------

export interface ApiTier {
  name: string;
  price: string;
  callsPerDay: string;
  color: string;
}

export const API_TIERS: ApiTier[] = [
  { name: "Free", price: "$0", callsPerDay: "100 / day", color: "#94A3B8" },
  { name: "Pro", price: "$49/mo", callsPerDay: "10K / day", color: "#06B6D4" },
  { name: "Enterprise", price: "$499/mo", callsPerDay: "100K / day", color: "#fbbf24" },
];

// ---------------------------------------------------------------------------
// FAN TIERS (Artist Community)
// ---------------------------------------------------------------------------

export interface FanTier {
  name: string;
  price: string;
  color: string;
  perks: string[];
  subs: number;
}

export const FAN_TIERS: FanTier[] = [
  {
    name: "Roots",
    price: "$5/mo",
    color: "#94A3B8",
    subs: 412,
    perks: ["Discord access", "Early release alerts", "Monthly livestream"],
  },
  {
    name: "Rockers",
    price: "$15/mo",
    color: "#22C55E",
    subs: 188,
    perks: ["Everything in Roots", "Merch discount (10%)", "Exclusive dub mixes"],
  },
  {
    name: "Royalty",
    price: "$50/mo",
    color: "#fbbf24",
    subs: 54,
    perks: ["Everything in Rockers", "Monthly 1-on-1 AMA", "Signed vinyl"],
  },
  {
    name: "Rastafari",
    price: "$200/mo",
    color: "#A855F7",
    subs: 11,
    perks: ["Everything in Royalty", "Producer credit on one track / yr", "Annual yard visit"],
  },
];

// ---------------------------------------------------------------------------
// BRAND EXTENSION — 9-step status ladder
// ---------------------------------------------------------------------------

export const BRAND_LADDER = [
  "Proposed",
  "Concept approved",
  "Partner matched",
  "Sample produced",
  "Sample approved",
  "Production run scheduled",
  "In production",
  "Shipped to warehouse",
  "Available for sale",
];

// ---------------------------------------------------------------------------
// MANUFACTURING PARTNERS (NOT Romeich Wear — explicit per spec)
// ---------------------------------------------------------------------------

export interface Manufacturer {
  name: string;
  specialty: string;
  status: "Active" | "Onboarding" | "Pending";
  capacity: string;
  leadTime: string;
  activeOrders: number;
}

export const MANUFACTURERS: Manufacturer[] = [
  { name: "Sun Island", specialty: "Beverages / energy drinks", status: "Active", capacity: "10K units / mo", leadTime: "21 days", activeOrders: 3 },
  { name: "Rebel13", specialty: "Apparel / tees / hoodies", status: "Active", capacity: "5K units / mo", leadTime: "14 days", activeOrders: 7 },
  { name: "Twins of Twins", specialty: "Caps / headwear", status: "Active", capacity: "3K units / mo", leadTime: "10 days", activeOrders: 2 },
  { name: "Kingston Printery", specialty: "Generic local printery", status: "Pending", capacity: "TBD", leadTime: "TBD", activeOrders: 0 },
];

// ---------------------------------------------------------------------------
// RASSPay
// ---------------------------------------------------------------------------

export const RASSPAY_MODES = ["escrow (default)", "direct send (optional)"] as const;

export const RECENT_TRANSACTIONS = [
  { id: "TX-8821", type: "Merch sale", amount: 42.0, ts: "2h ago", status: "escrow" },
  { id: "TX-8820", type: "API revenue", amount: 9.4, ts: "5h ago", status: "released" },
  { id: "TX-8819", type: "Fan tier — Rockers", amount: 15.0, ts: "6h ago", status: "released" },
  { id: "TX-8818", type: "AI Voice gen", amount: 0.5, ts: "8h ago", status: "released" },
  { id: "TX-8817", type: "Merch sale", amount: 84.0, ts: "1d ago", status: "released" },
];

// ---------------------------------------------------------------------------
// MERCH CATALOG
// ---------------------------------------------------------------------------

export const MERCH_CATALOG = [
  { sku: "ED-001", name: "Energy Drink (12-pack)", price: 36, stock: 240, partner: "Sun Island" },
  { sku: "TS-001", name: "Logo Tee — Black", price: 28, stock: 180, partner: "Rebel13" },
  { sku: "HD-001", name: "Tour Hoodie", price: 64, stock: 60, partner: "Rebel13" },
  { sku: "CP-001", name: "Embroidered Cap", price: 22, stock: 120, partner: "Twins of Twins" },
  { sku: "VL-001", name: "Vinyl Box Set", price: 89, stock: 18, partner: "Rebel13" },
];

// ---------------------------------------------------------------------------
// RASSline — release pipeline (7 stages)
// ---------------------------------------------------------------------------

export const RASSLINE_STAGES = [
  "Track uploaded",
  "Metadata",
  "Release date",
  "Pre-save",
  "Distribution",
  "Fan notification",
  "Analytics",
];

export const UPCOMING_RELEASES = [
  { title: "BabylonFall", stage: 4, releaseDate: "2026-12-01", presaves: 1284 },
  { title: "RootsRevival", stage: 2, releaseDate: "2027-01-15", presaves: 0 },
  { title: "YaadLife EP", stage: 5, releaseDate: "2026-11-25", presaves: 2104 },
];

// ---------------------------------------------------------------------------
// AI VOICE (artist + fan)
// ---------------------------------------------------------------------------

export const AI_VOICE_TOPICS_ALLOWED = [
  "love & unity",
  "yaad life",
  "rastafari",
  "social justice",
  "celebration",
];

export const AI_VOICE_TOPICS_BLOCKED = [
  "violence",
  "explicit sexual content",
  "political endorsement",
  "disrespect to elders",
];

export const AI_VOICE_REVENUE_SPLIT_FAN = { artist: 65, raas: 20, compute: 15 };
export const AI_VOICE_REVENUE_SPLIT_ARTIST = { artist: 70, raas: 30 };

export const AI_VOICE_PRICE_PER_GEN = 0.5; // fan side

export const HARDWARE_STATUS = {
  ready: false,
  name: "Tranche 2",
  spec: "4× RTX 4090, 96GB VRAM",
  note: "Pending delivery. AI Voice generations will queue.",
};

// ---------------------------------------------------------------------------
// DEV PORTAL
// ---------------------------------------------------------------------------

export const API_KEYS = [
  { label: "Production", key: "raas_live_8f3a...c21", created: "2026-09-01", lastUsed: "2m ago" },
  { label: "Staging", key: "raas_stg_99b1...e07", created: "2026-10-12", lastUsed: "3d ago" },
];

export const RECENT_API_CALLS = [
  { endpoint: "/v1/dubloop", status: 200, latency: 142, ts: "30s ago" },
  { endpoint: "/v1/riddim", status: 200, latency: 98, ts: "2m ago" },
  { endpoint: "/v1/voice", status: 429, latency: 12, ts: "5m ago" },
  { endpoint: "/v1/archive", status: 200, latency: 211, ts: "8m ago" },
  { endpoint: "/v1/balance", status: 200, latency: 33, ts: "12m ago" },
];

export const BILL_HISTORY = [
  { month: "Oct 2026", calls: 8421, amount: 49 },
  { month: "Sep 2026", calls: 9120, amount: 49 },
  { month: "Aug 2026", calls: 4218, amount: 49 },
  { month: "Jul 2026", calls: 1384, amount: 0 },
];

// ---------------------------------------------------------------------------
// B2B SONIC STUDIO — service catalog
// ---------------------------------------------------------------------------

export const SONIC_SERVICES = [
  { name: "Jingle", price: 500, desc: "10–30s brand sonic", days: 5 },
  { name: "Voiceover", price: 300, desc: "Up to 60s narrated", days: 3 },
  { name: "Soundtrack", price: 2000, desc: "Custom 2–5min score", days: 14 },
  { name: "Sonic Logo", price: 1500, desc: "1–3s signature sound", days: 7 },
];

export const PAST_SONIC_ORDERS = [
  { id: "SO-0421", client: "Tourism Jamaica", service: "Sonic Logo", amount: 1500, status: "delivered" },
  { id: "SO-0420", client: "Red Stripe", service: "Jingle", amount: 500, status: "delivered" },
  { id: "SO-0419", client: "UWI Radio", service: "Voiceover", amount: 300, status: "in production" },
];

// ---------------------------------------------------------------------------
// RAAS RECORDS — sample library by era
// ---------------------------------------------------------------------------

export const SAMPLE_ERAS = [
  { era: "60s ska", tracks: 142, color: "#fbbf24" },
  { era: "70s roots reggae", tracks: 384, color: "#22C55E" },
  { era: "80s dancehall", tracks: 271, color: "#06B6D4" },
  { era: "90s dancehall", tracks: 318, color: "#A855F7" },
  { era: "2000s+ modern", tracks: 256, color: "#EC4899" },
];

export const RAAS_RECORDS_TIERS = [
  { name: "Starter", price: 49, limit: "100 samples / mo" },
  { name: "Pro", price: 199, limit: "1,000 samples / mo" },
  { name: "Enterprise", price: 499, limit: "Unlimited + stems" },
];

// ---------------------------------------------------------------------------
// INVESTOR PORTAL — behind login only
// ---------------------------------------------------------------------------

export const INVESTOR_POOL_MODEL = {
  equityOffered: "20%",
  raiseTarget: "$4M",
  postMoney: "$20M",
  perOnePct: "$200K",
};

export const KPI_TRANCHE_TABLE = [
  { n: 1, name: "Foundational", equityPct: "4%", cash: "$800K", trigger: "10 live artist sites", verification: "Public marketplace check", timeline: "T+0" },
  { n: 2, name: "AI Activation", equityPct: "4%", cash: "$800K", trigger: "Tranche 2 hardware live", verification: "GPU telemetry", timeline: "T+3mo" },
  { n: 3, name: "Cultural API Scale", equityPct: "4%", cash: "$800K", trigger: "1M API calls / mo", verification: "API logs", timeline: "T+6mo" },
  { n: 4, name: "Archive SaaS", equityPct: "4%", cash: "$800K", trigger: "3 institutions signed", verification: "Contract PDFs", timeline: "T+9mo" },
  { n: 5, name: "Sonic Scale", equityPct: "4%", cash: "$800K", trigger: "$500K B2B revenue / yr", verification: "Audited financials", timeline: "T+12mo" },
];

export const INVESTOR_PROTECTIONS = [
  "Liquidation preference 1× non-participating",
  "Anti-dilution weighted average broad",
  "Pro-rata rights on future raises",
  "Board observer seat",
  "Information rights — quarterly + annual",
  "Major-decision consent (sale, raise, key hires)",
];

export const CAP_TABLE = [
  { holder: "Ovando (founder)", pct: 70, color: "#fbbf24" },
  { holder: "Option pool", pct: 10, color: "#94A3B8" },
  { holder: "Investor pool", pct: 20, color: "#EF4444" },
];

export const REVENUE_PROJECTIONS = [
  { year: "Y1", revenue: 420000 },
  { year: "Y2", revenue: 1850000 },
  { year: "Y3", revenue: 5400000 },
  { year: "Y4", revenue: 12400000 },
  { year: "Y5", revenue: 28000000 },
];

export const EXPIRED_DOMAINS = [
  { domain: "testartist1.ja", reason: "Free tier, never launched", expired: "2025-08-12" },
  { domain: "trialartist2.ja", reason: "Cancelled after 30 days", expired: "2025-11-04" },
  { domain: "oldpool3.ja", reason: "Artist left platform", expired: "2026-02-21" },
];

// Investor portfolio — 23 artist sites (compressed: 8 shown with details + 15 in summary list)
export const PORTFOLIO_POOL = [
  ...ARTISTS.map((a) => ({ slug: a.slug, name: a.name, domain: a.domain, brandExtension: a.brandExtension, y1Revenue: a.y1Revenue ?? 0, status: a.status })),
  { slug: "portmore-ras", name: "Portmore Ras", domain: "portmoreras.ja", brandExtension: "Tee Line", y1Revenue: 38000, status: "Live" },
  { slug: "spice-hill", name: "Spice Hill", domain: "spicehill.ja", brandExtension: "Hat Series", y1Revenue: 21000, status: "Live" },
  { slug: "montego-vibes", name: "Montego Vibes", domain: "montegovibes.ja", brandExtension: "Energy Drink", y1Revenue: 61000, status: "Live" },
  { slug: "kingston-bloc", name: "Kingston Bloc", domain: "kingstonbloc.ja", brandExtension: "Hoodie Drop", y1Revenue: 47000, status: "Live" },
  { slug: "spanish-tiger", name: "Spanish Tiger", domain: "spanishtiger.ja", brandExtension: "Vinyl Series", y1Revenue: 89000, status: "Live" },
  { slug: "blue-mountain", name: "Blue Mountain", domain: "bluemountain.ja", brandExtension: "Energy Drink", y1Revenue: 35000, status: "Live" },
  { slug: "port-royal", name: "Port Royal", domain: "portroyal.ja", brandExtension: "Vinyl Box Set", y1Revenue: 134000, status: "Live" },
  { slug: "westmoreland-sun", name: "Westmoreland Sun", domain: "westmorelandsun.ja", brandExtension: "Tee Line", y1Revenue: 27000, status: "Live" },
  { slug: "tower-hill", name: "Tower Hill", domain: "towerhill.ja", brandExtension: "Cap Series", y1Revenue: 18000, status: "Live" },
  { slug: "ountain-yute", name: "Ountain Yute", domain: "ountainyute.ja", brandExtension: "Hoodie Drop", y1Revenue: 42000, status: "Live" },
  { slug: "maxfield-ave", name: "Maxfield Ave", domain: "maxfieldave.ja", brandExtension: "Energy Drink", y1Revenue: 56000, status: "Live" },
  { slug: "constant-spring", name: "Constant Spring", domain: "constantspring.ja", brandExtension: "Vinyl Series", y1Revenue: 98000, status: "Live" },
  { slug: "half-way-tree", name: "Half Way Tree", domain: "halfwaytree.ja", brandExtension: "Hat Series", y1Revenue: 44000, status: "Live" },
  { slug: "papine-rise", name: "Papine Rise", domain: "papinerise.ja", brandExtension: "Tee Line", y1Revenue: 31000, status: "Live" },
];

// ---------------------------------------------------------------------------
// ADMIN
// ---------------------------------------------------------------------------

export const SYSTEM_HEALTH = [
  { name: "Primary VPS", status: "ok", value: "Online · load 0.42" },
  { name: "Backup VPS", status: "ok", value: "Online · synced 4m ago" },
  { name: "Artist sites", status: "ok", value: "8 / 8 live" },
  { name: "Starlink", status: "ok", value: "Online · 187 Mbps" },
  { name: "AI server (Tranche 1)", status: "ok", value: "Online · idle" },
  { name: "AI server (Tranche 2)", status: "pending", value: "Awaiting hardware" },
];

export const PLATFORM_METRICS = {
  totalArtists: 23,
  liveArtists: 8,
  pipelineArtists: 3,
  totalFans: 665,
  monthlyRevenue: 18420,
  mrr: 14850,
  apiCallsThisMonth: 42180,
  aiVoiceGenerations: 1284,
};

export const CONVERSION_FUNNEL = [
  { stage: "Hub visits", count: 12480, pct: 100 },
  { stage: "Marketplace views", count: 6210, pct: 49.8 },
  { stage: "Artist territory views", count: 2841, pct: 22.8 },
  { stage: "Sign-up", count: 412, pct: 3.3 },
  { stage: "Active artist", count: 23, pct: 0.18 },
];

export const AI_AGENTS = [
  { name: "Patois LLM", status: "training", gpu: "RTX 4090 #1", utilization: 92 },
  { name: "Brand Extension Conceptor", status: "active", gpu: "RTX 4090 #2", utilization: 34 },
  { name: "ADTL Deployer", status: "active", gpu: "RTX 4090 #3", utilization: 12 },
  { name: "Fan Engagement Bot", status: "active", gpu: "RTX 4090 #4", utilization: 58 },
];

export const PILOT_ARTISTS = {
  upcoming: ["Lashana", "Jemerhc", "Sean Khari", "Mavado Jr.", "Rebel Roots"],
  established: ["Kabaka Pyramid", "Protoje", "Chronixx", "Tarrus Riley Jr.", "Queen Ifrica II"],
};

export const FAILOVER_TESTS = [
  { date: "2026-11-01", target: "Backup VPS", result: "Pass", rtoSec: 42 },
  { date: "2026-10-15", target: "Backup VPS", result: "Pass", rtoSec: 51 },
  { date: "2026-09-29", target: "Backup VPS", result: "Pass", rtoSec: 88 },
];

export const ENTERPRISE_LEADS = [
  { name: "Bolt Jamaica", ytSubs: "1.2M", spot: "320K", status: "Initial outreach", value: "$999/mo" },
  { name: "DancehallNL", ytSubs: "2.4M", spot: "510K", status: "Demo scheduled", value: "$999/mo" },
  { name: "ReggaeRoam", ytSubs: "780K", spot: "180K", status: "Qualified", value: "$249/mo" },
  { name: "YaadChannel", ytSubs: "5.1M", spot: "620K", status: "Contract sent", value: "$999/mo" },
];

export const COMPLIANCE_ITEMS = [
  { name: "KYC / AML", status: "current", note: "Flow live for artists + investors" },
  { name: "PDPA (Jamaica)", status: "current", note: "Minimum data, no cookies" },
  { name: "GDPR", status: "current", note: "Right to erasure in dashboard" },
  { name: "No cookies policy", status: "current", note: "Verified — localStorage + header only" },
  { name: "Active contracts", status: "current", note: "23 ADTL Licences active" },
];

export const AUDIT_LOG = Array.from({ length: 50 }).map((_, i) => {
  const actions = [
    "role.switch",
    "page.view",
    "api.call",
    "merch.claim",
    "api.key.rotate",
    "tranche.deploy",
    "fan.signup",
    "artist.publish",
    "ai.voice.gen",
    "withdrawal.request",
  ];
  const actors = ["admin@raas", "artist@kabaka", "fan_8821", "dev@studio23", "archivist@uwi", "investor@pool1"];
  const targets = [
    "page:admin_console",
    "page:artist_dashboard",
    "page:investor_portal",
    "page:cultural_api_dev_portal",
    "page:archivist_console",
    "/v1/dubloop",
    "/v1/voice",
    "TX-8821",
    "Tranche 2",
  ];
  const statuses = ["ok", "ok", "ok", "ok", "denied", "ok", "ok"];
  return {
    id: `LOG-${(1000 - i).toString().padStart(4, "0")}`,
    ts: `${i + 1}h ago`,
    actor: actors[i % actors.length],
    action: actions[i % actions.length],
    target: targets[i % targets.length],
    status: statuses[i % statuses.length],
  };
});

// ---------------------------------------------------------------------------
// ARCHIVIST
// ---------------------------------------------------------------------------

export const ARCHIVE_STATS = {
  entries: 4821,
  eras: 5,
  institutions: 3,
};

export const ARCHIVE_CATALOG = [
  { id: "ARC-0001", era: "60s ska", title: "Skatalites — original masters", type: "audio" },
  { id: "ARC-0042", era: "70s roots reggae", title: "Wailers — Kingston sessions", type: "audio" },
  { id: "ARC-0128", era: "80s dancehall", title: "Sleng Teng — riddim stem", type: "stem" },
  { id: "ARC-0304", era: "90s dancehall", title: "Buju Banton — interview", type: "interview" },
  { id: "ARC-0512", era: "2000s+ modern", title: "Protoje — lyric sheets", type: "document" },
];

export const INSTITUTIONS = [
  { name: "UWI (University of West Indies)", plan: "Academic", status: "Active" },
  { name: "JCDC (Jamaica Cultural Dev. Comm.)", plan: "Cultural", status: "Active" },
  { name: "National Museum Jamaica", plan: "Enterprise", status: "Onboarding" },
];

export const ARCHIVE_PLANS = [
  { name: "Academic", price: "$99/mo", limit: "5 concurrent researchers", color: "#06B6D4" },
  { name: "Cultural", price: "$499/mo", limit: "Unlimited + API access", color: "#A855F7" },
  { name: "Enterprise", price: "$1,999/mo", limit: "On-prem + custom ingest", color: "#fbbf24" },
];

// ---------------------------------------------------------------------------
// ARTIST ANALYTICS
// ---------------------------------------------------------------------------

export const ARTIST_AUDIENCE = {
  youtubeSubs: 184000,
  spotifyMonthlyListeners: 92000,
  instagramFollowers: 142000,
};

export const REVENUE_BREAKDOWN = [
  { source: "Merch", amount: 8420, color: "#22C55E" },
  { source: "Cultural API", amount: 3120, color: "#06B6D4" },
  { source: "Community", amount: 4810, color: "#fbbf24" },
  { source: "Brand extension", amount: 12600, color: "#EC4899" },
];

// ---------------------------------------------------------------------------
// FAN DASHBOARD
// ---------------------------------------------------------------------------

export const FAN_STATS = {
  artistsSupported: 4,
  monthlySupport: 65,
  lifetimeSupport: 1240,
  fanRank: "Royalty",
};

export const FAN_RANKS = [
  { name: "Roots", threshold: "$5/mo", color: "#94A3B8" },
  { name: "Rockers", threshold: "$15/mo", color: "#22C55E" },
  { name: "Royalty", threshold: "$50/mo", color: "#fbbf24" },
  { name: "Rastafari", threshold: "$200/mo", color: "#A855F7" },
];

export const FAN_SUPPORTED_ARTISTS = [
  { slug: "kabaka-pyramid", name: "Kabaka Pyramid", tier: "Royalty", amount: 50 },
  { slug: "protoge", name: "Protoje", tier: "Rockers", amount: 15 },
  { slug: "lashana", name: "Lashana", tier: "Roots", amount: 5 },
  { slug: "rebel-roots", name: "Rebel Roots", tier: "Roots", amount: 5 },
];
