// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// This app is deployed exclusively on Vercel.
// NITRO_PRESET must also be set as a Build Environment Variable in the Vercel dashboard
// (Settings → Environment Variables → Build) to guarantee Nitro picks it up before any
// subprocess spawns. The assignments below act as an in-process fallback.
process.env.SERVER_PRESET = "vercel";
process.env.NITRO_PRESET = "vercel";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// Cloudflare plugin is disabled — this project targets Vercel only.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { preset: "vercel", entry: "server" },
  },
});
