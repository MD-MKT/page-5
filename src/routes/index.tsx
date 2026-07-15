import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check, Play, Instagram,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CTAButton } from "@/components/CTAButton";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { UpsellModal } from "@/components/UpsellModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroPoster from "@/assets/hero-lcp-poster.webp";
import ctaBackground from "@/assets/cta-background.webp";
import logoImg from "@/assets/logo-topo.png";

import badgeAppStore from "@/assets/badge-appstore.png";
import badgeGooglePlay from "@/assets/badge-googleplay.png";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Smash Padel USA - Try Padel for $10 in Boulder, CO" },
      {
        name: "description",
        content:
          "Claim your $125 discount. 60-minute beginner padel session in Boulder, Colorado for just $10. Coach, racket and court included. No experience needed.",
      },
      { property: "og:title", content: "Smash Padel USA - $10 Beginner Padel Session" },
      { property: "og:description", content: "60 min coached session + racket + court. $40 value for $10 in Boulder, CO." },
    ],
    links: [{ rel: "preload", as: "image", href: heroPoster }],
  }),
});

// YouTube facade — loads iframe only on click, avoiding ~500KB of YouTube JS on page load
function LazyYouTube({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <button
      onClick={() => setPlaying(true)}
      className="absolute inset-0 w-full h-full group cursor-pointer bg-black border-0"
      aria-label={`Play: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover opacity-90"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:bg-white group-hover:scale-110 transition-all duration-200">
          <Play className="h-7 w-7 text-gray-900 ml-0.5" fill="currentColor" />
        </div>
      </div>
    </button>
  );
}

function Landing() {
  const [upsellOpen, setUpsellOpen] = useState(false);

  const keepHeroVideoMuted = (video: HTMLVideoElement | null) => {
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
  };

  const openUpsell = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent");
    }
    setUpsellOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-28 text-foreground md:pb-0">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-background">
        <div className="container-x flex flex-col items-center pt-6 pb-8 text-center md:pt-10 md:pb-12">
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[54px]">
            Try Padel in Boulder for <span style={{ color: "var(--color-primary)" }}>$10</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            A beginner-friendly session with a coach, equipment included, and no experience needed.
          </p>

          <div className="mt-6 mx-auto inline-block text-left">
            <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
              {[
                "No partner needed",
                "Rackets included",
                "Small beginner group",
                "Learn and play in your first session",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--color-whatsapp)" }} strokeWidth={3} />
                  <span className="text-base font-semibold leading-snug">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <CTAButton onClick={openUpsell} className="w-full max-w-xs px-6 text-base">
              Book Your $10 Intro
            </CTAButton>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              Coach included. Equipment included. No experience needed.
            </p>
          </div>
        </div>

        {/* Video Full-Bleed Container */}
        <div className="w-full overflow-hidden relative aspect-video md:max-h-[500px]">
          <img
            src={heroPoster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
          <video
            ref={keepHeroVideoMuted}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={heroPoster}
            aria-hidden="true"
            controls={false}
            onCanPlay={(event) => keepHeroVideoMuted(event.currentTarget)}
            onLoadedMetadata={(event) => keepHeroVideoMuted(event.currentTarget)}
            onPlay={(event) => keepHeroVideoMuted(event.currentTarget)}
            onVolumeChange={(event) => keepHeroVideoMuted(event.currentTarget)}
          >
            <source src="/hero-loop.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container-x flex flex-col items-center pb-16 md:pb-20 text-center">
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            60-minute coached session + racket + court time. Everything included. Easy online booking.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ backgroundColor: "var(--color-soft)" }}>
        <div className="container-x py-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { n: "2,800+", l: "Active community players" },
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

      {/* ── HOW IT WORKS ── */}
      <section className="bg-background" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="container-x py-20">
          <p className="section-label block w-full text-center">Simple process</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">How it works</h2>
          <div className="mt-14 flex flex-col gap-8 md:gap-12 relative mx-auto max-w-4xl">
            {[
              {
                n: "1",
                t: "Reserve your spot",
                d: "Takes 60 seconds. No experience or equipment needed.",
              },
              {
                n: "2",
                t: "Show up ready to play",
                d: "We handle everything. Just arrive in sports clothes.",
              },
              {
                n: "3",
                t: "Play in 60 minutes",
                d: "Your coach teaches you the rules and technique - and you actually play. All in one session.",
              },
            ].map((s, i) => (
              <div
                key={s.n}
                className="sticky flex flex-col items-center text-center gap-4 rounded-2xl border bg-background p-10 shadow-xl transition-all duration-300 hover:shadow-2xl"
                style={{ top: `calc(120px + ${i * 40}px)`, zIndex: i + 10 }}
              >
                <div className="text-8xl font-black opacity-10 leading-none mb-2" style={{ color: "var(--color-primary)" }}>{s.n}</div>
                <h3 className="text-3xl font-extrabold">{s.t}</h3>
                <p className="mt-2 text-lg text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CTAButton onClick={openUpsell}>Book Your $10 Intro</CTAButton>
          </div>
        </div>
      </section>

      {/* ── VALUE STACK ── */}
      <section style={{ backgroundColor: "var(--color-soft)" }}>
        <div className="container-x py-20">
          <p className="section-label block w-full text-center">Everything included</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">Here's everything you get for $10</h2>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border bg-background shadow-sm">
            {[
              "60-minute coached session",
              "Racket rental included (normally $15 on its own)",
              "Small beginner group, same skill level as you",
              "Full walkthrough of rules and basics — no experience needed",
            ].map((item, i) => (
              <div
                key={item}
                className="flex items-center border-b px-6 py-5"
                style={i % 2 === 1 ? { backgroundColor: "var(--color-soft)" } : {}}
              >
                <span className="flex items-center gap-3 font-medium">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </span>
              </div>
            ))}
            <div className="px-6 py-5" style={{ backgroundColor: "var(--color-soft)" }}>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Plus, first-timers get:
              </p>
              <div className="mt-4 space-y-4">
                {[
                  "$105 off your starter pack if you decide to keep playing",
                  "Access to exclusive Smash Padel events",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 font-medium">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: "var(--color-whatsapp)" }}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* You pay callout */}
          <div className="mt-12 text-center">
            <div
              className="mx-auto inline-flex flex-col items-center rounded-3xl border border-border/50 px-12 py-10 shadow-2xl relative overflow-hidden"
              style={{ backgroundColor: "var(--color-background)" }}
            >
              <p className="text-xl font-bold uppercase tracking-widest text-muted-foreground mb-4">Your price today</p>
              <div className="flex flex-col items-center gap-2">
                <span className="text-7xl font-black text-red-500 line-through decoration-4 opacity-80">$50</span>
                <span className="text-8xl font-black" style={{ color: "var(--color-whatsapp)" }}>$10</span>
              </div>
              <p className="mt-6 text-xl font-bold rounded-full px-6 py-2 whitespace-nowrap" style={{ backgroundColor: "color-mix(in oklab, var(--color-whatsapp) 15%, transparent)", color: "var(--color-whatsapp)" }}>You save $40</p>
            </div>
            <div className="mt-8">
              <CTAButton onClick={openUpsell}>Book Your $10 Intro</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section id="about" className="border-t bg-background">
        <div className="container-x py-20">
          <p className="section-label block w-full text-center">Real players, real results</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">
            What players are saying
          </h2>

          <div className="mx-auto mt-10 w-full max-w-xs overflow-hidden rounded-2xl shadow-xl border relative aspect-[9/16]">
            <LazyYouTube
              videoId="9NsHGpTT0sM"
              title="Smash Padel USA - Player Testimonial"
            />
          </div>

          <p className="mt-10 text-center text-xl font-bold">
            Over 2,800 players are part of our community.
          </p>

        </div>
      </section>

      {/* ── POST VALUE CTA ── */}
      <section className="bg-background border-t">
        <div className="container-x mx-auto max-w-3xl py-16 text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">Ready to try it?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            You don't need experience, equipment, or a partner.
            Just book your $10 Intro and we'll walk you through the rest.
          </p>
          <div className="mt-8">
            <CTAButton onClick={openUpsell}>Book Your First Session</CTAButton>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section id="what" className="bg-background border-t">
        <div className="container-x py-20 text-center">
          <p className="section-label">See it in action</p>
          <h2 className="mx-auto max-w-lg text-2xl font-extrabold leading-tight md:text-3xl">
            See what your first session feels like
          </h2>
          <div
            className="mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-2xl relative"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
          >
            <LazyYouTube
              videoId="y7IO2jaqf58"
              title="See what your first session feels like"
            />
          </div>
          <p className="mt-6 italic text-muted-foreground">
            A quick look at the experience before you book.
          </p>
        </div>
      </section>

      {/* ── LOCATION / MAP ── */}
      <section className="bg-background border-t">
        <div className="container-x py-20 text-center">
          <p className="section-label block w-full text-center">Our location</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">Where to find us</h2>
          <p className="mt-4 text-lg text-muted-foreground">Conveniently located at 6455 Spine Rd Unit A, Boulder, CO 80301. Free parking available.</p>
          <div className="mx-auto mt-10 w-full max-w-4xl aspect-video md:aspect-[21/9] rounded-2xl bg-muted overflow-hidden flex items-center justify-center relative border shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=6455%20Spine%20Rd%20Unit%20A,%20Boulder,%20CO%2080301&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              aria-hidden="false"
              tabIndex={0}
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="memberships" style={{ backgroundColor: "var(--color-soft)" }}>
        <div className="container-x mx-auto max-w-3xl py-20">
          <p className="section-label block w-full text-center">FAQ</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">Your questions, answered</h2>
          <Accordion type="single" collapsible className="mt-10">
            {[
              [
                "Do I need any experience?",
                "None at all. Whether you've never picked up a racket, tried padel once or twice, or come from tennis, pickleball, or squash — this session is designed to meet you where you are. Your coach tailors everything to the group from the very first minute.",
              ],
              [
                "What if I've never held a racket?",
                "Perfect - that's exactly who this class is for. The coach starts from zero. By the end of the 60 minutes, you'll be playing real rallies.",
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
                "Absolutely! After completing your purchase, just send us a message on WhatsApp and we'll book a spot for your friend right away. Padel is way more fun with someone you know.",
              ],
              [
                "What happens after the intro session?",
                "You'll receive an exclusive $105 discount on our Starter Pack — includes 1 skills clinic + 3 open play sessions + 20% off your first racket purchase. No pressure. Most people just want to keep playing.",
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
            <CTAButton onClick={openUpsell}>Book Your $10 Intro</CTAButton>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden">
        <img src={ctaBackground} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,10,10,0.88)" }} />
        <div className="container-x relative py-28 text-center text-white">
          <p className="section-label" style={{ color: "var(--color-primary)" }}>
            Limited spots
          </p>
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Your first step onto the court is waiting.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            You're one session away from finding your new favorite thing to do in Boulder. Coach, racket, and court — all included. Reserve your spot for $10 before this week fills up.
          </p>
          <div className="mt-8">
            <CTAButton onClick={openUpsell}>Book Your $10 Intro</CTAButton>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "var(--color-dark)" }} className="text-white/80">
        <div className="container-x grid gap-10 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Smash Padel Logo" className="h-8 w-auto brightness-0 invert" loading="lazy" decoding="async" />
            </div>
            <p className="mt-4 text-sm">Colorado's #1 padel club.</p>
            <div className="mt-5 flex gap-3">
              <a href="https://apps.apple.com/us/app/smash-padel-usa/id6740839621" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                <img src={badgeAppStore} alt="Download on the App Store" className="h-9 w-auto" loading="lazy" decoding="async" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.court.smashpadelusx&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                <img src={badgeGooglePlay} alt="Get it on Google Play" className="h-9 w-auto" loading="lazy" decoding="async" />
              </a>
            </div>
          </div>
          <div className="md:text-center">
            <h4 className="font-bold text-white">Visit</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Open 7 Days: 9:00 AM – 11:00 PM</li>
              <li>Location: Boulder, CO</li>
              <li>Phone: +1 720-340-5110</li>
              <li>Contact: info@smashpadelusa.com</li>
            </ul>
          </div>
          <div className="md:text-right">
            <h4 className="font-bold text-white">Follow</h4>
            <div className="mt-4 flex gap-4 md:justify-end">
              <a href="https://www.instagram.com/smashpadelusa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@smashpadelusa" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transition-colors hover:text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M19.5 6.2c-1.5 0-2.9-.6-3.9-1.6V15a5.5 5.5 0 1 1-5.5-5.5v3a2.5 2.5 0 1 0 2.5 2.5V2h3a4.5 4.5 0 0 0 3.9 4.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
          © 2026 Smash Padel USA. All rights reserved.
        </div>
      </footer>

      <div className="hidden md:block">
        <WhatsAppFloat />
      </div>
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pb-4 pt-3 shadow-[0_-12px_30px_rgba(0,0,0,0.12)] backdrop-blur md:hidden"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-sm text-center">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">No experience needed.</p>
          <CTAButton onClick={openUpsell} className="w-full px-4 py-3 text-sm">
            Book Your $10 Intro
          </CTAButton>
        </div>
      </div>
      <UpsellModal open={upsellOpen} onOpenChange={setUpsellOpen} />
    </div>
  );
}
