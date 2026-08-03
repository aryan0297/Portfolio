import { ProjectCard } from '@/components/sections/projects/project-card';
import { Section, SectionHeading } from '@/components/shared/section';
import { projects } from '@/constants/projects';

/**
 * Projects.
 *
 * Design decision: the grid shows only what a recruiter needs to decide whether
 * to keep reading — category, title, one line, four technologies. The full
 * case study (problem, solution, architecture, challenges, impact) lives in a
 * modal, so depth is available on demand instead of being paid for up front in
 * both scroll length and bundle size.
 */
export function ProjectsSection() {
  return (
    <Section id="projects" ambient>
      <SectionHeading
        id="projects"
        eyebrow="Selected work"
        title="Systems I designed, built, and shipped"
        description="Three production backends. Open any card for the full case study — problem, architecture, the parts that were genuinely hard, and what it changed."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
