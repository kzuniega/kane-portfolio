import type { Project } from "@/data/projects";
import { ProjectImage } from "@/components/ProjectImage";
import { Reveal } from "@/components/Reveal";
import { ProjectDetailsDialog } from "@/components/ProjectDetailsDialog";
import { DialogTrigger } from "@/components/ui/dialog";

export function ProjectItem({ project }: { project: Project }) {
  return (
    <Reveal>
      <ProjectDetailsDialog project={project}>
        <article aria-labelledby={`project-${project.number}`} className="project-entry">
          <DialogTrigger asChild>
            <button type="button" className="project-card-trigger" aria-label={`Open me: ${project.title} project details and my contributions`}>
              <span className="project-card-preview">
                <ProjectImage src={project.image?.src} alt={project.image?.alt ?? ""} number={project.number} />
              </span>
            </button>
          </DialogTrigger>
          <div className="project-caption">
            <div className="project-heading">
              <h3 id={`project-${project.number}`} className="project-title">{project.title}</h3>
              <span className="project-number" aria-hidden="true">/{project.number}</span>
            </div>
            <p className="project-category">{project.category}</p>
            <ul aria-label="Project technologies and disciplines" className="project-tags">
              {project.stack.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
        </article>
      </ProjectDetailsDialog>
    </Reveal>
  );
}
