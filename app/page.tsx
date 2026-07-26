import { SiteFooter } from "@/components/footer/site-footer";
import { SiteNav } from "@/components/navigation/site-nav";
import { AboutSection } from "@/sections/about-section";
import { ContactSection } from "@/sections/contact-section";
import { HeroSection } from "@/sections/hero-section";
import { PersonalJourneySection } from "@/sections/personal-journey-section";
import { PhilosophySection } from "@/sections/philosophy-section";
import { TechnologyStackSection } from "@/sections/technology-stack-section";
import { WhatImBuildingSection } from "@/sections/what-im-building-section";
import { CertificationsSection } from "@/sections/certifications-section";
import { MilestonesSection } from "@/sections/milestones-section";

export default function HomePage() {
  return (
    <main className="bg-background">
      <SiteNav />
      <HeroSection />
      <AboutSection />
      <WhatImBuildingSection />
      <PhilosophySection />
      <TechnologyStackSection />
      <PersonalJourneySection />
      <CertificationsSection />
      <MilestonesSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
