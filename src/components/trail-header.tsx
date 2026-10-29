"use client";

import Link from "next/link";
import { lessons } from "@/content/trail";
import { sittingPlan } from "@/lib/plan";
import { Bear } from "@/components/bears";
import { useProgress } from "@/components/progress-store";
import { Progress } from "@/components/ui/progress";

export function TrailHeader({ title }: { title: string }) {
  const { done, studyDates, streak, studiedToday } = useProgress();
  const { current, wait, rest } = sittingPlan(done, studiedToday, studyDates);
  const count = done.length;
  const percent = Math.round((count / lessons.length) * 100);
  const streakLabel = streak === 1 ? "day" : "days";
  const place = !current ? "Every sitting done" : rest ? "Rest today" : wait ? "Next sitting tomorrow" : `Day ${current.id} today`;

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto w-full max-w-3xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link href="/" className="flex min-h-11 min-w-0 flex-1 basis-full items-center gap-2 sm:basis-auto">
            <Bear waving className="size-11 shrink-0 sm:size-12" />
            <span className="min-w-0">
              <span className="block font-heading text-lg leading-tight text-foreground sm:text-xl">{title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{place}</span>
            </span>
          </Link>
          <div className="flex w-full items-start justify-end gap-4 sm:w-auto sm:shrink-0">
            <p className="text-right text-xs leading-tight whitespace-nowrap text-muted-foreground">
              <span className="block font-heading text-lg leading-none text-foreground">{streak}</span>
              {streak > 0 && !studiedToday ? "keep it today" : `${streakLabel} streak`}
            </p>
            <p className="text-right text-xs leading-tight whitespace-nowrap text-muted-foreground">
              <span className="block font-heading text-lg leading-none text-foreground">
                {count}/{lessons.length}
              </span>
              paw prints
            </p>
          </div>
        </div>
        <Progress
          value={percent}
          aria-label="Paw prints along the trail"
          className="mt-2"
        />
      </div>
    </header>
  );
}
