import { CTAButton } from "./CTAButton";

export function Navbar({ onCTA }: { onCTA: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-md font-black text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            S
          </div>
          <span className="text-lg font-extrabold tracking-tight">SMASH PADEL</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#what" className="text-sm font-semibold text-foreground hover:text-primary">What is Padel</a>
          <a href="#about" className="text-sm font-semibold text-foreground hover:text-primary">About</a>
          <a href="#memberships" className="text-sm font-semibold text-foreground hover:text-primary">Memberships</a>
        </nav>
        <CTAButton className="!px-6 !py-3 !text-sm" onClick={onCTA}>
          Claim $10 Offer
        </CTAButton>
      </div>
    </header>
  );
}
