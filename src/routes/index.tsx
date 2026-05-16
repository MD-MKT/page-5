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
import heroImg from "@/assets/hero-padel.webp";
import courtImg from "@/assets/court-dark.webp";
import logoImg from "@/assets/logo-topo.png";

// New imported photos
import heroWoman1 from "@/assets/hero-woman-1.webp";
import heroWoman2 from "@/assets/hero-woman-2.webp";
import heroMan1 from "@/assets/hero-man-1.webp";
import heroMan2 from "@/assets/hero-man-2.webp";

import starterPackCoupon from "@/assets/starter-pack-coupon.webp";
import boulderCommunity from "@/assets/boulder-community.webp";
import certificatedCoach from "@/assets/certificated-coach.webp";
import equipmentIncluded from "@/assets/equipment-included.webp";
import smallGroup from "@/assets/small-group.webp";
import racketInclude from "@/assets/racket-include.webp";
import racketBonus from "@/assets/racket-bonus.webp";

import accessCommunity from "@/assets/access-community.webp";
import beginnerGroup from "@/assets/beginner-group.webp";
import limitedSpots from "@/assets/limited-spots.webp";

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
      { property: "og:description", content: "60 min coached session + racket + court. $135 value for $10 in Boulder, CO." },
    ],
  }),
});

const WA_LINK =
  "https://wa.me/17203405110?text=Hi!%20I%20have%20a%20question%20about%20the%20%2410%20intro%20offer%20at%20Smash%20Padel.";

