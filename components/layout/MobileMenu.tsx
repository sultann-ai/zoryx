"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/icons/Logo";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/Button";
import { contactPage, headerCta, nav, uiLabels } from "@/content/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface MobileMenuProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
}

const FOCUSABLE = "a[href], button:not([disabled])";

export function MobileMenu({ open, pathname, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={uiLabels.mobileNav}
      className="on-dark fixed inset-0 z-50 overflow-y-auto bg-green text-cream"
    >
      <div className="mx-auto flex min-h-full w-full max-w-site flex-col px-6 md:px-12">
        <div className="flex h-16 shrink-0 items-center justify-between">
          <Link href="/" onClick={onClose} className="inline-flex min-h-11 items-center rounded-sm">
            <Logo variant="reversed" showPos />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label={uiLabels.menuClose}
            className="flex size-11 items-center justify-center rounded-pill"
          >
            <X aria-hidden="true" size={28} />
          </button>
        </div>

        <nav aria-label={uiLabels.mobileNav} className="mt-8">
          <ul className="flex flex-col gap-2">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "font-display flex min-h-11 items-center py-2 text-[34px] leading-none font-extrabold tracking-tight",
                      active ? "text-lime" : "text-cream",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-12 flex flex-col gap-4 pb-12 sm:max-w-sm">
          <Button
            variant="cream"
            href={headerCta.href}
            onClick={onClose}
            trackEvent="cta_demo_click"
            trackLocation="mobile_menu"
          >
            {headerCta.label}
          </Button>
          <Button
            variant="secondary"
            href={buildWhatsAppLink()}
            icon={<WhatsAppIcon size={20} />}
            trackEvent="whatsapp_click"
            trackLocation="mobile_menu"
          >
            {contactPage.whatsappLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
