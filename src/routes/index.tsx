import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechBalloons } from "@/components/TechBalloons";
import { MarqueeSkills } from "@/components/MarqueeSkills";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SiteAnimations } from "@/components/SiteAnimations";
import { SectionCard } from "@/components/SectionCard";
import { ScrollTiltShowcase } from "@/components/ScrollTiltShowcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aryan Patel — Website Developer & Freelancer" },
      {
        name: "description",
        content:
          "Aryan Patel — 4+ years building high-performance, conversion-focused websites for content creators, brands, and visionaries worldwide.",
      },
      { property: "og:title", content: "Aryan Patel — Website Developer & Freelancer" },
      {
        property: "og:description",
        content:
          "High-performance websites for content creators & growing brands. 4+ years experience.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteAnimations />
      <Navbar />
      <main>
        <Hero />
        <MarqueeSkills />
        <div className="space-y-6 md:space-y-10 px-3 md:px-6 py-6">
          <SectionCard><TechBalloons /></SectionCard>
          <SectionCard><About /></SectionCard>
          <SectionCard><Services /></SectionCard>
          <SectionCard><Work /></SectionCard>
          <SectionCard><Process /></SectionCard>
          <SectionCard><Testimonials /></SectionCard>
          <SectionCard><Contact /></SectionCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
