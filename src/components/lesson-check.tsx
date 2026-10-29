"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useProgress } from "@/components/progress-store";
import { playLessonChime } from "@/lib/sound";

export function LessonCheck({ slug }: { slug: string }) {
  const { done, streak, toggle } = useProgress();
  const checked = done.includes(slug);

  return (
    <div className="rounded-[1.6rem] border border-border bg-card/90 p-4 shadow-sm">
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => {
          const finishing = !checked;
          toggle(slug, finishing);
          if (finishing) playLessonChime();
        }}
        className="flex min-h-12 w-full cursor-pointer items-center gap-3 text-left"
      >
        <Checkbox
          checked={checked}
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none mt-0.5 size-7 rounded-full border-2 border-[#c98449]"
        />
        <span>
          <span className="block font-semibold">I finished this lesson</span>
          <span className="mt-1 block text-sm text-muted-foreground">
            {checked ? `Saved. Streak: ${streak}.` : "Marks today."}
          </span>
        </span>
      </button>
    </div>
  );
}
