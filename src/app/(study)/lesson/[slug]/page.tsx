import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { days, getLesson, lessonDay, lessonNeighbors, lessons, parts } from "@/content/trail";
import { LessonCheck } from "@/components/lesson-check";
import { LessonQuiz } from "@/components/lesson-quiz";
import { LessonVideo } from "@/components/lesson-video";
import { SourceLink } from "@/components/source-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: PageProps<"/lesson/[slug]">) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return { title: lesson?.title ?? "Missing lesson" };
}

async function LessonBody({ params }: { params: PageProps<"/lesson/[slug]">["params"] }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const part = parts.find((item) => item.id === lesson.part);
  const day = lessonDay(lesson.slug);
  const { previous, next } = lessonNeighbors(lesson.slug);

  return (
    <article className="space-y-6">
      <p>
        <Link href="/" className="inline-flex min-h-11 items-center font-semibold text-[#a56b2b] underline-offset-4 hover:underline">
          Back to the trail
        </Link>
      </p>
      <header className="min-w-0">
        <p className="text-sm leading-snug font-semibold text-pretty text-[#a56b2b]">
          {day ? `Day ${day.id} of ${days.length}` : part?.title}
          {day?.tag ? ` · ${day.tag}` : ""} · {lesson.minutes} min
        </p>
        <h1 className="mt-2 text-3xl leading-tight text-balance break-words sm:text-5xl">{lesson.title}</h1>
        <p className="mt-3 text-base leading-7 break-words text-foreground/80 sm:text-lg sm:leading-8">{lesson.summary}</p>
      </header>
      <div className="min-w-0 space-y-4 text-base leading-7 break-words sm:leading-8">
        {lesson.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <aside className="rounded-[1.6rem] bg-[#fff4dd] px-5 py-4">
        <p className="text-xs font-semibold tracking-wide text-[#a56b2b] uppercase">Keep this</p>
        <p className="mt-1 text-lg leading-7 break-words">{lesson.remember}</p>
      </aside>
      <p className="text-sm leading-6 break-words text-muted-foreground">{lesson.watch}</p>
      <LessonVideo id={lesson.video.id} title={lesson.video.title} />
      <section className="min-w-0 space-y-3 overflow-x-clip rounded-[1.6rem] border border-border bg-card/90 p-4 shadow-sm sm:p-5">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#a56b2b] uppercase">Try this</p>
          <h2 className="text-2xl">Do this</h2>
        </div>
        <ol className="list-decimal space-y-3 pl-5 text-base leading-7">
          {lesson.practice.map((step) => (
            <li key={step} className="break-words whitespace-pre-wrap">
              {step}
            </li>
          ))}
        </ol>
      </section>
      <LessonQuiz quiz={lesson.quiz} />
      <div className="grid gap-3">
        <SourceLink source={lesson.source} primary />
      </div>
      <LessonCheck slug={lesson.slug} />
      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {previous ? (
          <Link
            href={`/lesson/${previous.slug}`}
            className={cn(buttonVariants({ variant: "outline" }), "h-12 w-full justify-center rounded-full bg-white/70 px-5 text-base sm:w-auto")}
          >
            Previous
          </Link>
        ) : null}
        <Link
          href={next ? `/lesson/${next.slug}` : "/finale"}
          className={cn(buttonVariants(), "h-12 w-full justify-center rounded-full px-5 text-base sm:w-auto", !previous && "sm:ml-auto")}
        >
          {next ? "Next lesson" : "The locked den"}
        </Link>
      </nav>
    </article>
  );
}

export default function LessonPage({ params }: PageProps<"/lesson/[slug]">) {
  return (
    <Suspense
      fallback={
        <div className="rounded-[2rem] border border-border bg-card/80 p-8">
          <p className="font-heading text-2xl">Opening the lesson…</p>
        </div>
      }
    >
      <LessonBody params={params} />
    </Suspense>
  );
}
