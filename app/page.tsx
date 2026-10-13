import { JsonLd } from "@/components/layout/JsonLd";
import { DemoVideo } from "@/components/sections/DemoVideo";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProblemBand } from "@/components/sections/ProblemBand";
import { SolutionsTabs } from "@/components/sections/SolutionsTabs";
import { Testimonial } from "@/components/sections/Testimonial";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { WhyZoryx } from "@/components/sections/WhyZoryx";
import { WorkPreview } from "@/components/sections/WorkPreview";
import { seo, testimonials } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";
import { localBusinessJsonLd } from "@/lib/structured-data";

export const metadata = buildMetadata(seo.home, "/");

export default function Page() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <main>
        <Hero />
        <DemoVideo />
        <ProblemBand />
        <SolutionsTabs />
        <WhoItsFor />
        <WorkPreview />
        <HowItWorks />
        <WhyZoryx />
        <Testimonial />
        <FaqPreview followsCream={testimonials.length === 0} />
        <FinalCta />
      </main>
    </>
  );
}
