import { Check } from "lucide-react";
import { LogoMark } from "@/components/icons/LogoMark";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features, whyZoryx } from "@/content/site";

const YES = "Yes";

function ComparisonValue({ value }: { value: string }) {
  if (value !== YES) return <>{value}</>;
  return (
    <>
      <Check aria-hidden="true" size={24} strokeWidth={3} className="text-green" />
      <span className="sr-only">{value}</span>
    </>
  );
}

export function WhyZoryx() {
  const { columnHeaders } = whyZoryx;
  const rows = whyZoryx.rows.filter((row) => !row.requiresFbr || features.fbrIntegration);

  return (
    <Section background="cream" deferRender={1430}>
      <SectionHeading background="cream" title={whyZoryx.heading} />

      {/* Tablet and desktop: table */}
      <div className="mt-12 hidden overflow-hidden rounded-lg border border-green/10 bg-white md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-green/10">
              <th scope="col" className="p-6">
                <span className="sr-only">{columnHeaders.feature}</span>
              </th>
              <th scope="col" className="w-1/4 bg-green/10 p-6">
                <span className="text-h3 flex items-center gap-3 text-green">
                  <LogoMark variant="primary" size={28} />
                  {columnHeaders.zoryx}
                </span>
              </th>
              <th scope="col" className="text-h3 w-1/4 p-6 text-ink">
                {columnHeaders.other}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-b border-green/10 last:border-b-0">
                <th scope="row" className="text-body p-6 font-bold text-green">
                  {row.feature}
                </th>
                <td className="text-body bg-green/10 p-6 font-bold text-green">
                  <span className="flex items-center">
                    <ComparisonValue value={row.zoryx} />
                  </span>
                </td>
                <td className="text-body p-6 text-ink">{row.other}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one stacked card per row */}
      <ul className="mt-12 space-y-4 md:hidden">
        {rows.map((row) => (
          <li key={row.feature}>
            <Card surface="white" className="p-4">
              <p className="text-body font-bold text-green">{row.feature}</p>
              <dl className="mt-4 space-y-2">
                <div className="rounded-md bg-green/10 p-3">
                  <dt className="text-label flex items-center gap-2 text-green">
                    <LogoMark variant="primary" size={16} />
                    {columnHeaders.zoryx}
                  </dt>
                  <dd className="text-body mt-1 flex items-center font-bold text-green">
                    <ComparisonValue value={row.zoryx} />
                  </dd>
                </div>
                <div className="p-3">
                  <dt className="text-label text-ink">{columnHeaders.other}</dt>
                  <dd className="text-body mt-1 text-ink">{row.other}</dd>
                </div>
              </dl>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
