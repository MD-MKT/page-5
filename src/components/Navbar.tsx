import logoImg from "@/assets/logo.png";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-center">
        <a
          href="#top"
          className="flex flex-col items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Smash Padel - back to top"
        >
          <img src={logoImg} alt="Smash Padel" className="h-8 w-auto" />
          <span className="mt-0.5 text-[9px] font-bold uppercase text-muted-foreground">
            Boulder, Colorado
          </span>
        </a>
      </div>
    </header>
  );
}
