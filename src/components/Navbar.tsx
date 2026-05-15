export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-center">
        <a href="/" className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-md font-black text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              S
            </div>
            <span className="text-lg font-extrabold tracking-tight">SMASH PADEL</span>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-0.5">Colorado's First Padel Club</span>
        </a>
      </div>
    </header>
  );
}
