import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { CTAButton } from "./CTAButton";
import { INTRO_CTA_LABEL, trackIntroEvent, type IntroCtaLocation } from "@/lib/analytics";
import { createSmsConsentFields, normalizePhoneToE164 } from "@/lib/checkout-lead";

const CHECKOUT_LEAD_STORAGE_KEY = "smashCheckoutLead";
const SMS_TERMS_URL = "https://www.playbypoint.com/terms-of-use/";
const PRIVACY_POLICY_URL =
  "https://bookings.smashpadelusa.com/f/smashpadelusa/pages/privacy-policy-6d0e884a-f7cc-48a9-9aee-3200b0499b59";

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
  const [phoneError, setPhoneError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInFlightRef = useRef(false);
  const submissionIdRef = useRef<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionInFlightRef.current) return;

    const normalizedPhone = normalizePhoneToE164(phone);
    if (!normalizedPhone) {
      setPhoneError("Enter a valid phone number, including country code if outside the U.S.");
      return;
    }

    submissionInFlightRef.current = true;
    setIsSubmitting(true);
    setSubmissionError("");

    const cleanName = sanitizeLeadValue(name);
    const submittedAt = new Date().toISOString();
    const smsConsentFields = createSmsConsentFields(smsOptIn, submittedAt);
    const submissionId =
      submissionIdRef.current ??
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    submissionIdRef.current = submissionId;
    const lead = {
      name: cleanName,
      email: sanitizeLeadValue(email),
      phone: normalizedPhone,
    };

    const checkoutSearch =
      typeof window === "undefined"
        ? {}
        : Object.fromEntries(new URLSearchParams(window.location.search));

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(CHECKOUT_LEAD_STORAGE_KEY, JSON.stringify(lead));
    }

    const checkoutLead: Record<string, string | boolean | null> = {
      timestamp: submittedAt,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      page: "page-5",
      source: "page-5",
      submission_id: submissionId,
      ...smsConsentFields,
    };

    Object.entries(checkoutSearch).forEach(([key, value]) => {
      if (key.startsWith("utm_") || ["fbclid", "campaign_id", "adset_id", "ad_id"].includes(key)) {
        checkoutLead[key] = value;
      }
    });

    try {
      const response = await fetch("/api/checkout-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(checkoutLead),
        keepalive: true,
      });

      if (!response.ok) {
        throw new Error(`Lead capture failed with status ${response.status}`);
      }
    } catch {
      submissionInFlightRef.current = false;
      setIsSubmitting(false);
      setSubmissionError("We couldn't save your details. Check your connection and try again.");
      return;
    }

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
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) setPhoneError("");
                }}
                aria-invalid={Boolean(phoneError)}
                aria-describedby={phoneError ? "modal-phone-error" : undefined}
                className="rounded-lg border border-input bg-background px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-ring"
              />
              {phoneError && (
                <p
                  id="modal-phone-error"
                  role="alert"
                  className="text-xs font-medium text-destructive"
                >
                  {phoneError}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-input bg-muted/30 p-3">
              <input
                id="sms_opt_in"
                name="sms_opt_in"
                type="checkbox"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
              />
              <label htmlFor="sms_opt_in" className="text-xs leading-relaxed text-muted-foreground">
                By checking this box, I agree to receive recurring automated promotional texts from
                Smash Padel. Consent isn’t required to purchase. Msg &amp; data rates may apply.
                Reply STOP to opt out or HELP for help.{" "}
                <a
                  href={SMS_TERMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground underline underline-offset-2"
                >
                  Terms
                </a>{" "}
                |{" "}
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground underline underline-offset-2"
                >
                  Privacy
                </a>
              </label>
            </div>

            {/* Button always visible — not inside scroll trap */}
            <div className="mt-2">
              <CTAButton type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Opening checkout..." : "Book Your $10 Intro"}
              </CTAButton>
            </div>

            {submissionError && (
              <p role="alert" className="text-center text-xs font-medium text-destructive">
                {submissionError}
              </p>
            )}

            <p className="text-center text-xs text-muted-foreground">
              Secure and private. Your details pre-fill checkout.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
