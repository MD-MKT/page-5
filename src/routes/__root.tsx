import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Build a high-converting landing page for Smash Padel USA, promoting a $10 intro offer for a 60-minute beginner session." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Build a high-converting landing page for Smash Padel USA, promoting a $10 intro offer for a 60-minute beginner session." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "Build a high-converting landing page for Smash Padel USA, promoting a $10 intro offer for a 60-minute beginner session." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/SkYqRBylH6fPXPX8zvN4RgArkPh1/social-images/social-1778963719085-Screenshot_2026-05-16_at_10.35.03_pm.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/SkYqRBylH6fPXPX8zvN4RgArkPh1/social-images/social-1778963719085-Screenshot_2026-05-16_at_10.35.03_pm.webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Meta Pixel + Clarity load after the first page load to keep LCP lighter. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.fbq = window.fbq || function(){(window.fbq.q = window.fbq.q || []).push(arguments)};
              window._fbq = window._fbq || window.fbq;
              window.clarity = window.clarity || function(){(window.clarity.q = window.clarity.q || []).push(arguments)};

              (function(){
                var loaded = false;
                function loadMarketingScripts(){
                  if (loaded) return;
                  loaded = true;

                  if (!window.fbq.loaded) {
                    window.fbq.version = '2.0';
                    window.fbq.queue = window.fbq.q || [];
                    var pixelScript = document.createElement('script');
                    pixelScript.async = true;
                    pixelScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
                    var firstScript = document.getElementsByTagName('script')[0];
                    firstScript.parentNode.insertBefore(pixelScript, firstScript);
                  }
                  fbq('init', '1027467436504963');
                  fbq('track', 'PageView');

                  (function(c,l,a,r,i,t,y){
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "wyt0yeet53");
                }

                if ('requestIdleCallback' in window) {
                  window.addEventListener('load', function(){
                    window.requestIdleCallback(loadMarketingScripts, { timeout: 2500 });
                  }, { once: true });
                } else {
                  window.addEventListener('load', function(){
                    window.setTimeout(loadMarketingScripts, 1600);
                  }, { once: true });
                }
              })();
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1027467436504963&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
