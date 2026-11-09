import { Contact } from "@/components/Contact";
import { About } from "@/components/About";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectItem } from "@/components/ProjectItem";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div id="top" className="portfolio-page">
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <section id="work" aria-labelledby="work-heading" className="work-section page-shell">
          <div className="work-heading">
            <div className="work-heading-title">
              <h2 id="work-heading">Selected work</h2>
              <span className="work-count">({String(projects.length).padStart(2, "0")})</span>
            </div>
            <p className="work-note">
              <span className="work-note-emphasis">Most of my work is under NDA.</span>
              <br />Here’s a selection approved to share.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => <ProjectItem key={project.number} project={project} />)}
          </div>
        </section>
        <About />
      </main>
      <Contact />
    </div>
  );
}
