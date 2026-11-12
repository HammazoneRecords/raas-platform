// RAAS surface + button audit
const { execSync } = require("child_process");
const BASE = "http://localhost:3000";

// Pull pages from wireframe via a quick TS strip using next's tsx? Use bun.
const code = `
const { PAGES, ROLE_ORDER } = require("./src/lib/raas/wireframe.ts");
console.log(JSON.stringify(PAGES.map(p => ({id:p.id, route:p.route, portal:p.portal, navBar:p.navBar}))));
`;
require("fs").writeFileSync("/tmp/wf.js", code);
const wf = JSON.parse(execSync("bun -e \"const {PAGES}=require('./src/lib/raas/wireframe.ts');console.log(JSON.stringify(PAGES.map(p=>({id:p.id,route:p.route,portal:p.portal,navBar:p.navBar}))))\"", { cwd: "/home/z/my-project" }).toString());

const ROUTES = new Set(wf.map((p) => p.route).concat(["/maze", "/login", "/signup"]));

function curl(path, role) {
  const headers = role ? `-H "X-Maze-Role: ${role}"` : "";
  try {
    return execSync(`curl -s -o /dev/null -w "%{http_code}" ${headers} "${BASE}${path}"`, { timeout: 20000 }).toString();
  } catch (e) { return "ERR"; }
}

let pass = 0, fail = 0;
const lines = [];
for (const p of wf) {
  const role = p.portal === "public" ? null : p.portal;
  const code = curl(p.route, role);
  const ok = code === "200";
  ok ? pass++ : fail++;
  lines.push(`${ok ? "OK " : "FAIL"} [${p.portal}] ${p.id.padEnd(34)} ${p.route.padEnd(38)} ${code}`);
  // navBar entries must resolve to known pages
  for (const nb of p.navBar) {
    const target = wf.find((x) => x.id === nb);
    if (!target) { lines.push(`FAIL navBar of ${p.id} references unknown page ${nb}`); fail++; }
  }
}
// extra routes
for (const r of ["/maze", "/login", "/signup"]) {
  const code = curl(r, null);
  code === "200" ? pass++ : fail++;
  lines.push(`${code === "200" ? "OK " : "FAIL"} [extra] ${r.padEnd(72)} ${code}`);
}
// API routes
const apis = ["/api/auth/login", "/api/auth/signup", "/api/auth/logout", "/api/auth/me", "/api/seed"];
for (const a of apis) {
  const code = curl(a, "admin");
  const ok = ["200", "405"].includes(code);
  ok ? pass++ : fail++;
  lines.push(`${ok ? "OK " : "FAIL"} [api] ${a.padEnd(72)} ${code}`);
}
// page-permission API check: admin page with wrong role → 403
const bypass = JSON.parse(execSync(`curl -s "${BASE}/api/pages/admin_deliverables?role=admin"`).toString());
lines.push(`${bypass.allowed === false ? "OK " : "FAIL"} [api] admin_deliverables?role= bypass blocked (allowed=${bypass.allowed})`);
bypass.allowed === false ? pass++ : fail++;
const legit = JSON.parse(execSync(`curl -s -H "X-Maze-Role: admin" "${BASE}/api/pages/admin_deliverables"`).toString());
lines.push(`${legit.allowed === true ? "OK " : "FAIL"} [api] admin_deliverables with header admin (allowed=${legit.allowed})`);
legit.allowed === true ? pass++ : fail++;
const fanBlocked = JSON.parse(execSync(`curl -s -H "X-Maze-Role: fan" "${BASE}/api/pages/admin_deliverables"`).toString());
lines.push(`${fanBlocked.allowed === false ? "OK " : "FAIL"} [api] fan blocked from admin_deliverables (allowed=${fanBlocked.allowed})`);
fanBlocked.allowed === false ? pass++ : fail--;

// href audit handled by scripts/audit_links.js (shell quoting)
console.log(lines.join("\n"));
console.log(`\nPages/API: ${pass} pass, ${fail} fail | wireframe pages: ${wf.length}`);
