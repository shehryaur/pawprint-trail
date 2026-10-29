"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useDenLock } from "@/components/den-switch";
import { forgetDen } from "@/lib/pass-memory";

export function LockDenButton() {
  const router = useRouter();
  const setLocked = useDenLock();
  const [pending, setPending] = useState(false);
  const [, startTransition] = useTransition();

  async function lock() {
    if (pending) return;
    setPending(true);
    forgetDen();
    try {
      const response = await fetch("/api/lock", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (!response.ok || !data?.ok) {
        setPending(false);
        return;
      }
      setLocked(true);
      window.scrollTo(0, 0);
      startTransition(() => {
        router.refresh();
      });
    } catch {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={lock}
      disabled={pending}
      className="relative z-20 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e2a33a] px-5 text-center text-base font-semibold whitespace-normal text-[#3d2618] shadow-sm hover:bg-[#d3952e] focus-visible:ring-2 focus-visible:ring-[#8a5a32] focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-wait disabled:opacity-60 sm:w-auto"
    >
      <Lock className="size-4 shrink-0" aria-hidden="true" />
      <span>{pending ? "Locking the den…" : "Lock the den again"}</span>
    </button>
  );
}
