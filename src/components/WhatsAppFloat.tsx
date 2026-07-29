import { cn } from "@/lib/utils";

const WA_LINK =
  "https://wa.me/13035641103?text=Hi%21%20I%27m%20interested%20in%20the%20Intro%20to%20Padel%20and%20had%20a%20quick%20question.";

export function WhatsAppFloat({
  href = WA_LINK,
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14",
        className,
      )}
      style={{
        backgroundColor: "var(--color-whatsapp)",
        boxShadow:
          "0 4px 20px -4px color-mix(in oklab, var(--color-whatsapp) 70%, transparent), 0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-current sm:h-8 sm:w-8">
        <path d="M16.01 3.2A12.78 12.78 0 0 0 5.12 22.66L3.4 28.8l6.3-1.65A12.78 12.78 0 1 0 16.01 3.2Zm0 23.42a10.62 10.62 0 0 1-5.42-1.48l-.39-.23-3.74.98 1-3.63-.25-.38a10.64 10.64 0 1 1 8.8 4.74Zm5.84-7.96c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.15-.15.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.3 3.3c.16.21 2.26 3.45 5.48 4.84.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.77 2.17-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
