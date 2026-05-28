/**
 * Vercel Build Output API v3
 *
 * This script runs after `vite build` and converts the standard Vite output
 * (dist/client + dist/server) into the .vercel/output/ structure that Vercel
 * auto-detects and deploys correctly.
 *
 * Why: This TanStack Start version uses native Vite environments (no Nitro),
 * so NITRO_PRESET has no effect. We generate the output structure ourselves.
 */

import { execSync } from "child_process";
import { cpSync, mkdirSync, writeFileSync, rmSync } from "fs";

// 1. Clean previous output
rmSync(".vercel/output", { recursive: true, force: true });

// 2. Run the standard Vite build
execSync("npx vite build", { stdio: "inherit" });

// 3. Set up .vercel/output directory tree
const staticDir = ".vercel/output/static";
const funcDir = ".vercel/output/functions/ssr.func";

mkdirSync(staticDir, { recursive: true });
mkdirSync(funcDir, { recursive: true });

// 4. Copy client (static) assets — served directly by Vercel CDN
cpSync("dist/client", staticDir, { recursive: true });

// 5. Copy server bundle into the function directory
cpSync("dist/server", `${funcDir}/server`, { recursive: true });

// 6. Function entry point — converts Node.js HTTP req/res to Web Fetch API
//    Vercel Node.js runtime expects (req, res) handler, not Web Fetch API.
writeFileSync(
  `${funcDir}/index.mjs`,
  `import server from "./server/server.js";

export default async function handler(req, res) {
  const proto = req.headers["x-forwarded-proto"] ?? "https";
  const host = req.headers["x-forwarded-host"] ?? req.headers["host"] ?? "localhost";
  const url = new URL(req.url ?? "/", proto + "://" + host);

  // Buffer request body for non-GET/HEAD
  let body = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buf = Buffer.concat(chunks);
    if (buf.length > 0) body = buf;
  }

  const headers = {};
  for (const [k, v] of Object.entries(req.headers)) {
    if (v != null) headers[k] = Array.isArray(v) ? v.join(", ") : v;
  }

  const request = new Request(url, { method: req.method, headers, body });
  const response = await server.fetch(request, {}, {});

  res.statusCode = response.status;
  for (const [key, value] of response.headers) {
    res.setHeader(key, value);
  }
  const bytes = await response.arrayBuffer();
  res.end(Buffer.from(bytes));
}
`
);

// 7. Function runtime config (Node.js 22, Web Fetch API format)
writeFileSync(
  `${funcDir}/.vc-config.json`,
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      shouldAddHelpers: false,
    },
    null,
    2
  )
);

// 8. Routing config:
//    - First try to serve static files (filesystem)
//    - Everything else goes to the SSR function
writeFileSync(
  ".vercel/output/config.json",
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/ssr" },
      ],
    },
    null,
    2
  )
);

console.log("✓ .vercel/output generated — ready for Vercel deployment");
