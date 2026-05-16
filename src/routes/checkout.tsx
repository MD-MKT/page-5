import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { z } from "zod";
import { X } from "lucide-react";
import logoImg from "@/assets/logo-topo.png";

const SOCIAL_PROOFS = [
  {
    name: "Chris Martinez",
    initials: "CM",
    action: "just secured their spot in Intro to Padel",
    spots: 3,
  },
  {
    name: "Ashley Johnson",
    initials: "AJ",
    action: "just grabbed the last discounted session",
    spots: 3,
  },
  {
    name: "Tyler Brooks",
    initials: "TB",
    action: "just reserved their $10 intro session",
    spots: 3,
  },
];

const EMBED_BASE_URL =
  "https://app.acuityscheduling.com/schedule.php?owner=35143956&ref=embedded_csp";

const TIMER_SECONDS = 10 * 60;

const searchSchema = z.object({
  name: z.string().optional().catch(""),
  email: z.string().optional().catch(""),
  phone: z.string().optional().catch(""),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: searchSchema,
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Complete Your Booking – Smash Padel USA" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function CheckoutPage() {
  const { name, email, phone } = Route.useSearch();
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const [expired, setExpired] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Social proof popup
  const [popup, setPopup] = useState<(typeof SOCIAL_PROOFS)[0] | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const proofIndexRef = useRef(Math.floor(Math.random() * SOCIAL_PROOFS.length));

  const showNextProof = () => {
    const proof = SOCIAL_PROOFS[proofIndexRef.current % SOCIAL_PROOFS.length];
    proofIndexRef.current += 1;
    setPopup(proof);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 5000);
  };

  const intervalProofRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // First popup at 8s, then cycle every 45s
    const first = setTimeout(() => {
      showNextProof();
      intervalProofRef.current = setInterval(showNextProof, 45000);
    }, 8000);
    return () => {
      clearTimeout(first);
      if (intervalProofRef.current) clearInterval(intervalProofRef.current);
    };
  }, []);

  // Countdown
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  // Load Acuity embed script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.acuityscheduling.com/js/embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Warn before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Build pre-filled embed URL
  const firstName = name ? name.split(" ")[0] : "";
  const lastName = name ? name.split(" ").slice(1).join(" ") : "";
  const params = new URLSearchParams();
  if (firstName) params.set("firstName", firstName);
  if (lastName) params.set("lastName", lastName);
  if (email) params.set("email", email);
  if (phone) params.set("phone", phone);
  const embedUrl = `${EMBED_BASE_URL}${params.toString() ? `&${params}` : ""}`;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Urgency timer banner ── */}
      <div className="sticky top-0 z-50 w-full" style={{ backgroundColor: "#dc2626" }}>
        {expired ? (
          <div className="container-x flex items-center justify-center gap-2 py-3 text-center text-white">
            <span className="text-sm font-bold">
              ⛔ Your offer has expired.{" "}
              <a href="/" className="underline underline-offset-2 font-black">
                Go back to claim a new spot.
              </a>
            </span>
          </div>
        ) : (
          <div className="container-x flex flex-col items-center justify-center py-3 text-center text-white sm:flex-row sm:gap-3">
            {/* Mobile: stacked. Desktop: inline */}
            <span className="text-xs font-bold uppercase tracking-widest text-red-200 sm:text-sm">
              ⚠️ OFFER EXPIRES IN
            </span>
            <span
              className="text-3xl font-black tabular-nums leading-none sm:text-2xl"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
            >
              {timeStr}
            </span>
            <span className="hidden text-red-300/60 sm:inline">—</span>
            <span className="text-xs text-red-100 sm:text-sm">
              Closing this page will cancel your $10 reservation.
            </span>
          </div>
        )}
      </div>

      {/* ── Header ── */}
      <header className="border-b border-border bg-background">
        <div className="container-x flex h-14 items-center justify-center">
          <a href="/">
            <img src={logoImg} alt="Smash Padel USA" className="h-7 w-auto" />
          </a>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="w-full px-4 py-6 md:py-10">
        <div className="mx-auto max-w-2xl">
          {/* Heading */}
          <div className="mb-6 text-center">
            <p className="section-label">Almost there!</p>
            <h1 className="text-2xl font-extrabold leading-tight md:text-4xl">
              Claim Your{" "}
              <span style={{ color: "var(--color-primary)" }}>$195 Discount</span>
            </h1>
          </div>

          {/* ── Embed ── */}
          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <div
              className="border-b px-5 py-4 text-center"
              style={{ backgroundColor: "var(--color-soft)" }}
            >
              <h2 className="text-lg font-extrabold leading-tight">
                Pick your date & complete payment
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                60-min session · Racket included · $10 only
              </p>
            </div>

            <div className="p-0">
              <iframe
                src={embedUrl}
                title="Schedule Appointment"
                width="100%"
                height="800"
                frameBorder="0"
                allow="payment"
                style={{ border: "none", display: "block" }}
              />
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>🔒 Secure payment via Stripe</span>
            <span>· No subscriptions ·</span>
            <span>One-time $10 charge only</span>
          </div>
        </div>
      </main>

      {/* ── Footer minimal ── */}
      <footer className="mt-10 border-t py-5 text-center text-xs text-muted-foreground">
        © 2026 Smash Padel USA · 6455 Spine Rd Unit A, Boulder, CO 80301 ·{" "}
        <a href="mailto:hello@smashpadel.us" className="hover:underline">
          hello@smashpadel.us
        </a>
      </footer>

      {/* ── Social proof popup ── */}
      {popup && (
        <div
          className="fixed bottom-6 left-4 right-4 z-50 sm:left-6 sm:right-auto sm:w-80 transition-all duration-500"
          style={{
            opacity: popupVisible ? 1 : 0,
            transform: popupVisible ? "translateY(0)" : "translateY(16px)",
            pointerEvents: popupVisible ? "auto" : "none",
          }}
        >
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4 shadow-2xl">
            {/* Avatar */}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {popup.initials}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground leading-snug">
                <span style={{ color: "var(--color-primary)" }}>{popup.name}</span>{" "}
                {popup.action}
              </p>
              <p className="mt-1 text-xs font-bold text-red-600">
                🔴 Only {popup.spots} spots left this week
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">Just now · Boulder, CO</p>
            </div>

            {/* Close */}
            <button
              onClick={() => setPopupVisible(false)}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
