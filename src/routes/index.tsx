import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, Play } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CTAButton } from "@/components/CTAButton";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { UpsellModal } from "@/components/UpsellModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackIntroCtaClick, trackIntroEvent, type IntroCtaLocation } from "@/lib/analytics";
import heroPoster from "@/assets/hero-lcp-poster.webp";
import ctaBackground from "@/assets/cta-background.webp";
import logoImg from "@/assets/logo-topo.png";

const CTA_LABEL = "Book Your $10 Intro";

const VALUE_ITEMS = [
  "60-minute coached session",
  "Racket rental included (normally $15 on its own)",
  "Small beginner group, same skill level as you",
  "Full walkthrough of rules and basics - no experience needed",
];

const FIRST_TIMER_BENEFITS = [
  "$105 off your starter pack if you decide to keep playing",
  "Access to exclusive Smash Padel events",
];

const HOW_IT_WORKS = [
  {
    number: "1",
    title: "Choose your session",
    description: "Enter your details once, then pick an available date and time before paying.",
  },
  {
    number: "2",
    title: "Show up as you are",
    description: "We provide the racket, equipment, coach, and other beginner players.",
  },
  {
    number: "3",
    title: "Play your first game",
    description: "Learn the basics and start playing during your 60-minute session.",
  },
];

const FAQ_ITEMS = [
  [
    "What is Padel?",
    "Padel is a social racket sport played on an enclosed court. Your coach explains the rules and gets you playing during your first session.",
  ],
  [
    "Do I need any experience?",
    "No. This session starts from zero and is designed for first-time players.",
  ],
  [
    "Do I need to bring a partner?",
    "No. We place you with other beginner players, so you can book on your own.",
  ],
  [
    "Is equipment included?",
    "Yes. Racket, balls, court time, and coach-led instruction are included.",
  ],
  ["What should I wear?", "Wear comfortable athletic clothes and sneakers or court shoes."],
  ["How long is the session?", "The Intro to Padel session lasts 60 minutes."],
  [
    "Do I choose a date before paying?",
    "Yes. On the next page, you choose an available date and time before completing payment.",
  ],
  [
    "Do I need to download an app?",
    "No. You can complete the entire booking online without downloading an app.",
  ],
  [
    "Where is Smash Padel located?",
    "We are at 6455 Spine Rd Unit A, Boulder, CO 80301. Free parking is available.",
  ],
  [
    "What happens after the intro session?",
    "If you decide to keep playing, first-timers receive $105 off the Smash Padel Starter Pack.",
  ],
];

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Try Padel in Boulder for $10 | Smash Padel" },
      {
        name: "description",
        content:
          "Book a 60-minute beginner Padel session in Boulder for $10. Coach and racket included. No partner or experience needed.",
      },
      { property: "og:title", content: "Try Padel in Boulder for $10 | Smash Padel" },
      {
        property: "og:description",
        content:
          "A 60-minute beginner session with a coach. Racket included. No partner or experience needed.",
      },
      { property: "og:url", content: "https://intro5.smashpadelusa.com/" },
    ],
    links: [
      { rel: "preload", as: "image", href: heroPoster },
      { rel: "canonical", href: "https://intro5.smashpadelusa.com/" },
    ],
  }),
});

