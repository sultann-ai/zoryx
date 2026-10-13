"use client";

import clsx from "clsx";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { headerCta, nav, uiLabels } from "@/content/site";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    function onResize() {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <header
        className={clsx(
          "on-dark sticky top-0 z-40 text-cream transition-colors duration-150",
          scrolled ? "bg-green/85 backdrop-blur-md" : "bg-green",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 lg:grid lg:h-18 lg:grid-cols-[1fr_auto_1fr]">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-sm">
            <Logo variant="reversed" showPos />
          </Link>

          <nav aria-label={uiLabels.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-pill bg-green-deep p-1">
              {nav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={clsx(
                        "text-body inline-flex min-h-11 items-center rounded-pill px-4 font-medium transition-colors duration-150",
                        active ? "bg-cream text-green" : "text-cream hover:bg-cream/10",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end">
            <div className="hidden lg:block">
              <Button
                variant="cream"
                size="sm"
                href={headerCta.href}
                trackEvent="cta_demo_click"
                trackLocation="header"
              >
                {headerCta.label}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={uiLabels.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex size-11 items-center justify-center rounded-pill lg:hidden"
            >
              <Menu aria-hidden="true" size={28} />
            </button>
          </div>
        </Container>
      </header>
      {/* Rendered outside <header>: backdrop-filter would trap its fixed positioning. */}
      <MobileMenu open={menuOpen} pathname={pathname} onClose={closeMenu} />
    </>
  );
}
