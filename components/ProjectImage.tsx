import Image from "next/image";

type ProjectImageProps = {
  src?: string;
  alt: string;
  number: string;
};

export function ProjectImage({ src, alt, number }: ProjectImageProps) {
  return (
    <span className={`project-image ${src ? "project-screenshot" : "project-placeholder"}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 767px) calc(100vw - 64px), (max-width: 1023px) calc((100vw - 96px) / 2), (max-width: 1439px) 55vw, 760px"
          className="project-screenshot-image"
        />
      ) : (
        <span className="placeholder-content">
          <span className="placeholder-number" aria-hidden="true">{number}</span>
          <span>Project preview coming soon</span>
        </span>
      )}
    </span>
  );
}
