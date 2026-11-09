"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";

const modes = [
  { value: "light", label: "Light", Icon: FiSun },
  { value: "dark", label: "Dark", Icon: FiMoon },
  { value: "system", label: "System", Icon: FiMonitor },
] as const;

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ThemeSwitcher({ showLabels = false }: { showLabels?: boolean }) {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { theme, setTheme } = useTheme();
  const selected = mounted && (theme === "light" || theme === "dark") ? theme : "system";
  return (
    <div className={`theme-switcher${showLabels ? " theme-switcher-labeled" : ""}`} role="group" aria-label="Color theme">
      {modes.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          className="theme-option"
          aria-label={value === "system" ? "Follow system appearance" : `Use ${value} theme`}
          aria-pressed={selected === value}
          title={value === "system" ? "Follow system appearance" : `${label} theme`}
          disabled={!mounted}
          onClick={() => setTheme(value)}
        >
          <Icon aria-hidden="true" focusable="false" />
          {showLabels && <span>{label}</span>}
        </button>
      ))}
    </div>
  );
}
