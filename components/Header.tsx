"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { isMenuOpeningSwipe } from "@/lib/menu-gesture";

const mobileMenuQuery = "(max-width: 1023px), (hover: none) and (pointer: coarse)";
const navigation = [
  { id: "work", label: "Work" },
  { id: "about", label: "About me" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pendingTarget = useRef<HTMLElement | null>(null);
  const menuNavigationTimer = useRef<number | null>(null);
  const menuNavigationFrame = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const marker = (document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 80) + 48;
      let current = "";
      for (const { id } of navigation) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) current = id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = "contact";
      setActiveSection(current);
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      if (menuNavigationTimer.current !== null) window.clearTimeout(menuNavigationTimer.current);
      if (menuNavigationFrame.current !== null) cancelAnimationFrame(menuNavigationFrame.current);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const query = window.matchMedia(mobileMenuQuery);
    let start: { x: number; y: number; time: number } | null = null;

    function resetGesture() {
      start = null;
    }

    function handleStart(event: TouchEvent) {
      start = null;
      if (!query.matches || menuOpen || event.touches.length !== 1) return;
      if (document.querySelector('[role="dialog"][data-state="open"]')) return;
      if (event.target instanceof Element && event.target.closest('a, button, input, select, textarea, [contenteditable="true"]')) return;
      const touch = event.touches[0];
      // Leave the browser's edge-navigation gestures alone.
      if (touch.clientX < 24 || touch.clientX > window.innerWidth - 24) return;
      start = { x: touch.clientX, y: touch.clientY, time: performance.now() };
    }

    function handleMove(event: TouchEvent) {
      if (!start) return;
      if (event.touches.length !== 1) return resetGesture();
      const touch = event.touches[0];
      const horizontal = Math.abs(touch.clientX - start.x);
      const vertical = Math.abs(touch.clientY - start.y);
      if (vertical > 20 && vertical > horizontal) resetGesture();
    }

    function handleEnd(event: TouchEvent) {
      const origin = start;
      start = null;
      if (!origin || event.touches.length || event.changedTouches.length !== 1) return;
      const touch = event.changedTouches[0];
      if (isMenuOpeningSwipe(origin, { x: touch.clientX, y: touch.clientY, time: performance.now() })) setMenuOpen(true);
    }

    function handleResize() {
      resetGesture();
      if (!query.matches) setMenuOpen(false);
    }

    document.addEventListener("touchstart", handleStart, { passive: true });
    document.addEventListener("touchmove", handleMove, { passive: true });
    document.addEventListener("touchend", handleEnd, { passive: true });
    document.addEventListener("touchcancel", resetGesture, { passive: true });
    query.addEventListener("change", handleResize);
    return () => {
      document.removeEventListener("touchstart", handleStart);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
      document.removeEventListener("touchcancel", resetGesture);
      query.removeEventListener("change", handleResize);
    };
  }, [menuOpen]);

  function navigateToSection(target: HTMLElement) {
    setActiveSection(target.id === "top" ? "" : target.id);
    const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
    const destination = target.id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
    window.scrollTo({
      top: Math.max(0, destination),
      behavior: "instant",
    });
    if (window.location.hash) {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    }
  }

  function scrollToSection(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = document.getElementById(event.currentTarget.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    setActiveSection(target.id === "top" ? "" : target.id);

    if (menuOpen) {
      pendingTarget.current = target;
      setMenuOpen(false);
      if (menuNavigationTimer.current !== null) window.clearTimeout(menuNavigationTimer.current);
      menuNavigationTimer.current = window.setTimeout(finishMenuNavigation, 260);
    } else {
      navigateToSection(target);
    }
  }

  function finishMenuNavigation() {
    if (menuNavigationTimer.current !== null) window.clearTimeout(menuNavigationTimer.current);
    menuNavigationTimer.current = null;
    if (!pendingTarget.current) return;
    const target = pendingTarget.current;
    pendingTarget.current = null;
    if (document.querySelector('.mobile-menu-panel[data-state="open"]')) return;
    // Give the dialog's focus trap and body scroll lock two frames to release.
    menuNavigationFrame.current = requestAnimationFrame(() => {
      menuNavigationFrame.current = requestAnimationFrame(() => {
        menuNavigationFrame.current = null;
        navigateToSection(target);
      });
    });
  }

  function handleMenuClose(event: Event) {
    if (!pendingTarget.current && menuNavigationFrame.current === null) return;
    event.preventDefault();
    finishMenuNavigation();
  }

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a href="#top" className="brand-link" onClick={scrollToSection}>
          Kane Zuniega<span className="brand-dot" aria-hidden="true" />
        </a>
        <div className="desktop-navigation">
          <nav aria-label="Main navigation" className="header-nav">
            {navigation.map(({ id, label }) => <a key={id} href={`#${id}`} className="nav-link" aria-current={activeSection === id ? "location" : undefined} onClick={scrollToSection}>{label}</a>)}
          </nav>
          <ThemeSwitcher />
        </div>
        <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
          <DialogTrigger asChild>
            <button type="button" className="mobile-menu-trigger" aria-label="Open navigation menu">
              <FiMenu aria-hidden="true" focusable="false" />
            </button>
          </DialogTrigger>
          <DialogContent className="mobile-menu-panel" onCloseAutoFocus={handleMenuClose}>
            <div className="mobile-menu-heading">
              <DialogTitle>Hey there!</DialogTitle>
              <DialogClose className="mobile-menu-close" aria-label="Close navigation menu">
                <FiX aria-hidden="true" focusable="false" />
              </DialogClose>
            </div>
            <DialogDescription className="sr-only">Navigate the portfolio and choose your color theme.</DialogDescription>
            <nav className="mobile-menu-links" aria-label="Mobile navigation">
              {navigation.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={scrollToSection}>{label}</a>)}
            </nav>
            <div className="mobile-menu-appearance">
              <p>Appearance</p>
              <ThemeSwitcher showLabels />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
