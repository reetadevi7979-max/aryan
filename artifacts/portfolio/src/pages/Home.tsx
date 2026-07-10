import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechBalloons } from "@/components/TechBalloons";
import { MarqueeSkills } from "@/components/MarqueeSkills";
import { About } from "@/components/About";
import { WhyChooseMe } from "@/components/WhyChooseMe";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SiteAnimations } from "@/components/SiteAnimations";
import { SectionCard } from "@/components/SectionCard";

export function Home() {
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
        </div>

        {/* ── Why Choose Me — full-bleed scrollytelling ── */}
        <WhyChooseMe />

        <div className="space-y-6 md:space-y-10 px-3 md:px-6 py-6">
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
