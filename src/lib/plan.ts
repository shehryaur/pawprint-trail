import { days, getLesson, type DayPlan } from "@/content/trail";
import { dateKey, restDayDue } from "@/lib/streak";

export function dayLessons(day: DayPlan) {
  return day.slugs.flatMap((slug) => {
    const lesson = getLesson(slug);
    return lesson ? [lesson] : [];
  });
}

export function dayMinutes(day: DayPlan) {
  return dayLessons(day).reduce((total, lesson) => total + lesson.minutes, 0);
}

function unfinished(day: DayPlan, done: string[]) {
  return day.slugs.some((slug) => !done.includes(slug));
}

function complete(day: DayPlan, done: string[]) {
  return day.slugs.every((slug) => done.includes(slug));
}

/** The sitting she should open, and whether she should wait until another day. */
export function sittingPlan(done: string[], studiedToday: boolean, studyDates: string[] = []) {
  const required = days.filter((day) => !day.optional);
  const current =
    required.find((day) => unfinished(day, done)) ??
    days.find((day) => day.optional && unfinished(day, done)) ??
    null;
  if (!current) return { current: null, wait: false, rest: false };

  const started = current.slugs.some((slug) => done.includes(slug));
  const earlierRequiredDone = required
    .filter((day) => day.id < current.id)
    .every((day) => complete(day, done));
  const finished = required.filter((day) => complete(day, done)).length;
  const rest = restDayDue(finished, required.length, studyDates, dateKey(new Date()));
  const wait = rest || (studiedToday && !started && earlierRequiredDone && current.id > 1);
  return { current, wait, rest };
}
