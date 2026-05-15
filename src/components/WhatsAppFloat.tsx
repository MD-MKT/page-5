import { MessageCircle } from "lucide-react";

const WA_LINK =
  "https://wa.me/13035550100?text=Hi!%20I%20have%20a%20question%20about%20the%20%2410%20intro%20offer%20at%20Smash%20Padel.";

export function WhatsAppFloat() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform hover:scale-110 active:scale-95"
      style={{
        backgroundColor: "var(--color-whatsapp)",
        boxShadow: "0 4px 20px -4px color-mix(in oklab, var(--color-whatsapp) 70%, transparent), 0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* Coloque o logo do WhatsApp no src abaixo */}
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="h-8 w-8" />
    </a>
  );
}
