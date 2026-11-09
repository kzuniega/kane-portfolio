import type { Project } from "@/data/projects";
import { ProjectImage } from "@/components/ProjectImage";
import { Reveal } from "@/components/Reveal";
import { ContributionDetails } from "@/components/ContributionDetails";
import { ImagePreview } from "@/components/ImagePreview";

export function ProjectItem({ project }: { project: Project }) {
  const preview = <ProjectImage src={project.image?.src} alt={project.image?.alt ?? ""} number={project.number} />;

  return (
    <Reveal>
      <article aria-labelledby={`project-${project.number}`} className="project-entry">
        {project.image ? (
          <ImagePreview src={project.image.src} alt={project.image.alt} title={project.title} href={project.href}>
            {preview}
          </ImagePreview>
        ) : preview}
        <div className="project-caption">
          <div className="project-heading">
            <h3 id={`project-${project.number}`} className="project-title">
              {project.href ? (
                <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} (opens in a new tab)`}>{project.title}</a>
              ) : project.title}
            </h3>
            <span className="project-number" aria-hidden="true">/{project.number}</span>
          </div>
          <p className="project-category">{project.category}</p>
          <div className="project-description">
            <p className="project-summary">{project.summary}</p>
            <ContributionDetails projectTitle={project.title}>
              <ul className="contribution-list">
                {project.contributions.map(({ area, detail }) => (
                  <li key={area}>
                    <span className="contribution-area">{area}</span>
                    <p>{detail}</p>
                  </li>
                ))}
              </ul>
            </ContributionDetails>
            <ul aria-label="Project technologies and disciplines" className="project-tags">
              {project.stack.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
