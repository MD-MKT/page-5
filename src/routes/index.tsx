import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check, Play, Star, Users, GraduationCap, Shirt, Trophy, Sparkles,
  Calendar, Zap, Gift, MessageCircle, Instagram,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CTAButton } from "@/components/CTAButton";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { UpsellModal } from "@/components/UpsellModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import courtImg from "@/assets/court-dark.webp";
import ctaBackground from "@/assets/cta-background.webp";
import logoImg from "@/assets/logo-topo.png";

import badgeAppStore from "@/assets/badge-appstore.png";
import badgeGooglePlay from "@/assets/badge-googleplay.png";

import starterPackCoupon from "@/assets/starter-pack-coupon-new.webp";
import racketInclude from "@/assets/racket-include.webp";

import accessCommunity from "@/assets/access-community.webp";

// Why Smash Padel section images
import whyCoach from "@/assets/why-coach.webp";
import whyProgram from "@/assets/why-program.webp";
import whyLeagues from "@/assets/why-leagues.webp";
import whyCommunity from "@/assets/why-community.webp";
import whyOriginalClub from "@/assets/why-original-club.webp";

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
  }),
});

const WA_LINK =
  "https://wa.me/16463736549?text=Hi!%20I%20came%20from%20the%20website%20and%20I%20have%20a%20question%20about%20the%20Intro%20to%20Padel%20class.";

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
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
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
  const openUpsell = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent");
    }
    setUpsellOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-background">
        <div className="container-x flex flex-col items-center pt-6 md:pt-10 text-center">
            {/* Headline */}
            <h1 className="mx-auto max-w-5xl text-3xl font-extrabold leading-[1.2] tracking-tight sm:text-4xl md:text-5xl lg:text-[54px]">
              Claim Your <span style={{ color: "var(--color-primary)" }}>$40 Discount</span><br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl opacity-90 font-bold mt-2 block">Try Padel for Just <span style={{ color: "var(--color-primary)" }}>$10</span></span>
            </h1>
        </div>

        {/* Video Full-Bleed Container (Sem fade e acima do checklist) */}
        <div className="w-full mt-10 overflow-hidden relative aspect-video md:max-h-[500px]">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={courtImg}
          >
            <source src="/hero-loop.mp4" type="video/mp4" />
            {/* Caso prefira usar iframe (YouTube/Vimeo/etc), descomente o código abaixo e comente a tag <video>: */}
            {/* 
            <iframe
              src="https://www.youtube.com/embed/SEU_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=SEU_VIDEO_ID"
              title="Smash Padel Video"
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            */}
            Seu navegador não suporta a tag de vídeo.
          </video>
        </div>

        <div className="container-x flex flex-col items-center pb-16 md:pb-20 text-center">
            {/* Checklist */}
            <div className="mt-10 mx-auto inline-block text-left">
              <ul className="space-y-3">
                {[
                  "Professional coach included",
                  "Racket & equipment provided",
                  "Private court for your group",
                  "Small beginner group - max 4 people, zero pressure",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Check className="h-6 w-6 shrink-0" style={{ color: "var(--color-whatsapp)" }} strokeWidth={3} />
                    <span className="font-medium text-lg">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Text */}
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              60-minute coached session + racket + court time. Everything included. No experience needed.
            </p>

            {/* Button */}
            <div className="mt-4">
              <CTAButton onClick={openUpsell}>Claim Your $40 Discount</CTAButton>
              <p className="mt-3 text-sm italic text-muted-foreground">
                Limited spots available each week.
              </p>
            </div>
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

      {/* ── VIDEO ── */}
      <section id="what" className="bg-background">
        <div className="container-x py-20 text-center">
          <p className="section-label">See it in action</p>
          <h2 className="mx-auto max-w-lg text-2xl font-extrabold leading-tight md:text-3xl">
            New to Padel? Here's Everything You Need to Know
          </h2>
          <div
            className="mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-2xl relative"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
          >
            <LazyYouTube
              videoId="y7IO2jaqf58"
              title="New to Padel? Here's Everything You Need to Know"
            />
          </div>
          <p className="mt-6 italic text-muted-foreground">
            The fastest growing sport in the world. Now right here in Boulder, Colorado.
          </p>
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
            <CTAButton onClick={openUpsell}>Claim Your $40 Discount</CTAButton>
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
              "60-min session with certified coach",
              "Racket & equipment rental",
              "Full court time with a small group",
              "Learn a fun new sport you can play every week",
              "Access Colorado's #1 padel community",
            ].map((l, i) => (
              <div
                key={l}
                className="flex items-center border-b px-6 py-5 last:border-b-0"
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
              </div>
            ))}
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
              <CTAButton onClick={openUpsell}>Claim Your $40 Discount</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── BONUSES ── */}
      <section className="bg-background">
        <div className="container-x py-20">
          <p className="section-label block w-full text-center">Free bonuses</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">You also get these bonuses</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                img: racketInclude,
                t: "Racket included — zero equipment needed",
                d: "Show up in sports clothes. We handle the rest. No gear? No problem.",
              },
              {
                img: starterPackCoupon,
                t: "$105 Off Your Starter Pack",
                d: "After your intro session, unlock an exclusive $105 discount on our Starter Pack — your gateway to regular play. Includes 1 skills clinic + 3 open play sessions.",
              },
              {
                img: accessCommunity,
                t: "Instant Access to Colorado's #1 Padel Community",
                d: "The moment you walk through our doors, you're part of something bigger. Hundreds of active players, matches at your level, weekly events, and a social scene that keeps people coming back every single week.",
                imgPos: "center 20%",
              },
            ].map((c) => (
              <div key={c.t} className="hover-lift rounded-2xl border bg-background p-8 shadow-sm">
                <div className="w-full aspect-video rounded-xl bg-muted relative mb-6 overflow-hidden">
                  <img src={c.img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" style={c.imgPos ? { objectPosition: c.imgPos } : {}} />
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

      {/* ── WHY SMASH PADEL - DARK ── */}
      <section style={{ backgroundColor: "var(--color-dark)" }} className="text-white">
        <div className="container-x py-20">
          <h2 className="text-center text-4xl font-extrabold text-white md:text-5xl">
            Why Smash Padel{" "}
            <span style={{ color: "var(--color-primary)" }}>is not just any Padel Club</span>
          </h2>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              {
                t: "Certified Coach Included",
                d: "Not just an open court rental. Every session comes with a certified coach who actually teaches you — from your very first point.",
                img: whyCoach,
              },
              {
                t: "A Program for Every Level",
                d: "Intro classes, open play, clinics, private lessons, academies. Whatever your level, there's a structured next step waiting for you at Smash.",
                img: whyProgram,
              },
              {
                t: "Leagues That Keep You Coming Back",
                d: "Weekly competitive leagues for beginners, intermediate, and advanced players. Real games, real scores, real progression — not just casual hitting.",
                img: whyLeagues,
              },
              {
                t: "Always Someone to Play With",
                d: "We have hundreds of regular players with open play sessions running every week. You'll always be able to find a fun and competitive match.",
                img: whyCommunity,
              },
            ].map((c) => (
              <div
                key={c.t}
                className="hover-lift rounded-2xl border border-white/10 bg-white/5 transition duration-200 hover:border-white/20 flex flex-col overflow-hidden text-left"
              >
                <div className="w-full aspect-video bg-muted relative overflow-hidden">
                  <img src={c.img} alt={c.t} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="p-7 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white">{c.t}</h3>
                  <p className="mt-2 text-white/60">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-6 max-w-2xl">
            <div className="hover-lift rounded-2xl border border-white/10 bg-white/5 transition duration-200 hover:border-white/20 flex flex-col overflow-hidden text-left">
              <div className="w-full aspect-video bg-muted relative overflow-hidden">
                <img src={whyOriginalClub} alt="The Original Padel Club in Colorado" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="p-7 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white">The Original Padel Club in Colorado</h3>
                <p className="mt-2 text-white/60">Colorado's first dedicated indoor padel facility. Five courts, year-round play, and the community that put padel on the map in Colorado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── STILL ON FENCE ── */}
      <section className="bg-background">
        <div className="container-x mx-auto max-w-2xl py-20 text-center">
          <h2 className="text-4xl font-extrabold md:text-5xl">Still curious? Let's talk.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            This is your chance to discover Colorado's fastest-growing sport — with a certified coach, all equipment, and an incredible community included. All for $10. Don't let this week's spots go to someone else.
          </p>
          <p className="mt-4 text-lg font-medium">We're on WhatsApp and answer in minutes.</p>
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
            <CTAButton onClick={openUpsell}>Claim Your $40 Discount</CTAButton>
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
            <CTAButton onClick={openUpsell}>Claim Your $40 Discount</CTAButton>
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

      <WhatsAppFloat />
      <UpsellModal open={upsellOpen} onOpenChange={setUpsellOpen} />
    </div>
  );
}
