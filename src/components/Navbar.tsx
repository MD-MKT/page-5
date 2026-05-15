import logoImg from "@/assets/logo.png";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-center">
        <a href="/" className="flex flex-col items-center">
          <img src={logoImg} alt="Smash Padel Logo" className="h-9 w-auto" />
          <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-0.5">Colorado's First Padel Club</span>
        </a>
      </div>
    </header>
  );
}
