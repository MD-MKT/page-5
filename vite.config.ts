// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// This project supports TWO deployment targets:
//   1. Lovable Publish  -> runs on Cloudflare Workers (default build, cloudflare plugin ON).
//   2. Vercel           -> uses the vercel preset (scripts/build-vercel.mjs).
//
// Vercel automatically sets the VERCEL=1 env var during its build. We detect it and
// switch to the Vercel preset (disabling the Cloudflare build) only in that case.
// On Lovable's publish pipeline VERCEL is unset, so the Cloudflare build is used and
// all server deps (h3-v2, @tanstack/*, etc.) get bundled correctly.
const isVercelBuild = process.env.VERCEL === "1";

if (isVercelBuild) {
  process.env.SERVER_PRESET = "vercel";
  process.env.NITRO_PRESET = "vercel";
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
export default defineConfig({
  cloudflare: isVercelBuild ? false : undefined,
  tanstackStart: {
    server: isVercelBuild
      ? { preset: "vercel", entry: "server" }
      : { entry: "server" },
  },
});
