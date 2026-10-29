"use client";

import { useId, useState } from "react";
import type { Lesson, Mcq } from "@/content/trail";
import { playQuizSpark } from "@/lib/sound";
import { cn } from "cn";

type Check = {
  picks: (number | null)[];
  note: string;
};

function choiceResult(question: Mcq, pick: number | null) {
  if (pick == null || question.choices[pick] == null) {
    return { tone: "wait" as const, text: "You still need to choose one." };
  }
  const chosen = question.choices[pick];
  if (pick === question.answer) {
    return { tone: "right" as const, text: `Yes. That is right. “${chosen}” matches this lesson.` };
  }
  const right = question.choices[question.answer] ?? "";
  return {
    tone: "miss" as const,
    text: `Not quite. “${chosen}” is not the one. The right idea is: “${right}”.`,
  };
}

function writtenResult(prompt: string, note: string) {
  const text = note.trim();
  if (!text) {
    return {
      empty: true,
      shown: "",
      reminder: "You still need to write a few sentences. An empty box is not a finished answer.",
    };
  }
  const shown = text.length > 480 ? `${text.slice(0, 480).trimEnd()}…` : text;
  return { empty: false, shown, reminder: prompt };
}

export function LessonQuiz({ quiz }: { quiz: Lesson["quiz"] }) {
  const baseId = useId();
  const [picked, setPicked] = useState<(number | null)[]>(() => quiz.mcq.map(() => null));
  const [note, setNote] = useState("");
  const [check, setCheck] = useState<Check | null>(null);

  const stale =
    check != null &&
    (note !== check.note || picked.some((value, index) => value !== check.picks[index]));
  const checked = check != null && !stale;
  const written = check ? writtenResult(quiz.open, check.note) : null;

  const correctCount = checked
    ? quiz.mcq.reduce(
        (count, q, idx) => (check.picks[idx] === q.answer ? count + 1 : count),
        0,
      )
    : 0;
  const allCorrect = checked && correctCount === quiz.mcq.length;

  function choose(questionIndex: number, choiceIndex: number) {
    setPicked((current) => current.map((value, index) => (index === questionIndex ? choiceIndex : value)));
  }

  function seeHowIDid() {
    setCheck({ picks: [...picked], note });
    playQuizSpark();
  }

  return (
    <section className="relative z-10 min-w-0 space-y-5 overflow-x-clip rounded-[1.6rem] border border-border bg-card/90 p-4 shadow-sm sm:p-5">
      <div>
        <p className="text-xs font-semibold tracking-wide text-[#a56b2b] uppercase">A tiny check</p>
        <h2 className="text-2xl">Three quick questions</h2>
      </div>
      {quiz.mcq.map((question, questionIndex) => {
        const choice = picked[questionIndex];
        const result = check ? choiceResult(question, check.picks[questionIndex] ?? null) : null;
        const promptId = `${baseId}-q-${questionIndex}`;
        return (
          <div key={question.prompt} className="space-y-2">
            <p id={promptId} className="text-base font-semibold">
              {question.prompt}
            </p>
            <div role="group" aria-labelledby={promptId} className="flex flex-col gap-2">
              {question.choices.map((label, choiceIndex) => {
                const selected = choice === choiceIndex;
                const isCorrect = choiceIndex === question.answer;

                let buttonStyle = "border-[#e4d0b0] bg-[#fffdf8] text-[#3a2416] hover:bg-[#fff6e8]";
                let badge = null;

                if (checked) {
                  if (isCorrect) {
                    buttonStyle = "border-[#4e8c3a] bg-[#f0f8ec] text-[#244618]";
                    badge = <span className="ml-auto shrink-0 text-sm font-bold text-[#356b24]">✓ Correct</span>;
                  } else if (selected) {
                    buttonStyle = "border-[#d96748] bg-[#fdf2ee] text-[#6d2714]";
                    badge = <span className="ml-auto shrink-0 text-sm font-bold text-[#b54628]">✕ Not this</span>;
                  } else {
                    buttonStyle = "border-[#e4d0b0]/60 bg-[#fffdf8]/60 text-[#3a2416]/50";
                  }
                } else if (selected) {
                  buttonStyle = "border-[#3a2416] bg-[#3a2416] text-[#fff8ee]";
                }

                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => choose(questionIndex, choiceIndex)}
                    className={cn(
                      "pointer-events-auto relative z-10 flex min-h-11 w-full cursor-pointer items-center justify-between rounded-2xl border-2 px-4 py-3 text-left text-base leading-6 font-semibold break-words whitespace-normal transition",
                      "focus-visible:ring-2 focus-visible:ring-[#e2a33a] focus-visible:ring-offset-2 focus-visible:outline-none",
                      buttonStyle,
                    )}
                  >
                    <span>{label}</span>
                    {badge}
                  </button>
                );
              })}
            </div>
            {result ? (
              <p
                role="status"
                className={cn(
                  "rounded-2xl border px-4 py-3 text-base leading-6 break-words",
                  result.tone === "right" && "border-[#b7d4a8] bg-[#f3faec] text-[#24331c]",
                  result.tone === "miss" && "border-[#efc7b0] bg-[#fff4ec] text-[#3a2416]",
                  result.tone === "wait" && "border-[#e4d0b0] bg-[#fff8ee] text-[#3a2416]",
                )}
              >
                {result.text}
              </p>
            ) : null}
          </div>
        );
      })}
      <div className="space-y-2">
        <label htmlFor={`${baseId}-note`} className="block text-base font-semibold">
          {quiz.open}
        </label>
        <textarea
          id={`${baseId}-note`}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={4}
          placeholder="Write a few sentences."
          className="w-full max-w-full rounded-2xl border-2 border-[#e4d0b0] bg-[#fffdf8] px-4 py-3 text-base leading-6 text-[#3a2416] outline-none focus-visible:ring-2 focus-visible:ring-[#e2a33a] focus-visible:ring-offset-2"
        />
        {written ? (
          <div role="status" className="rounded-2xl border border-[#e4d0b0] bg-[#fff8ee] px-4 py-3 text-base leading-6 text-[#3a2416]">
            {written.empty ? (
              <p>{written.reminder}</p>
            ) : (
              <div className="space-y-2">
                <p>You wrote:</p>
                <p className="font-semibold break-words whitespace-pre-wrap">“{written.shown}”</p>
                <p>There is no score for these words. The check this lesson wanted: {written.reminder}</p>
              </div>
            )}
          </div>
        ) : null}
      </div>
      {checked ? (
        <div
          role="status"
          className={cn(
            "rounded-2xl border p-4 transition",
            allCorrect ? "border-[#b7d4a8] bg-[#f3faec] text-[#24331c]" : "border-[#e4c07a] bg-[#fff8ee] text-[#5c3a1e]",
          )}
        >
          {allCorrect ? (
            <div>
              <p className="font-heading text-lg font-bold">🎉 All {quiz.mcq.length} questions correct!</p>
              <p className="mt-1 text-sm text-[#314a24]">
                You have captured the main ideas of this lesson. Don&apos;t forget to mark the lesson below when you&apos;re ready!
              </p>
            </div>
          ) : (
            <div>
              <p className="font-heading text-lg font-bold">
                {correctCount} of {quiz.mcq.length} correct
              </p>
              <p className="mt-1 text-sm text-[#7a5430]">
                Take a look at the explanations above to review, then choose the right idea and check again.
              </p>
            </div>
          )}
        </div>
      ) : null}
      {stale ? (
        <p className="text-sm leading-6 text-[#6b4a2e]">You changed an answer. Check again when you are ready.</p>
      ) : null}
      <button
        type="button"
        onClick={seeHowIDid}
        className="pointer-events-auto relative z-10 h-12 w-full cursor-pointer rounded-full bg-primary px-5 text-base font-semibold whitespace-normal text-primary-foreground focus-visible:ring-2 focus-visible:ring-[#e2a33a] focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
      >
        {stale ? "Check again" : "See how I did"}
      </button>
    </section>
  );
}
