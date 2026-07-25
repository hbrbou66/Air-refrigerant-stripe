import { SITE } from "@/lib/site";
import { IconWhatsApp } from "@/components/Icons";

/* Floating WhatsApp chat button, shown site-wide. Sits above the sticky mobile
   buy bar on product pages (bottom-24) and lower on desktop (lg:bottom-6). */
export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsappChat}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with us on WhatsApp at ${SITE.whatsappChatNumber}`}
      className="wa-fab fixed bottom-5 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 hover:bg-[#1da851] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 lg:bottom-6 lg:right-6"
    >
      <IconWhatsApp width={30} height={30} />
    </a>
  );
}