function Landing() {
  const [upsellOpen, setUpsellOpen] = useState(false);
  const openUpsell = () => setUpsellOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-background">
        <div className="container-x flex flex-col items-center pt-6 md:pt-10 pb-16 md:pb-20 text-center">
            {/* Headline */}
            <h1 className="mx-auto max-w-5xl text-3xl font-extrabold leading-[1.2] tracking-tight sm:text-4xl md:text-5xl lg:text-[54px]">
              Claim Your <span style={{ color: "var(--color-primary)" }}>$125 Discount</span><br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl opacity-90 font-bold mt-2 block">Try Padel for Just <span style={{ color: "var(--color-primary)" }}>$10</span></span>
            </h1>

            {/* Checklist */}
            <div className="mt-8 mx-auto inline-block text-left">
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

            {/* Photos (4 photos total) */}
            <div className="mt-12 w-full flex justify-center py-6 overflow-hidden">
               <div className="flex items-center gap-2 md:gap-4">
                  {/* Card 1 */}
                  <div className="w-[80px] h-[180px] md:w-[130px] md:h-[280px] rounded-[20px] overflow-hidden translate-y-6 shrink-0 relative">
                    <img src={heroMan1} className="w-full h-full object-cover" style={{ objectPosition: "60% center" }} alt="Padel player man" />
                  </div>
                  {/* Card 2 */}
                  <div className="w-[90px] h-[200px] md:w-[140px] md:h-[300px] rounded-[20px] overflow-hidden -translate-y-4 shrink-0 relative z-10">
                    <img src={heroWoman1} className="w-full h-full object-cover" alt="Padel player woman" />
                  </div>
                  {/* Card 3 */}
                  <div className="w-[90px] h-[200px] md:w-[140px] md:h-[300px] rounded-[20px] overflow-hidden translate-y-4 shrink-0 relative z-10">
                    <img src={heroMan2} className="w-full h-full object-cover" style={{ objectPosition: "20% center" }} alt="Padel player man" />
                  </div>
                  {/* Card 4 */}
                  <div className="w-[80px] h-[180px] md:w-[130px] md:h-[280px] rounded-[20px] overflow-hidden -translate-y-6 shrink-0 relative">
                    <img src={heroWoman2} className="w-full h-full object-cover" alt="Padel player woman" />
                  </div>
               </div>
            </div>

            {/* Text */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              60-minute coached session + racket + court time. Everything included. No experience needed.
            </p>

            {/* Button */}
            <div className="mt-4">
              <CTAButton onClick={openUpsell}>Claim $125 Discount</CTAButton>
              <p className="mt-3 text-sm italic text-muted-foreground">
                Limited spots available each week.
              </p>
            </div>
        </div>

        {/* Stars bar */}
        <div className="container-x flex items-center justify-center gap-2 pb-12">
          <div className="flex" style={{ color: "var(--color-primary)" }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <span className="text-sm font-semibold">Rated 4.9 by 2,800+ players in Boulder</span>
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
          <p className="section-label">See It In Action</p>
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Never heard of padel?
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
          <div className="mt-14 flex flex-col gap-8 md:gap-12 relative mx-auto max-w-4xl">
            {[
              {
                n: "1",
                t: "Reserve Your Spot",
                d: "Takes 60 seconds. No experience or equipment needed.",
              },
              {
                n: "2",
                t: "Show Up Ready to Play",
                d: "We handle everything. Just arrive in sports clothes.",
              },
              {
                n: "3",
                t: "Play in 60 Minutes",
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
            <CTAButton onClick={openUpsell}>Claim $125 Discount</CTAButton>
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
              ["Full court time - private group", "$40"],
              ["Small group - max 4 beginners", "No pressure"],
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
              className="mx-auto inline-flex flex-col items-center rounded-3xl border border-border/50 px-12 py-10 shadow-2xl relative overflow-hidden"
              style={{ backgroundColor: "var(--color-background)" }}
            >
              <p className="text-xl font-bold uppercase tracking-widest text-muted-foreground mb-4">Your Price Today</p>
              <div className="flex flex-col items-center gap-2">
                 <span className="text-7xl font-black text-red-500 line-through decoration-4 opacity-80">$135</span>
                 <span className="text-8xl font-black" style={{ color: "var(--color-whatsapp)" }}>$10</span>
              </div>
              <p className="mt-6 text-xl font-bold rounded-full px-6 py-2 whitespace-nowrap" style={{ backgroundColor: "color-mix(in oklab, var(--color-whatsapp) 15%, transparent)", color: "var(--color-whatsapp)" }}>You save $125 (92% OFF)</p>
            </div>
            <div className="mt-8">
              <CTAButton onClick={openUpsell}>Claim $125 Discount</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── BONUSES ── */}
      <section className="bg-background">
        <div className="container-x py-20">
          <p className="section-label block w-full text-center">Free Bonuses</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">You Also Get These Bonuses</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                img: racketInclude,
                t: "Racket Included - Zero Equipment Needed",
                d: "Show up in sports clothes. We handle the rest. No gear? No problem.",
              },
              {
                img: starterPackCoupon,
                t: "$195 Off Your Starter Pack",
                d: "After your intro session, unlock an exclusive $195 discount on our Starter Pack - your gateway to regular play. Valid for 7 days after your session.",
              },
              {
                img: accessCommunity,
                t: "Access Boulder's #1 Sports Community",
                d: "Connect with hundreds of active players, find matches at your skill level, and experience the most vibrant sports scene in Colorado.",
                imgPos: "center 20%",
              },
            ].map((c) => (
              <div key={c.t} className="hover-lift rounded-2xl border bg-background p-8 shadow-sm">
                <div className="w-full aspect-video rounded-xl bg-muted relative mb-6 overflow-hidden">
                  <img src={c.img} alt="" className="w-full h-full object-cover" style={c.imgPos ? { objectPosition: c.imgPos } : {}} />
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
            What Players Are Saying
          </h2>

          <div className="mx-auto mt-10 w-full max-w-xs overflow-hidden rounded-2xl shadow-xl border relative aspect-[9/16]">
            <iframe
              src="https://www.youtube.com/embed/9NsHGpTT0sM?autoplay=0&loop=1&playlist=9NsHGpTT0sM"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            ></iframe>
          </div>

          <p className="mt-10 text-center text-xl font-bold">
            Over 2,800 players are part of our community.
          </p>

          {/* Review Carousel */}
          <div className="mt-12 overflow-hidden w-full relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6 shrink-0">
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
                      q: "Loving learning a new sport at Smash Padel! Great exercise, fun people, open play, clinics - they have it all!",
                    },
                    {
                      n: "John D.",
                      q: "Never played before but the coach was amazing. I was rallying by the end of the hour! Highly recommended for anyone wanting to try.",
                    },
                  ].map((r, j) => (
                    <div
                      key={j}
                      className="w-80 shrink-0 overflow-hidden rounded-2xl border bg-background shadow-sm flex flex-col hover-lift"
                    >
                      <div className="h-48 w-full bg-muted relative">
                        <img src={heroImg} loading="lazy" alt="Player photo" className="h-full w-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-white drop-shadow-md">Foto do Aluno</div>
                      </div>
                      <div className="p-6 flex flex-col grow">
                        <p className="text-foreground flex-grow leading-relaxed">"{r.q}"</p>
                        <div className="mt-6 flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                            style={{ backgroundColor: "var(--color-primary)" }}
                          >
                            {r.n.split(" ").map((w) => w[0]).join("")}
                          </div>
                          <p className="text-sm font-bold">{r.n}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION / MAP ── */}
      <section className="bg-background border-t">
        <div className="container-x py-20 text-center">
          <p className="section-label block w-full text-center">Our Location</p>
          <h2 className="text-center text-4xl font-extrabold md:text-5xl">Where To Find Us</h2>
          <p className="mt-4 text-lg text-muted-foreground">Conveniently located at 6455 Spine Rd Unit A, Boulder, CO 80301. Free parking available.</p>
          <div className="mx-auto mt-10 w-full max-w-4xl aspect-video md:aspect-[21/9] rounded-2xl bg-muted overflow-hidden flex items-center justify-center relative border shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=6455%20Spine%20Rd%20Unit%20A,%20Boulder,%20CO%2080301&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
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
            <span style={{ color: "var(--color-primary)" }}>Not Just Any Court</span>
          </h2>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              {
                img: certificatedCoach,
                t: "Certified Coach Included",
                d: "Not just an open court rental. You learn correctly from day one.",
              },
              {
                img: smallGroup,
                t: "Small Group of 4 Max",
                d: "No crowded classes. Personal attention at your pace.",
              },
              {
                img: equipmentIncluded,
                t: "All Equipment Provided",
                d: "Show up in sports clothes. That's it.",
              },
              {
                img: beginnerGroup,
                t: "Beginner-Only Group",
                d: "Everyone's a first-timer. Zero judgment, 100% fun.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-white/10 p-7 transition duration-200 hover:border-white/20 hover:bg-white/5 flex flex-col text-center items-center"
              >
                <div className="mb-6 w-full aspect-video rounded-xl overflow-hidden border border-white/10 relative">
                  <img src={c.img} alt={c.t} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white">{c.t}</h3>
                <p className="mt-2 text-white/60">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-6 max-w-2xl">
            <div className="rounded-2xl border border-white/10 p-7 text-center transition duration-200 hover:border-white/20 hover:bg-white/5 flex flex-col items-center">
              <div className="mb-6 w-full aspect-[21/9] rounded-xl overflow-hidden border border-white/10 relative">
                <img src={boulderCommunity} alt="Boulder's #1 Padel Community" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-white">Boulder's #1 Padel Community</h3>
              <p className="mt-2 text-white/60">2,800+ players. Find your people on and off the court.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXCLUSIVITY / URGENCY ── */}
      <section style={{ backgroundColor: "var(--color-soft)" }} className="relative border-y border-border/50">
        <div className="container-x py-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 shadow-sm">
             <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-xs font-bold uppercase tracking-wider text-foreground/80">
               Boulder, CO • High Demand
             </span>
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Why We Cap Our Intro Sessions To <span style={{ color: "var(--color-primary)" }}>12 Players</span> Weekly
          </h2>

          <div className="mx-auto mt-10 mb-8 max-w-4xl aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-2xl shadow-xl border border-border/50 relative">
            <img src={limitedSpots} alt="Limited spots" className="w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
          </div>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We refuse to pack the courts. To guarantee a premium experience, every beginner session is strictly limited to 4 players per coach. This ensures you actually learn the game, get personalized feedback, and have a great time doing it.
          </p>
          <p className="mt-4 text-lg font-medium text-foreground">
            Because of this, our $10 intro slots in Boulder book out days in advance.
          </p>
          <div className="mt-10">
            <CTAButton onClick={openUpsell}>Secure Your $10 Spot Now</CTAButton>
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Takes 60 seconds.
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
          <p className="mt-4 text-lg font-medium">Chat with us on WhatsApp - we answer in minutes.</p>
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
                "Yes! You'll see an option to add a friend during checkout at a special price. Padel is way more fun with someone you know.",
              ],
              [
                "What happens after the intro session?",
                "You'll receive an exclusive $195 discount on our Starter Pack - valid for 7 days. No pressure. Most people just want to keep playing.",
              ],
              [
                "Is the $10 a recurring charge?",
                "No. It's a one-time session fee. No subscriptions, no hidden charges.",
              ],
              [
                "How do I book?",
                'Click any "Claim $125 Discount" button on this page. The process takes about 60 seconds.',
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
            <CTAButton onClick={openUpsell}>Claim $125 Discount</CTAButton>
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
            <CTAButton onClick={openUpsell}>Claim $125 Discount</CTAButton>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "var(--color-dark)" }} className="text-white/80">
        <div className="container-x grid gap-10 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Smash Padel Logo" className="h-8 w-auto brightness-0 invert" />
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
              <li>Open 7 Days: 9:00 AM – 11:00 PM</li>
              <li>Location: Boulder, CO</li>
              <li>Phone: +1 720-340-5110</li>
              <li>Contact: info@smashpadelusa.com</li>
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
