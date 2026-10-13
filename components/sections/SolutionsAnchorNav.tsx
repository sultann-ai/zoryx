"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";

interface AnchorItem {
  id: string;
  label: string;
}

interface SolutionsAnchorNavProps {
  items: AnchorItem[];
  ariaLabel: string;
}

/** Sticky pill nav under the page hero. Highlights the section currently in view. */
export function SolutionsAnchorNav({ items, ariaLabel }: SolutionsAnchorNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // A section counts as current while it crosses the upper-middle band of the viewport.
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of items) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={ariaLabel}
      className="sticky top-16 z-30 border-b border-green/10 bg-cream/90 backdrop-blur-md lg:top-18"
    >
      <Container>
        <ul className="-mx-2 flex gap-2 overflow-x-auto px-2 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className={clsx(
                    "text-body inline-flex min-h-11 items-center rounded-pill border px-4 font-bold whitespace-nowrap transition-colors duration-150",
                    active
                      ? "border-green bg-green text-cream"
                      : "border-green/30 text-green hover:bg-green/10",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
