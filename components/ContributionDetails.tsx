"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

export function ContributionDetails({ projectTitle, children }: { projectTitle: string; children: ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const expandedRef = useRef(false);

  useEffect(() => () => {
    animationRef.current?.cancel();
  }, []);

  function handleToggle(event: MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const content = contentRef.current;
    if (!details || !content || typeof content.animate !== "function") return;
    event.preventDefault();

    const opening = !expandedRef.current;
    expandedRef.current = opening;
    const startHeight = details.open ? content.getBoundingClientRect().height : 0;
    const startOpacity = details.open ? Number.parseFloat(getComputedStyle(content).opacity) : 0;
    animationRef.current?.cancel();

    details.dataset.expanded = String(opening);
    if (opening) details.open = true;

    const animation = content.animate([
      { height: `${startHeight}px`, opacity: startOpacity },
      { height: opening ? `${content.scrollHeight}px` : "0px", opacity: opening ? 1 : 0 },
    ], {
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 420,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "both",
    });

    animationRef.current = animation;
    animation.onfinish = () => {
      details.open = opening;
      animation.cancel();
      animationRef.current = null;
    };
  }

  return (
    <details ref={detailsRef} className="project-details">
      <summary onClick={handleToggle}>
        <span>My contributions<span className="sr-only"> to {projectTitle}</span></span>
        <span className="details-toggle" aria-hidden="true" />
      </summary>
      <div ref={contentRef} className="contributions-content">{children}</div>
    </details>
  );
}
