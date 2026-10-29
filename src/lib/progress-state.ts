export type ProgressSnapshot = {
  done: string[];
  studyDates: string[];
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG = 80;
const MAX_DONE = 200;
const MAX_DATES = 2000;

export function isLessonSlug(value: string) {
  return value.length <= MAX_SLUG && SLUG.test(value);
}

export function isDateKey(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Drop bad entries. Used when reading a row so one stray value does not blank the trail. */
export function keepValid(values: unknown, accept: (value: string) => boolean, max: number) {
  if (!Array.isArray(values)) return [];
  const out: string[] = [];
  for (const value of values) {
    if (typeof value !== "string" || !accept(value) || out.includes(value)) continue;
    out.push(value);
    if (out.length >= max) break;
  }
  return out;
}

/** Reject the whole list when a caller sends a value we will not store. */
export function strictList(values: unknown, accept: (value: string) => boolean, max: number) {
  if (!Array.isArray(values) || values.length > max) return null;
  const out: string[] = [];
  for (const value of values) {
    if (typeof value !== "string" || !accept(value)) return null;
    if (!out.includes(value)) out.push(value);
  }
  return out;
}

export type ProgressWrite =
  | { kind: "replace"; snapshot: ProgressSnapshot }
  | { kind: "toggle"; slug: string; value: boolean; today: string };

/** A full snapshot replaces the row. A toggle flips one lesson and, when finishing, records today. */
export function parseProgressWrite(body: unknown, today: string): ProgressWrite | null {
  if (!isRecord(body)) return null;

  if ("done" in body || "studyDates" in body) {
    const done = strictList(body.done, isLessonSlug, MAX_DONE);
    const studyDates = strictList(body.studyDates, isDateKey, MAX_DATES);
    if (!done || !studyDates) return null;
    return { kind: "replace", snapshot: { done, studyDates } };
  }

  const toggle = isRecord(body.toggle) ? body.toggle : body;
  if (typeof toggle.slug !== "string" || !isLessonSlug(toggle.slug)) return null;
  if (typeof toggle.value !== "boolean") return null;
  let day = today;
  if ("today" in toggle && toggle.today !== undefined) {
    if (typeof toggle.today !== "string" || !isDateKey(toggle.today)) return null;
    day = toggle.today;
  }
  return { kind: "toggle", slug: toggle.slug, value: toggle.value, today: day };
}

/** Checking a lesson records today. Unchecking leaves study dates alone. */
export function applyToggle(current: ProgressSnapshot, slug: string, value: boolean, today: string): ProgressSnapshot {
  const done = value ? [...new Set([...current.done, slug])] : current.done.filter((item) => item !== slug);
  const studyDates = value && !current.studyDates.includes(today) ? [...current.studyDates, today] : current.studyDates;
  return { done, studyDates };
}

export function cleanSnapshot(row: { done: unknown; studyDates: unknown }): ProgressSnapshot {
  return {
    done: keepValid(row.done, isLessonSlug, MAX_DONE),
    studyDates: keepValid(row.studyDates, isDateKey, MAX_DATES),
  };
}
