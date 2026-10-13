"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useState } from "react";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/**
 * Disclosure list for cream backgrounds. Several items can be open at once.
 * An item opens automatically when the URL hash matches its id (deep links).
 * The height transition is switched off globally by prefers-reduced-motion.
 */
export function Accordion({ items, className }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    function openFromHash() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id || !items.some((item) => item.id === id)) return;
      setOpen((current) => new Set(current).add(id));
      // Wait for the open state to render, then bring the item into view.
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [items]);

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const buttonId = `${baseId}-button-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <div key={item.id} id={item.id} className="scroll-mt-24 border-b border-green/20">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="text-h3 flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-green"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  size={24}
                  className={clsx("shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            {/* 0fr -> 1fr animates height without measuring it; inert keeps closed content out of focus and the a11y tree. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={clsx(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-body max-w-[65ch] pb-6 text-ink">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
