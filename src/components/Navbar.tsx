import logoImg from "@/assets/logo.png"; // PNG mantido para suporte a transparência no logo
import { Instagram } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.5 6.2c-1.5 0-2.9-.6-3.9-1.6V15a5.5 5.5 0 1 1-5.5-5.5v3a2.5 2.5 0 1 0 2.5 2.5V2h3a4.5 4.5 0 0 0 3.9 4.2z" />
    </svg>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <div className="flex gap-3 text-muted-foreground">
          <a
            href="https://www.instagram.com/smashpadelusa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-foreground"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.tiktok.com/@smashpadelusa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="transition-colors hover:text-foreground"
          >
            <TikTokIcon className="h-5 w-5" />
          </a>
        </div>

        <a href="/" className="flex flex-col items-center">
          <img src={logoImg} alt="Smash Padel Logo" className="h-9 w-auto" />
          <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-0.5">Colorado's #1 Padel Club</span>
        </a>

        {/* Spacer para manter logo centralizado */}
        <div className="w-16" />
      </div>
    </header>
  );
}
