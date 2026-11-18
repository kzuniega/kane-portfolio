"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ThemeSwitcher() {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && resolvedTheme === "dark");
  const followsSystem = mounted && theme === "system";

  return (
    <div className="theme-switcher" role="group" aria-label="Color theme">
      <button
        type="button"
        className="theme-toggle"
        role="switch"
        aria-label="Dark theme"
        aria-checked={isDark}
        title={isDark ? "Switch to light theme" : "Switch to dark theme"}
        disabled={!mounted}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        <FiSun className="theme-toggle-sun" aria-hidden="true" focusable="false" />
        <FiMoon className="theme-toggle-moon" aria-hidden="true" focusable="false" />
      </button>
      <label className="theme-system-option">
        <input
          type="checkbox"
          checked={followsSystem}
          disabled={!mounted}
          onChange={(event) => {
            setTheme(event.currentTarget.checked ? "system" : resolvedTheme === "dark" ? "dark" : "light");
          }}
        />
        <span>System</span>
      </label>
    </div>
  );
}
