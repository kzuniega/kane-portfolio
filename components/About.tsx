import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ImagePreview } from "@/components/ImagePreview";
import { contact } from "@/data/contact";
import profileImage from "@/public/assets/profile-image.jpg";
import { FiDownload } from "react-icons/fi";
import { SiLaravel, SiMysql, SiNextdotjs, SiNuxtdotjs, SiPostgresql, SiPostman, SiPython, SiSupabase } from "react-icons/si";

const technologies = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Nuxt.js", Icon: SiNuxtdotjs },
  { name: "Laravel", Icon: SiLaravel },
  { name: "Supabase", Icon: SiSupabase },
  { name: "MySQL", Icon: SiMysql },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Python", Icon: SiPython },
  { name: "Postman", Icon: SiPostman },
] as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="about-section page-shell">
      <Reveal>
        <div className="about-layout">
          <figure className="about-portrait">
            <ImagePreview src="/assets/profile-image.jpg" alt="Portrait of Kane Zuniega" title={contact.name} aspectRatio={profileImage.width / profileImage.height}>
              <Image
                src={profileImage}
                alt="Portrait of Kane Zuniega"
                className="about-portrait-image"
                sizes="(min-width: 1024px) 240px, (min-width: 640px) 180px, 160px"
                placeholder="blur"
              />
            </ImagePreview>
          </figure>
          <div className="about-copy">
            <p className="eyebrow">About me</p>
            <h2 id="about-heading" className="about-heading">{contact.name}</h2>
            <p className="about-description">
              Full-stack developer in the Philippines who loves turning complex features into reality.
              I enjoy the problem-solving as much as the building.
            </p>
          </div>
          <div className="about-extras">
            <div className="about-technologies">
              <h3 id="technologies-heading">Tools I work with</h3>
              <ul className="technology-list" aria-labelledby="technologies-heading">
                {technologies.map(({ name, Icon }) => (
                  <li key={name}>
                    <Icon className="technology-icon" aria-hidden="true" focusable="false" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="/resume/RESUME_ZUNIEGA.pdf" download="RESUME_KZ.pdf" className="resume-download">
              <FiDownload aria-hidden="true" focusable="false" />
              <span>Check my resume</span>
              <span className="resume-format">PDF</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
