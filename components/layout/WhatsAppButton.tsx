"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { uiLabels } from "@/content/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const pathname = usePathname();
  // WhatsApp is already prominent on the contact page (FR-G3).
  if (pathname.startsWith("/contact")) return null;

  return (
    <TrackedLink
      href={buildWhatsAppLink()}
      event="whatsapp_click"
      location="floating_button"
      aria-label={uiLabels.whatsappFloat}
      className="fixed right-[calc(16px+env(safe-area-inset-right))] bottom-[calc(16px+env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full bg-lime text-green shadow-card transition duration-150 hover:-translate-y-0.5 hover:brightness-[0.94] focus-visible:ring-4 focus-visible:ring-cream"
    >
      <WhatsAppIcon size={28} />
    </TrackedLink>
  );
}
