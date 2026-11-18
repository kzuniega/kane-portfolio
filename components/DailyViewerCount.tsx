"use client";

import { useEffect, useState } from "react";

export function DailyViewerCount() {
  const [count, setCount] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/viewers", { method: "POST", cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Viewer count request failed");
        const result: unknown = await response.json();
        if (
          typeof result !== "object" ||
          result === null ||
          !("count" in result) ||
          typeof result.count !== "number" ||
          !Number.isSafeInteger(result.count) ||
          result.count < 0
        ) {
          throw new Error("Viewer count response was invalid");
        }
        if (active) setCount(result.count);
      })
      .catch(() => {
        if (active) setUnavailable(true);
      });

    return () => {
      active = false;
    };
  }, []);

  if (unavailable) {
    return <p className="viewer-count">Today&apos;s visitor count is unavailable.</p>;
  }

  return (
    <p className="viewer-count" aria-live="polite">
      {count === null ? "Counting today’s visitors…" : `Today’s unique visitors: ${count}`}
    </p>
  );
}
