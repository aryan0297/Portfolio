import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { GitHubSection } from '@/components/sections/github-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ResumeSection } from '@/components/sections/resume-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { TechStackSection } from '@/components/sections/tech-stack-section';

/**
 * Single-page composition. Section order follows the reader's questions:
 * who → why trust them → what have they built → what do they know →
 * proof → the document → how to reach them.
 *
 * Revalidated hourly so the GitHub section stays current without a redeploy.
 */
export const revalidate = 3600;

export default function HomePage() {
  return (
    <main id="main" className="relative">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <TechStackSection />
      <GitHubSection />
      <ResumeSection />
      <ContactSection />
    </main>
  );
}
