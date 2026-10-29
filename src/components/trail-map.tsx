"use client";

import Link from "next/link";
import { days, lessons } from "@/content/trail";
import { dayLessons, dayMinutes, sittingPlan } from "@/lib/plan";
import { useProgress } from "@/components/progress-store";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function TrailMap() {
  const { done, studyDates, streak, studiedToday } = useProgress();
  const { current, wait, rest } = sittingPlan(done, studiedToday, studyDates);
  const next = current ? dayLessons(current).find((lesson) => !done.includes(lesson.slug)) : undefined;
  const finishedAll = done.length === lessons.length;

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-border bg-card/85 p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl leading-tight text-balance break-words sm:text-5xl">Twenty study days</h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-foreground/80 sm:text-lg sm:leading-8">
          Start from zero. Do two, then rest one. Days 11 to 18 are harder. The last two days, you explain it to someone else. About a month.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {rest
            ? "Rest today."
            : wait
              ? "Day done. Come back next time."
              : streak === 0
                ? "Finish today to start a streak."
                : `${streak}-day streak.`}
        </p>
        {finishedAll ? (
          <p className="mt-4 text-muted-foreground">All twenty lessons are marked. The den still needs the second word.</p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {rest ? null : (
            <Link
              href={next ? `/lesson/${next.slug}` : "/finale"}
              className={cn(buttonVariants(), "h-12 w-full justify-center rounded-full px-5 text-base whitespace-normal sm:w-auto")}
            >
              {next ? (wait ? "Peek ahead" : done.length === 0 ? "Start day 1" : `Continue day ${current?.id}`) : "Visit the last den"}
            </Link>
          )}
          <Link
            href="/finale"
            className={cn(buttonVariants({ variant: "outline" }), "h-12 w-full justify-center rounded-full bg-white/70 px-5 text-base whitespace-normal sm:w-auto")}
          >
            The locked den
          </Link>
        </div>
      </section>

      <div className="space-y-4">
        {days.map((day) => {
          const items = dayLessons(day);
          const minutes = dayMinutes(day);
          const allDone = items.every((lesson) => done.includes(lesson.slug));
          const isCurrent = day.id === current?.id;
          const status = allDone ? "Done" : isCurrent ? (rest ? "Rest today" : wait ? "Next visit" : "Do this today") : "Later";
          const lesson = items[0];
          if (!lesson) return null;
          const marked = done.includes(lesson.slug);
          return (
            <section key={day.id} aria-labelledby={`day-${day.id}`}>
              <ol className="relative ml-2 min-w-0 border-l-2 border-dashed border-[#e4c07a] pl-5 sm:ml-3 sm:pl-6">
                <li className="relative">
                  <span
                    className={cn(
                      "absolute top-5 -left-9 grid size-8 place-items-center rounded-full border text-xs font-bold sm:-left-[2.15rem] sm:size-7",
                      marked
                        ? "border-[#d39a3a] bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground",
                    )}
                    aria-hidden
                  >
                    {marked ? "✓" : day.id}
                  </span>
                  <Link
                    href={`/lesson/${lesson.slug}`}
                    className={cn(
                      "block min-h-12 min-w-0 rounded-[1.6rem] border p-4 shadow-sm transition hover:bg-white sm:hover:-translate-y-0.5",
                      isCurrent && !wait ? "border-[#e4c07a] bg-white" : "border-border bg-card/90",
                    )}
                  >
                    <p className="text-sm leading-snug font-semibold text-pretty text-[#a56b2b]">
                      Day {day.id} of {days.length}
                      {day.tag ? ` · ${day.tag}` : ""} · {minutes} min · {status}
                    </p>
                    <h2 id={`day-${day.id}`} className="mt-1 text-xl break-words sm:text-2xl">
                      {lesson.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 break-words text-muted-foreground">{lesson.summary}</p>
                  </Link>
                </li>
              </ol>
            </section>
          );
        })}
      </div>

    </div>
  );
}
