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
      <Navbar />
      <main>
        <Hero />
        <MarqueeSkills />
        <TechBalloons />
        <About />
        <Services />
        <Work />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
