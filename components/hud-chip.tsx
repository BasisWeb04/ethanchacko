"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Phoenix",
  });
}

function getUTCOffset(): string {
  const now = new Date();
  const phoenix = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Phoenix" })
  );
  const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const diff = (phoenix.getTime() - utc.getTime()) / 3600000;
  return `UTC${diff >= 0 ? "+" : ""}${diff}`;
}

export function HudChip() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(formatTime(new Date()));
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="hidden md:flex items-center gap-2 font-mono text-mono text-fg-muted">
        <span>PHX</span>
        <span className="text-fg-dim">/</span>
        <span>{getUTCOffset()}</span>
        <span className="text-fg-dim">/</span>
        <span>--:--:--</span>
        <span className="text-fg-dim">/</span>
        <span>STATUS:</span>
        <span className="inline-block w-2 h-2 rounded-full bg-signal" />
        <span className="text-signal">AVAILABLE</span>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-2 font-mono text-mono text-fg-muted">
        <span>PHX</span>
        <span className="text-fg-dim">/</span>
        <span>{getUTCOffset()}</span>
        <span className="text-fg-dim">/</span>
        <span>{time}</span>
        <span className="text-fg-dim">/</span>
        <span>STATUS:</span>
        <span className="inline-block w-2 h-2 rounded-full bg-signal" />
        <span className="text-signal">AVAILABLE</span>
      </div>
      {/* Mobile */}
      <div className="flex md:hidden items-center gap-2 font-mono text-mono text-fg-muted">
        <span>PHX</span>
        <span className="inline-block w-2 h-2 rounded-full bg-signal" />
        <span className="text-signal">AVAILABLE</span>
      </div>
    </>
  );
}
