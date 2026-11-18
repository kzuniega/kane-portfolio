"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import { FiX } from "react-icons/fi";
import { SiLaravel, SiNextdotjs, SiNuxtdotjs, SiReact, SiResend, SiSupabase, SiVite } from "react-icons/si";
import type { Project } from "@/data/projects";
import { Arrow } from "@/components/Arrow";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const technologyIcons: Record<string, IconType | undefined> = {
  Vite: SiVite,
  React: SiReact,
  Laravel: SiLaravel,
  "Nuxt.js": SiNuxtdotjs,
  Supabase: SiSupabase,
  "Next.js": SiNextdotjs,
  Resend: SiResend,
};

export function ProjectDetailsDialog({ project, children }: { project: Project; children: ReactNode }) {
  return (
    <Dialog>
      {children}
      <DialogContent className="project-dialog">
        <div className="project-dialog-header">
          <div>
            <p className="project-dialog-category"><span aria-hidden="true">/{project.number} · </span>{project.category}</p>
            <DialogTitle className="project-dialog-title">{project.title}</DialogTitle>
          </div>
          <DialogClose className="project-dialog-close" aria-label="Close project details">
            <FiX aria-hidden="true" focusable="false" />
          </DialogClose>
        </div>
        <div className="project-dialog-body">
          <div className="project-dialog-copy">
            <DialogDescription className="project-dialog-summary">{project.summary}</DialogDescription>
            <section className="project-contributions" aria-labelledby={`contributions-${project.number}`}>
              <h3 id={`contributions-${project.number}`} className="project-dialog-section-title">My contributions</h3>
              <ul className="contribution-list">
                {project.contributions.map(({ area, detail }, index) => (
                  <li key={area}>
                    <span className="contribution-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4 className="contribution-area">{area}</h4>
                      <p>{detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <aside className="project-dialog-support" aria-label="Project preview and technologies">
            {project.image && (
              <div className="project-dialog-image">
                <Image src={project.image.src} alt={project.image.alt} fill sizes="(max-width: 767px) 90vw, 360px" />
              </div>
            )}
            <div>
              <h3 className="project-dialog-stack-title">Built with</h3>
              <ul className="project-dialog-tags" aria-label="Project technologies and disciplines">
                {project.stack.map((tag) => {
                  const Icon = technologyIcons[tag];
                  return (
                    <li key={tag}>
                      {Icon && <Icon aria-hidden="true" focusable="false" />}
                      <span>{tag}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {project.href && (
              <a className="project-visit-link text-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} (opens in a new tab)`}>
                Visit project <Arrow />
              </a>
            )}
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
