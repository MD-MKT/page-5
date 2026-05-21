import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CTAButton } from "./CTAButton";

export function UpsellModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const SHEET_WEBHOOK =
    "https://script.google.com/macros/s/AKfycbxUtaI6fNHVULQTveIcnikkLndS52BBUt_RId-n6IXPlZj5XQDwWT7QN0QJ3XFfqVUx/exec";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent");
    }
    // Fire-and-forget: send lead to Google Sheets (no-cors because Apps Script doesn't return CORS headers)
    fetch(SHEET_WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: `${name} (Página 3)`, email, phone }),
    }).catch(() => {});
    onOpenChange(false);
    navigate({ to: "/checkout", search: { name, email, phone } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92dvh] w-[calc(100%-2rem)] max-w-lg flex-col overflow-y-auto rounded-2xl p-0 sm:w-full">
        {/* Scrollable content */}
        <div className="flex flex-col gap-0 p-6 sm:p-8">
          {/* Badge */}
          <div
            className="mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: "#dc2626" }}
          >
            ⚡ Limited spots — $10 offer
          </div>

          <DialogTitle className="text-xl font-extrabold leading-tight sm:text-2xl">
            One last step to lock in{" "}
            <span style={{ color: "var(--color-primary)" }}>your $10 spot</span>
          </DialogTitle>

          <DialogDescription className="mt-2 text-sm text-muted-foreground sm:text-base">
            Fill in your details and we'll send your confirmation instantly.
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
                Reserve My $10 Spot →
              </CTAButton>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              🔒 Secure & private. No spam, ever.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
