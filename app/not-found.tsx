import type { Metadata } from "next";
import { Scooter } from "@/components/icons/Scooter";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { notFound } from "@/content/site";

export const metadata: Metadata = { title: notFound.heading };

export default function NotFound() {
  return (
    <main>
      <Section background="cream">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Scooter size={160} className="text-green" />
          <h1 className="text-h2 mt-8 text-green text-balance">{notFound.heading}</h1>
          <p className="text-body-lg mt-4 text-ink">{notFound.text}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button variant="onCream" href="/">
              {notFound.homeLabel}
            </Button>
            <Button variant="outlineOnCream" href="/contact">
              {notFound.contactLabel}
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
