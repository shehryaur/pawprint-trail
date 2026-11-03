"use client";

import { useEffect, useState } from "react";

export function TrailNotice({ message }: { message: string }) {
  const [visible, setVisible] = useState(false);

  // Key tied to the message content so any future new message will show up once
  const storageKey = `pawprint-notice-${message.slice(0, 15).replace(/\s+/g, "-").toLowerCase()}`;

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(storageKey);
      if (!dismissed) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, [storageKey]);

  function handleDismiss() {
    setVisible(false);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {}
  }

  if (!visible || !message) return null;

  return (
    <aside
      aria-label="Note from the builder"
      className="relative flex items-start justify-between gap-3 rounded-2xl border border-[#e4cc9f] bg-gradient-to-r from-[#fffbf3] to-[#fbf4e4] p-4 text-[#53361a] shadow-sm sm:items-center sm:rounded-3xl sm:p-5"
    >
      <div className="flex items-start gap-3 sm:items-center">
        <span className="text-xl select-none sm:text-2xl" aria-hidden>
          🐾
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#a56b2b]">
            Note from the builder
          </p>
          <p className="mt-0.5 text-base font-medium leading-snug sm:text-lg">
            {message}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-full bg-[#f0deb8]/70 px-3 py-1.5 text-xs font-semibold text-[#825424] transition-colors hover:bg-[#e7d1a3] active:scale-95 sm:text-sm"
      >
        Got it
      </button>
    </aside>
  );
}
