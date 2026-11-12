// Link resolution part of the audit (kept separate for shell quoting safety)
const { execSync } = require("child_process");
const CWD = "/home/z/my-project";
const BASE = "http://localhost:3000";

const wf = JSON.parse(execSync(
  `bun -e "const {PAGES}=require('./src/lib/raas/wireframe.ts');console.log(JSON.stringify(PAGES.map(p=>({id:p.id,route:p.route}))))"`,
  { cwd: CWD }
).toString());

const ROUTES = new Set(wf.map((p) => p.route).concat(["/maze", "/login", "/signup"]));

const cmd = "grep -rhoE \"href=['\\\"][^'\\\"]+['\\\"]\" src/app --include='*.tsx' | sed -E \"s/^href=['\\\"]//; s/['\\\"]$//\"";
const hrefs = execSync(cmd, { cwd: CWD, shell: "/bin/bash" }).toString().split("\n").filter(Boolean);
const uniq = [...new Set(hrefs)];

let pass = 0;
const fails = [];
for (const h of uniq) {
  if (/^(https?:|#|mailto:)/.test(h)) { pass++; continue; }
  const clean = h.split("?")[0];
  if (ROUTES.has(clean) || clean.includes("[")) { pass++; continue; }
  // dynamic artist pages
  if (/^\/artist\/[a-z0-9-]+$/.test(clean)) { pass++; continue; }
  fails.push(h);
}
console.log(`Links: ${pass}/${uniq.length} resolve`);
fails.forEach((f) => console.log("  MISSING TARGET:", f));
