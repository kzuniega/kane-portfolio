"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children }: { children: ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.removeAttribute("data-reveal-pending");
        observer.disconnect();
      }
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.setAttribute("data-reveal-pending", "");
    }
    observer.observe(element);

    const handlePreference = () => {
      if (preference.matches) {
        element.removeAttribute("data-reveal-pending");
        observer.disconnect();
      }
    };
    preference.addEventListener("change", handlePreference);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", handlePreference);
      element.removeAttribute("data-reveal-pending");
    };
  }, []);

  return <div ref={elementRef} className="reveal">{children}</div>;
}
