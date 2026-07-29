import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CTAButton } from "./CTAButton";
import { INTRO_CTA_LABEL, trackIntroEvent, type IntroCtaLocation } from "@/lib/analytics";

const CHECKOUT_LEAD_STORAGE_KEY = "smashCheckoutLead";

const sanitizeLeadValue = (value: string) => value.trim().replace(/^["']+|["']+$/g, "");

export function UpsellModal({
  open,
  onOpenChange,
  ctaLocation,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  ctaLocation: IntroCtaLocation;
}) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const MAKE_WEBHOOK = "https://hook.us2.make.com/cotm4s3mtjcshw7lv3k5xmx8wkb3usjj";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeLeadValue(name);
    const lead = {
      name: cleanName,
      email: sanitizeLeadValue(email),
      phone: sanitizeLeadValue(phone),
    };

    const checkoutSearch =
      typeof window === "undefined"
        ? {}
        : Object.fromEntries(new URLSearchParams(window.location.search));

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(CHECKOUT_LEAD_STORAGE_KEY, JSON.stringify(lead));
    }

    const webhookBody = new URLSearchParams({
      timestamp: new Date().toISOString(),
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      page: "page-4",
    });

    Object.entries(checkoutSearch).forEach(([key, value]) => {
      if (key.startsWith("utm_") || ["fbclid", "campaign_id", "adset_id", "ad_id"].includes(key)) {
        webhookBody.set(key, value);
      }
    });

    fetch(MAKE_WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      body: webhookBody,
    }).catch(() => {});

    trackIntroEvent("intro_lead_submitted", {
      cta_location: ctaLocation,
      cta_label: INTRO_CTA_LABEL,
    });

    onOpenChange(false);
    navigate({ to: "/checkout", search: checkoutSearch });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92dvh] w-[calc(100%-2rem)] max-w-lg flex-col overflow-y-auto rounded-2xl p-0 sm:w-full">
        {/* Scrollable content */}
        <div className="flex flex-col gap-0 p-6 sm:p-8">
          <DialogTitle className="text-xl font-extrabold leading-tight sm:text-2xl">
            Enter your details once
          </DialogTitle>

          <DialogDescription className="mt-2 text-sm text-muted-foreground sm:text-base">
            We'll use them to pre-fill the booking page. Next, you'll choose your date and complete
            payment.
          </DialogDescription>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" htmlFor="modal-name">
                Full Name
              </label>
              <input
                id="modal-name"
                type="text"
                required
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-input bg-background px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" htmlFor="modal-email">
                Email
              </label>
              <input
                id="modal-email"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-input bg-background px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" htmlFor="modal-phone">
                Phone
              </label>
              <input
                id="modal-phone"
                type="tel"
                required
                placeholder="+1 (720) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-lg border border-input bg-background px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Button always visible — not inside scroll trap */}
            <div className="mt-2">
              <CTAButton type="submit" className="w-full">
                Book Your $10 Intro
              </CTAButton>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Secure and private. Your details pre-fill checkout.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
