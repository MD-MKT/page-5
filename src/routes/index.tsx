import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check, Play, Star, Users, GraduationCap, Shirt, Trophy, Sparkles,
  Calendar, Zap, Gift, MessageCircle, Instagram, Linkedin,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CTAButton } from "@/components/CTAButton";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { UpsellModal } from "@/components/UpsellModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImg from "@/assets/hero-padel.jpg";
import courtImg from "@/assets/court-dark.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Smash Padel USA — Try Padel for $10 in Boulder, CO" },
      {
        name: "description",
        content:
          "Claim your $125 discount. 60-minute beginner padel session in Boulder, Colorado for just $10. Coach, racket and court included. No experience needed.",
      },
      { property: "og:title", content: "Smash Padel USA — $10 Beginner Padel Session" },
      { property: "og:description", content: "60 min coached session + racket + court. $135 value for $10 in Boulder, CO." },
    ],
  }),
});

const WA_LINK =
  "https://wa.me/13035550100?text=Hi!%20I%20have%20a%20question%20about%20the%20%2410%20intro%20offer%20at%20Smash%20Padel.";

function Landing() {
  const [upsellOpen, setUpsellOpen] = useState(false);
  const openUpsell = () => setUpsellOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onCTA={openUpsell} />

      {/* ── HERO ── */}
      <section className="bg-background">
        <div className="container-x grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          {/* Left col */}
          <div className="order-2 md:order-1">
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: "var(--color-dark)" }}
            >
              <span className="pulse-dot" />
              Colorado's First Padel Club
            </span>

            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Claim Your{" "}
              <span style={{ color: "var(--color-primary)" }}>$125 Discount</span>{" "}
              — Try Padel for Just{" "}
              <span style={{ color: "var(--color-primary)" }}>$10</span>
            </h1>

            <p className="mt-5 text-lg text-muted-foreground md:text-xl">
              60-minute coached session + racket + court time. Everything included. No experience needed.
            </p>

            {/* Checklist */}
            <ul className="mt-7 space-y-3">
              {[
                "Professional coach included — $80 value",
                "Racket & equipment provided — $15 value",
                "Private court for your group — $40 value",
                "Small beginner group — max 4 people, zero pressure",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>

            {/* Trust pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["No experience needed", "Racket included", "Max 4 per group", "60 min session"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
                  style={{ backgroundColor: "var(--color-soft)", borderColor: "var(--color-border)" }}
                >
                  <Check className="h-3 w-3 shrink-0" style={{ color: "var(--color-primary)" }} strokeWidth={3} />
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <CTAButton onClick={openUpsell}>Claim my $10 spot</CTAButton>
              <p className="mt-3 text-sm italic text-muted-foreground">
                Limited spots available each week. No credit card required to reserve.
              </p>
            </div>
          </div>

          {/* Right col — photo */}
          <div className="order-1 md:order-2">
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                boxShadow:
                  "0 0 0 4px color-mix(in oklab, var(--color-primary) 18%, transparent), 0 24px 64px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={heroImg}
                alt="Players enjoying padel at Smash Padel USA"
                width={1280}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stars bar */}
        <div className="container-x flex items-center justify-center gap-2 pb-12">
          <div className="flex" style={{ color: "var(--color-primary)" }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <span className="text-sm font-semibold">Rated 4.9 by 400+ players in Boulder</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ backgroundColor: "var(--color-soft)" }}>
        <div className="container-x py-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { n: "400+", l: "First-timers through our doors" },
              { n: "★ 4.9", l: "Average player rating" },
              { n: "60 min", l: "From zero to playing" },
              { n: "#1", l: "Padel Club in Colorado" },
            ].map((s, i) => (
              <div
                key={s.l}
                className="flex flex-col items-center justify-center px-4 py-10 text-center"
                style={i > 0 ? { borderLeft: "1px solid var(--color-border)" } : {}}
              >
                <div className="text-4xl font-extrabold md:text-5xl" style={{ color: "var(--color-primary)" }}>
                  {s.n}
                </div>
                <div className="mt-2 max-w-[120px] text-sm font-medium text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section id="what" className="bg-background">
        <div className="container-x py-20 text-center">
          <p className="section-label">See It In Action</p>
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Never heard of padel? You're not alone — and you're about to love it.
          </h2>
          <div
            className="mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-2xl relative"
            style={{ backgroundColor: "var(--color-dark)", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
          >
            <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
            <button
              aria-label="Play video"
              className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full text-white transition-transform hover:scale-110 active:scale-95"
              style={{
                backgroundColor: "var(--color-primary)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <Play className="ml-1 h-8 w-8 fill-current" />
            </button>
          </div>
          <p className="mt-6 italic text-muted-foreground">
            The fastest growing sport in the world. Now right here in Boulder, Colorado.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-background" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="container-x py-20">
          <p className="section-label block w-full text-center">Simple Process</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">How It Works</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "1",
                icon: Calendar,
                t: "Reserve Your Spot",
                d: "Takes 60 seconds. No experience or equipment needed.",
              },
              {
                n: "2",
                icon: Shirt,
                t: "Show Up Ready to Play",
                d: "We handle everything. Just arrive in sports clothes.",
              },
              {
                n: "3",
                icon: Zap,
                t: "Play in 60 Minutes",
                d: "Your coach teaches you the rules and technique — and you actually play. All in one session.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="hover-lift flex flex-col items-center rounded-2xl border bg-background p-8 text-center shadow-sm"
                style={{ borderTop: "4px solid var(--color-primary)" }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-2xl font-extrabold text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {s.n}
                </div>
                <div
                  className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "color-mix(in oklab, var(--color-primary) 10%, white)" }}
                >
                  <s.icon className="h-6 w-6" style={{ color: "var(--color-primary)" }} />
                </div>
                <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CTAButton onClick={openUpsell}>Claim my $10 spot</CTAButton>
          </div>
        </div>
      </section>

      {/* ── VALUE STACK ── */}
      <section style={{ backgroundColor: "var(--color-soft)" }}>
        <div className="container-x py-20">
          <p className="section-label block w-full text-center">Everything Included</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">Here's Everything You Get for $10</h2>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border bg-background shadow-sm">
            {[
              ["60-min session with certified coach", "$80"],
              ["Racket & equipment rental", "$15"],
              ["Full court time — private group", "$40"],
              ["Small group — max 4 beginners", "No pressure"],
              ["Part of Boulder's #1 sports community", "Priceless"],
            ].map(([l, v], i) => (
              <div
                key={l}
                className="flex items-center justify-between border-b px-6 py-5 last:border-b-0"
                style={i % 2 === 1 ? { backgroundColor: "var(--color-soft)" } : {}}
              >
                <span className="flex items-center gap-3 font-medium">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {l}
                </span>
                <span className="ml-4 shrink-0 font-extrabold" style={{ color: "var(--color-primary)" }}>
                  {v}
                </span>
              </div>
            ))}
            <div
              className="flex items-center justify-between px-6 py-6"
              style={{ backgroundColor: "var(--color-dark)" }}
            >
              <span className="text-lg font-bold text-white">Total value</span>
              <span className="text-2xl font-extrabold" style={{ color: "var(--color-primary)" }}>
                $135+
              </span>
            </div>
          </div>

          {/* You pay callout */}
          <div className="mt-12 text-center">
            <div
              className="mx-auto inline-block rounded-2xl border px-10 py-8 shadow-sm"
              style={{ backgroundColor: "var(--color-background)" }}
            >
              <p className="text-base font-medium text-muted-foreground">You pay:</p>
              <div
                className="mt-1 text-8xl font-extrabold leading-none"
                style={{ color: "var(--color-primary)" }}
              >
                $10
              </div>
              <p className="mt-2 text-xl font-bold">You save $125</p>
            </div>
            <div className="mt-8">
              <CTAButton onClick={openUpsell}>Claim my $125 discount</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── BONUSES ── */}
      <section className="bg-background">
        <div className="container-x py-20">
          <p className="section-label block w-full text-center">Free Bonuses</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">But Wait — You Also Get These Bonuses</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Shirt,
                t: "Racket Included — Zero Equipment Needed",
                d: "Show up in sports clothes. We handle the rest. No gear? No problem.",
              },
              {
                icon: Gift,
                t: "$100 Off Your Starter Pack",
                d: "After your intro session, unlock an exclusive $100 discount on our Starter Pack — your gateway to regular play. Valid for 7 days after your session.",
              },
              {
                icon: Users,
                t: "Beginner Community Access",
                d: "Join our beginner group — find players at your level, get tips from the coach, and never show up alone.",
              },
            ].map((c) => (
              <div key={c.t} className="hover-lift rounded-2xl border bg-background p-8 shadow-sm">
                <div className="icon-wrap">
                  <c.icon className="h-6 w-6" style={{ color: "var(--color-primary)" }} />
                </div>
                <h3 className="text-lg font-bold leading-tight">{c.t}</h3>
                <p className="mt-2 text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section id="about" className="border-t bg-background">
        <div className="container-x py-20">
          <p className="section-label block w-full text-center">Real Players, Real Results</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">
            What Players Are Saying — Straight From the Court
          </h2>

          {/* Community video */}
          <div
            className="mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-2xl relative"
            style={{ backgroundColor: "var(--color-dark)", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
          >
            <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
            <button
              aria-label="Play video"
              className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full text-white transition-transform hover:scale-110 active:scale-95"
              style={{ backgroundColor: "var(--color-primary)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              <Play className="ml-1 h-8 w-8 fill-current" />
            </button>
          </div>

          {/* Photo strip */}
          <div className="mt-10 flex gap-4 overflow-x-auto pb-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-44 w-44 shrink-0 overflow-hidden rounded-xl shadow-sm">
                <img src={heroImg} loading="lazy" alt="Player photo" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xl font-bold">
            Over 400 people have taken their first padel lesson here.
          </p>

          {/* Review cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "Vera P.",
                q: "A casual padel club with a very welcoming atmosphere and an active community. It's easy to find people to play with most days.",
              },
              {
                n: "Michael S.",
                q: "Hands down the most fun you'll have in Boulder. The facility is new, staff is friendly, and the community is awesome. If you're looking for a fun activity, this is the spot to go!",
              },
              {
                n: "Kay M.",
                q: "Loving learning a new sport at Smash Padel! Great exercise, fun people, open play, clinics — they have it all!",
              },
            ].map((r) => (
              <div
                key={r.n}
                className="hover-lift relative overflow-hidden rounded-2xl border p-8 shadow-sm"
                style={{ backgroundColor: "var(--color-soft)" }}
              >
                {/* Decorative quote mark */}
                <div
                  className="pointer-events-none absolute -top-3 right-5 select-none font-serif text-9xl leading-none"
                  style={{ color: "color-mix(in oklab, var(--color-primary) 12%, white)" }}
                >
                  "
                </div>
                <div className="flex" style={{ color: "var(--color-primary)" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="relative mt-3 leading-relaxed text-foreground">"{r.q}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {r.n.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <p className="text-sm font-bold">{r.n}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SMASH PADEL — DARK ── */}
      <section style={{ backgroundColor: "var(--color-dark)" }} className="text-white">
        <div className="container-x py-20">
          <p className="section-label block w-full text-center" style={{ color: "var(--color-primary)" }}>
            Why Choose Us
          </p>
          <h2 className="text-center text-4xl font-extrabold text-white md:text-5xl">
            Why Smash Padel —{" "}
            <span style={{ color: "var(--color-primary)" }}>Not Just Any Court</span>
          </h2>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              {
                icon: GraduationCap,
                t: "Certified Coach Included",
                d: "Not just an open court rental. You learn correctly from day one.",
              },
              {
                icon: Users,
                t: "Small Group of 4 Max",
                d: "No crowded classes. Personal attention at your pace.",
              },
              {
                icon: Shirt,
                t: "All Equipment Provided",
                d: "Show up in sports clothes. That's it.",
              },
              {
                icon: Sparkles,
                t: "Beginner-Only Group",
                d: "Everyone's a first-timer. Zero judgment, 100% fun.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-white/10 p-7 transition duration-200 hover:border-white/20 hover:bg-white/5"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--color-primary) 18%, transparent)",
                  }}
                >
                  <c.icon className="h-6 w-6" style={{ color: "var(--color-primary)" }} />
                </div>
                <h3 className="text-lg font-bold text-white">{c.t}</h3>
                <p className="mt-2 text-white/60">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-6 max-w-2xl">
            <div className="rounded-2xl border border-white/10 p-7 text-center transition duration-200 hover:border-white/20 hover:bg-white/5">
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: "color-mix(in oklab, var(--color-primary) 18%, transparent)" }}
              >
                <Trophy className="h-6 w-6" style={{ color: "var(--color-primary)" }} />
              </div>
              <h3 className="text-lg font-bold text-white">Boulder's #1 Padel Community</h3>
              <p className="mt-2 text-white/60">400+ players. Find your people on and off the court.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── URGENCY ── */}
      <section style={{ backgroundColor: "var(--color-soft)", borderTop: "4px solid var(--color-primary)" }}>
        <div className="container-x py-20 text-center">
          {/* Pulsing availability indicator */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="pulse-dot" />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--color-primary)" }}
            >
              Limited availability
            </span>
            <span className="pulse-dot" />
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold md:text-5xl">
            We Only Accept{" "}
            <span style={{ color: "var(--color-primary)" }}>12 New Players</span> Per Week
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            To keep groups small and coaching personal, we limit new players every week. Once spots are
            filled, the $10 offer is gone until the following week.
          </p>
          <p className="mt-3 italic">If you leave this page without booking, you lose your discount.</p>
          <div className="mt-8">
            <CTAButton onClick={openUpsell}>Claim my $10 spot before it's gone</CTAButton>
          </div>
          <p className="mt-3 text-sm italic text-muted-foreground">
            No experience needed. Racket included. 60 minutes. $10.
          </p>
        </div>
      </section>

      {/* ── STILL ON FENCE ── */}
      <section className="bg-background">
        <div className="container-x mx-auto max-w-2xl py-20 text-center">
          <h2 className="text-4xl font-extrabold md:text-5xl">Still have questions? We're here.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Worst case: you had $10 worth of fun, learned a new sport, and met great people in Boulder.
            Best case: you find your new favorite activity and a community you didn't know you needed.
          </p>
          <p className="mt-4 text-lg font-medium">Chat with us on WhatsApp — we answer in minutes.</p>
          <div className="mt-8">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <MessageCircle className="h-5 w-5" /> Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="memberships" style={{ backgroundColor: "var(--color-soft)" }}>
        <div className="container-x mx-auto max-w-3xl py-20">
          <p className="section-label block w-full text-center">FAQ</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">Your Questions, Answered</h2>
          <Accordion type="single" collapsible className="mt-10">
            {[
              [
                "Do I need any experience?",
                "None at all. This class is designed specifically for people who have never played padel. Your coach teaches everything from scratch.",
              ],
              [
                "What if I've never held a racket?",
                "Perfect — that's exactly who this class is for. The coach starts from zero. By the end of the 60 minutes, you'll be playing real rallies.",
              ],
              [
                "Is equipment provided?",
                "Yes, everything is included: racket, balls, and court time. Just show up in comfortable sports clothes.",
              ],
              [
                "How many people are in the group?",
                "Maximum 4 people per session, all beginners at the same level. Small groups mean more coaching time and less pressure.",
              ],
              [
                "What should I wear?",
                "Any athletic wear and sneakers or court shoes. That's it.",
              ],
              [
                "Can I bring a friend?",
                "Yes! You'll see an option to add a friend during checkout at a special price. Padel is way more fun with someone you know.",
              ],
              [
                "What happens after the intro session?",
                "You'll receive an exclusive $100 discount on our Starter Pack — valid for 7 days. No pressure. Most people just want to keep playing.",
              ],
              [
                "Is the $10 a recurring charge?",
                "No. It's a one-time session fee. No subscriptions, no hidden charges.",
              ],
              [
                "How do I book?",
                'Click any "Claim My $10 Spot" button on this page. The process takes about 60 seconds.',
              ],
            ].map(([q, a], i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b">
                <AccordionTrigger className="py-5 text-left text-lg font-bold hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 text-center">
            <CTAButton onClick={openUpsell}>Claim my $10 spot</CTAButton>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden">
        <img src={courtImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,10,10,0.80)" }} />
        <div className="container-x relative py-28 text-center text-white">
          <p className="section-label" style={{ color: "var(--color-primary)" }}>
            Limited Spots
          </p>
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Your First Step Onto the Court Is Waiting.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            $10. 60 minutes. Everything included. Your{" "}
            <span style={{ color: "var(--color-primary)" }} className="font-bold">
              $125 discount
            </span>{" "}
            expires when spots fill up.
          </p>
          <div className="mt-8">
            <CTAButton onClick={openUpsell}>Book my session now</CTAButton>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "var(--color-dark)" }} className="text-white/80">
        <div className="container-x grid gap-10 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-md font-black text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                S
              </div>
              <span className="text-lg font-extrabold text-white">SMASH PADEL</span>
            </div>
            <p className="mt-4 text-sm">Boulder, Colorado's first padel club.</p>
            <div className="mt-5 flex gap-3">
              <div className="rounded-md border border-white/20 px-4 py-2 text-xs">App Store</div>
              <div className="rounded-md border border-white/20 px-4 py-2 text-xs">Google Play</div>
            </div>
          </div>
          <div className="md:text-center">
            <h4 className="font-bold text-white">Visit</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Hours: Mon–Sun 7am–10pm</li>
              <li>Location: Boulder, CO</li>
              <li>Contact: hello@smashpadel.us</li>
            </ul>
          </div>
          <div className="md:text-right">
            <h4 className="font-bold text-white">Follow</h4>
            <div className="mt-4 flex gap-4 md:justify-end">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="TikTok" className="transition-colors hover:text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M19.5 6.2c-1.5 0-2.9-.6-3.9-1.6V15a5.5 5.5 0 1 1-5.5-5.5v3a2.5 2.5 0 1 0 2.5 2.5V2h3a4.5 4.5 0 0 0 3.9 4.2z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
          © 2026 Smash Padel USA. All rights reserved.
        </div>
      </footer>

      <WhatsAppFloat />
      <UpsellModal open={upsellOpen} onOpenChange={setUpsellOpen} />
    </div>
  );
}
