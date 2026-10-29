export function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dayNumber(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

function keyFromDayNumber(day: number) {
  const date = new Date(day * 86_400_000);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dayOfMonth = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${dayOfMonth}`;
}

export function shiftDate(key: string, delta: number) {
  return keyFromDayNumber(dayNumber(key) + delta);
}

/** After every two finished study days, the next calendar day is a rest day. */
export function restDayDue(finishedCount: number, total: number, studyDates: string[], today = dateKey(new Date())) {
  if (finishedCount <= 0 || finishedCount >= total || finishedCount % 2 !== 0) return false;
  const last = studyDates.reduce((latest, date) => (date > latest ? date : latest), "");
  return last === shiftDate(today, -1);
}

/** Consecutive study days ending today, or yesterday if she has not studied yet today. */
export function streakCount(dates: string[], today = dateKey(new Date())) {
  const unique = new Set(dates);
  const todayNumber = dayNumber(today);
  const start = unique.has(today)
    ? todayNumber
    : unique.has(keyFromDayNumber(todayNumber - 1))
      ? todayNumber - 1
      : null;
  if (start === null) return 0;

  let count = 0;
  for (let cursor = start; unique.has(keyFromDayNumber(cursor)); cursor -= 1) {
    count += 1;
  }
  return count;
}
