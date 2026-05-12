import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CTAButton } from "./CTAButton";

export function UpsellModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-8">
        <div
          className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          One-time offer
        </div>
        <DialogTitle className="text-3xl font-extrabold leading-tight">
          Before you go — bring a friend for just <span style={{ color: "var(--color-primary)" }}>$5 more</span>
        </DialogTitle>
        <DialogDescription className="mt-3 text-base text-muted-foreground">
          Padel is more fun with someone you know. Add a friend to your session for only $5 — normally $10.
          One-time offer, only available right now.
        </DialogDescription>
        <div className="mt-6 flex flex-col gap-3">
          <CTAButton onClick={() => onOpenChange(false)}>Yes, add a friend for $5</CTAButton>
          <button
            onClick={() => onOpenChange(false)}
            className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:underline"
          >
            No thanks, I'll go alone.
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
