import { Section } from "@/components/ui/Section";

interface LegalDocumentProps {
  title: string;
  /**
   * Plain text from content. Blank lines separate blocks; a block starting with "## " is an h2,
   * anything else is a paragraph.
   */
  body: string;
}

const HEADING_PREFIX = "## ";

export function LegalDocument({ title, body }: LegalDocumentProps) {
  const blocks = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <main>
      <Section background="cream">
        <article className="max-w-[720px]">
          <h1 className="text-h2 text-green text-balance">{title}</h1>
          <div className="mt-8 space-y-6">
            {blocks.map((block, index) =>
              block.startsWith(HEADING_PREFIX) ? (
                <h2 key={index} className="text-h3 pt-4 text-green">
                  {block.slice(HEADING_PREFIX.length)}
                </h2>
              ) : (
                <p key={index} className="text-body-lg text-ink">
                  {block}
                </p>
              ),
            )}
          </div>
        </article>
      </Section>
    </main>
  );
}