function LazyYouTube({
  videoId,
  title,
  location,
}: {
  videoId: string;
  title: string;
  location: string;
}) {
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
      onClick={() => {
        trackIntroEvent("intro_video_play", { video_location: location, autoplay: false });
        setPlaying(true);
      }}
      className="group absolute inset-0 h-full w-full cursor-pointer border-0 bg-black"
      aria-label={`Play ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="h-full w-full object-cover opacity-90"
        loading="lazy"
        decoding="async"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-105">
          <Play className="ml-0.5 h-7 w-7 text-gray-900" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}

function Landing() {
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [activeCtaLocation, setActiveCtaLocation] = useState<IntroCtaLocation>("hero");
  const [showStickyCta, setShowStickyCta] = useState(false);
  const heroCtaRef = useRef<HTMLDivElement | null>(null);
  const finalCtaRef = useRef<HTMLElement | null>(null);
  const heroVideoPlayTrackedRef = useRef(false);
  const heroVideoCompleteTrackedRef = useRef(false);

  const keepHeroVideoMuted = (video: HTMLVideoElement | null) => {
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
  };

  const openUpsell = (location: IntroCtaLocation) => {
    trackIntroCtaClick(location);
    setActiveCtaLocation(location);
    setUpsellOpen(true);
  };

  const handleHeroVideoPlay = (video: HTMLVideoElement) => {
    keepHeroVideoMuted(video);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    if (!heroVideoPlayTrackedRef.current) {
      heroVideoPlayTrackedRef.current = true;
      trackIntroEvent("intro_video_play", { video_location: "hero", autoplay: true });
    }
  };

  const handleHeroVideoProgress = (video: HTMLVideoElement) => {
    if (
      !heroVideoCompleteTrackedRef.current &&
      Number.isFinite(video.duration) &&
      video.duration > 0 &&
      video.currentTime / video.duration >= 0.9
    ) {
      heroVideoCompleteTrackedRef.current = true;
      trackIntroEvent("intro_video_complete", { video_location: "hero" });
    }
  };

  useEffect(() => {
    trackIntroEvent("intro_landing_view");
  }, []);

  useEffect(() => {
    const heroCta = heroCtaRef.current;
    const finalCta = finalCtaRef.current;
    if (!heroCta || !finalCta || !("IntersectionObserver" in window)) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let heroVisible = true;
    let finalVisible = false;

    const updateStickyCta = () => {
      setShowStickyCta(mobileQuery.matches && !heroVisible && !finalVisible);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroCta) heroVisible = entry.isIntersecting;
          if (entry.target === finalCta) finalVisible = entry.isIntersecting;
        });
        updateStickyCta();
      },
      { threshold: 0.15 },
    );

    observer.observe(heroCta);
    observer.observe(finalCta);
    mobileQuery.addEventListener("change", updateStickyCta);

    return () => {
      observer.disconnect();
      mobileQuery.removeEventListener("change", updateStickyCta);
    };
  }, []);

  return (
    <div
      id="top"
      className={`min-h-screen bg-background text-foreground md:pb-0 ${
        showStickyCta ? "pb-24" : ""
      }`}
    >
      <Navbar />

      <section className="bg-background">
        <div className="container-x flex flex-col items-center pb-7 pt-5 text-center md:pb-10 md:pt-8">
          <p className="section-label">Beginner-friendly · Boulder, CO</p>
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-[1.12] sm:text-4xl md:text-5xl lg:text-[54px]">
            Try Padel in Boulder for <span style={{ color: "var(--color-primary)" }}>$10</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            A 60-minute beginner session with a coach. Racket included. No partner or experience
            needed.
          </p>

          <ul className="mx-auto mt-5 grid gap-2 text-left sm:grid-cols-2 sm:gap-x-6">
            {[
              "No partner needed",
              "Rackets included",
              "Small beginner group",
              "Learn and play in your first session",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: "var(--color-whatsapp)" }}
                  strokeWidth={3}
                />
                <span className="text-[15px] font-semibold leading-snug sm:text-base">{item}</span>
              </li>
            ))}
          </ul>

          <div ref={heroCtaRef} className="mt-5 w-full">
            <CTAButton
              onClick={() => openUpsell("hero")}
              className="w-full max-w-xs px-5 text-base"
            >
              {CTA_LABEL}
            </CTAButton>
            <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
              Choose your date before paying. No app required.
            </p>
          </div>
        </div>

        <div className="pointer-events-none relative aspect-video w-full overflow-hidden md:max-h-[500px]">
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
            onPlay={(event) => handleHeroVideoPlay(event.currentTarget)}
            onTimeUpdate={(event) => handleHeroVideoProgress(event.currentTarget)}
            onVolumeChange={(event) => keepHeroVideoMuted(event.currentTarget)}
          >
            <source src="/hero-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section id="about" className="border-t bg-background">
        <div className="container-x py-12 text-center md:py-16">
          <p className="section-label">Real player story</p>
          <h2 className="text-3xl font-extrabold md:text-4xl">What players are saying</h2>
          <div className="relative mx-auto mt-7 aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-lg border shadow-sm sm:max-w-xs">
            <LazyYouTube
              videoId="9NsHGpTT0sM"
              title="Smash Padel player testimonial"
              location="social_proof"
            />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
            See how a real player describes the Smash Padel experience.
          </p>
          <div className="mt-6">
            <CTAButton onClick={() => openUpsell("social_proof")}>{CTA_LABEL}</CTAButton>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--color-soft)" }}>
        <div className="container-x py-14 md:py-16">
          <p className="section-label block w-full text-center">Everything included</p>
          <h2 className="text-center text-3xl font-extrabold md:text-4xl">
            Here's everything you get for $10
          </h2>

          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-lg border bg-background">
            {VALUE_ITEMS.map((item) => (
              <div key={item} className="flex items-start gap-3 border-b px-5 py-4 last:border-b-0">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="font-medium">{item}</span>
              </div>
            ))}

            <div className="border-t px-5 py-5" style={{ backgroundColor: "var(--color-soft)" }}>
              <p className="text-sm font-bold uppercase text-muted-foreground">
                Plus, first-timers get:
              </p>
              <div className="mt-4 space-y-3">
                {FIRST_TIMER_BENEFITS.map((item) => (
                  <div key={item} className="flex items-start gap-3 font-medium">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: "var(--color-whatsapp)" }}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="mx-auto max-w-sm rounded-lg border bg-background px-6 py-7 shadow-sm">
              <p className="text-sm font-bold uppercase text-muted-foreground">Your price today</p>
              <div className="mt-3 flex items-baseline justify-center gap-4">
                <span className="text-3xl font-black text-red-500 line-through">$50</span>
                <span className="text-6xl font-black" style={{ color: "var(--color-whatsapp)" }}>
                  $10
                </span>
              </div>
              <p className="mt-2 font-bold" style={{ color: "var(--color-whatsapp)" }}>
                You save $40
              </p>
            </div>
            <h3 className="mt-8 text-2xl font-extrabold">Ready to try it?</h3>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              You don't need experience, equipment, or a partner. We'll walk you through the rest.
            </p>
            <div className="mt-5">
              <CTAButton onClick={() => openUpsell("value")}>{CTA_LABEL}</CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t bg-background">
        <div className="container-x py-14 md:py-16">
          <p className="section-label block w-full text-center">Simple process</p>
          <h2 className="text-center text-3xl font-extrabold md:text-4xl">How it works</h2>
          <div className="mx-auto mt-8 grid max-w-5xl border-y md:grid-cols-3">
            {HOW_IT_WORKS.map((step, index) => (
              <article
                key={step.number}
                className={`px-5 py-7 text-center ${
                  index > 0 ? "border-t md:border-l md:border-t-0" : ""
                }`}
              >
                <span className="text-3xl font-black" style={{ color: "var(--color-primary)" }}>
                  {step.number}
                </span>
                <h3 className="mt-2 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="what" className="border-t bg-background">
        <div className="container-x py-14 text-center md:py-16">
          <p className="section-label">See it in action</p>
          <h2 className="mx-auto max-w-lg text-2xl font-extrabold leading-tight md:text-3xl">
            See what your first session feels like
          </h2>
          <div className="relative mx-auto mt-7 aspect-video max-w-4xl overflow-hidden rounded-lg border">
            <LazyYouTube
              videoId="y7IO2jaqf58"
              title="See what your first session feels like"
              location="session_explainer"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            A quick look at the experience before you book.
          </p>
        </div>
      </section>

      <section className="border-t bg-background">
        <div className="container-x py-14 text-center md:py-16">
          <p className="section-label">Our location</p>
          <h2 className="text-3xl font-extrabold md:text-4xl">Where to find us</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            6455 Spine Rd Unit A, Boulder, CO 80301. Free parking available.
          </p>
          <div className="relative mx-auto mt-7 aspect-video w-full max-w-4xl overflow-hidden rounded-lg border bg-muted md:aspect-[21/9]">
            <iframe
              src="https://maps.google.com/maps?q=6455%20Spine%20Rd%20Unit%20A,%20Boulder,%20CO%2080301&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              title="Smash Padel location in Boulder"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>

      <section id="memberships" style={{ backgroundColor: "var(--color-soft)" }}>
        <div className="container-x mx-auto max-w-3xl py-14 md:py-16">
          <p className="section-label block w-full text-center">FAQ</p>
          <h2 className="text-center text-3xl font-extrabold md:text-4xl">
            Your questions, answered
          </h2>
          <Accordion type="single" collapsible className="mt-7">
            {FAQ_ITEMS.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index}`} className="border-b">
                <AccordionTrigger className="py-4 text-left text-base font-bold hover:no-underline sm:text-lg">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section ref={finalCtaRef} className="relative overflow-hidden">
        <img
          src={ctaBackground}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/85" />
        <div className="container-x relative py-20 text-center text-white md:py-24">
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Ready to try Padel?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Your first beginner session is $10. Coach and racket included.
          </p>
          <div className="mt-7">
            <CTAButton onClick={() => openUpsell("final")}>{CTA_LABEL}</CTAButton>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: "var(--color-dark)" }} className="text-white/80">
        <div className="container-x grid gap-8 py-10 md:grid-cols-2 md:items-center">
          <div>
            <img
              src={logoImg}
              alt="Smash Padel"
              className="h-8 w-auto brightness-0 invert"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-3 text-sm">Beginner-friendly Padel in Boulder, Colorado.</p>
          </div>
          <div className="text-sm md:text-right">
            <p>6455 Spine Rd Unit A, Boulder, CO 80301</p>
            <p className="mt-1">+1 720-340-5110 · info@smashpadelusa.com</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
          © 2026 Smash Padel USA. All rights reserved.
        </div>
      </footer>

      <WhatsAppFloat className={showStickyCta ? "bottom-28 sm:bottom-28 md:bottom-6" : undefined} />

      {showStickyCta && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 shadow-[0_-12px_30px_rgba(0,0,0,0.12)] backdrop-blur md:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto max-w-sm text-center">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">
              No experience needed.
            </p>
            <CTAButton
              onClick={() => openUpsell("sticky_mobile")}
              className="w-full px-4 py-3 text-sm"
            >
              {CTA_LABEL}
            </CTAButton>
          </div>
        </div>
      )}

      <UpsellModal open={upsellOpen} onOpenChange={setUpsellOpen} ctaLocation={activeCtaLocation} />
    </div>
  );
}
