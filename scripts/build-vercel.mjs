/**
 * Vercel Build Output API v3
 *
 * This script builds the app and converts the output into the .vercel/output/
 * structure that Vercel auto-detects and deploys correctly.
 *
 * Why: This TanStack Start version uses native Vite environments (not Nitro).
 * The server bundle has unbundled external imports (h3-v2, @tanstack/*, etc.)
 * that won't exist in Vercel's function environment. We use esbuild to create
 * a fully self-contained bundle with all dependencies inlined.
 */

import { execSync } from "child_process";
import { cpSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { build as esbuild } from "esbuild";

// 1. Clean previous output
rmSync(".vercel/output", { recursive: true, force: true });

// 2. Run the standard Vite build
execSync("npx vite build", { stdio: "inherit" });

// 3. Set up .vercel/output directory tree
const staticDir = ".vercel/output/static";
const funcDir = ".vercel/output/functions/index.func";

mkdirSync(staticDir, { recursive: true });
mkdirSync(funcDir, { recursive: true });

// 4. Copy client (static) assets — served directly by Vercel CDN
cpSync("dist/client", staticDir, { recursive: true });

// 5. Write the function entry point (Node.js HTTP handler)
writeFileSync(
  `${funcDir}/entry.mjs`,
  `import server from "./server/server.js";

export default async function handler(req, res) {
  const proto = req.headers["x-forwarded-proto"] ?? "https";
  const host = req.headers["x-forwarded-host"] ?? req.headers["host"] ?? "localhost";
  const url = new URL(req.url ?? "/", proto + "://" + host);

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

// Copy dist/server so entry.mjs can resolve its relative imports before bundling
cpSync("dist/server", `${funcDir}/server`, { recursive: true });

// 6. Bundle entry + ALL npm dependencies (h3-v2, @tanstack/*, react, etc.)
//    into a single self-contained file. Only Node.js built-ins stay external.
console.log("Bundling server function with esbuild...");
await esbuild({
  entryPoints: [`${funcDir}/entry.mjs`],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outfile: `${funcDir}/index.mjs`,
  // Node.js built-ins stay external (always available at runtime)
  external: ["node:*"],
  // react-dom/cjs and other CommonJS packages use require() internally.
  // When bundled into ESM, dynamic require() fails unless we provide a shim.
  banner: {
    js: `import { createRequire } from "module";\nconst require = createRequire(import.meta.url);`,
  },
  allowOverwrite: true,
  logLevel: "warning",
});

// 7. Function runtime config
writeFileSync(
  `${funcDir}/.vc-config.json`,
  JSON.stringify(
    {
      runtime: "nodejs20.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      shouldAddHelpers: false,
    },
    null,
    2
  )
);

// 8. Routing config:
//    - Explicitly serve video/media with correct MIME + accept-ranges before filesystem check
//      (prevents the SSR catch-all from intercepting video requests)
//    - Serve all other static assets via filesystem handler
//    - Only then fall through to the SSR function
writeFileSync(
  ".vercel/output/config.json",
  JSON.stringify(
    {
      version: 3,
      routes: [
        // Explicit video route: set correct headers and let filesystem serve the file
        {
          src: "/(.+\\.mp4)",
          headers: {
            "content-type": "video/mp4",
            "accept-ranges": "bytes",
            "cache-control": "public, max-age=31536000, immutable",
          },
          continue: true,
        },
        {
          src: "/(.+\\.webm)",
          headers: {
            "content-type": "video/webm",
            "accept-ranges": "bytes",
            "cache-control": "public, max-age=31536000, immutable",
          },
          continue: true,
        },
        // Serve all other static files (JS, CSS, images, etc.)
        { handle: "filesystem" },
        // Everything else → SSR function
        { src: "/(.*)", dest: "/" },
      ],
    },
    null,
    2
  )
);

console.log("✓ .vercel/output generated — ready for Vercel deployment");
