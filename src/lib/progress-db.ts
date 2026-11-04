import "server-only";

const PROGRESS_ID = process.env.PROGRESS_ROW_ID?.trim() || "main";

export type StoredProgress = {
  done: string[];
  studyDates: string[];
  updatedAt?: string;
};

function envValue(name: string) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function supabaseConfig() {
  const rawUrl = envValue("SUPABASE_URL").replace(/\/+$/, "");
  const key = envValue("SUPABASE_SERVICE_ROLE_KEY");
  if (!rawUrl || !key) return null;
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  const path = parsed.pathname.replace(/\/+$/, "");
  const root = path.endsWith("/rest/v1") ? rawUrl : `${rawUrl}/rest/v1`;
  return { root, key };
}

/** True only when both server env vars are set. Missing values keep progress in the browser. */
export function progressConfigured() {
  return supabaseConfig() !== null;
}

function asStrings(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

async function supabaseFetch(path: string, init: { method: string; prefer?: string; body?: string }) {
  const config = supabaseConfig();
  if (!config) throw new Error("Supabase progress is not configured");
  const headers: Record<string, string> = {
    apikey: config.key,
    Authorization: `Bearer ${config.key}`,
    Accept: "application/json",
    "Accept-Profile": "public",
    "Content-Profile": "public",
  };
  if (init.body) headers["Content-Type"] = "application/json";
  if (init.prefer) headers.Prefer = init.prefer;
  return fetch(`${config.root}${path}`, {
    method: init.method,
    headers,
    body: init.body,
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
}

export async function readSharedProgress(): Promise<StoredProgress> {
  const response = await supabaseFetch(
    `/progress?id=eq.${encodeURIComponent(PROGRESS_ID)}&select=done,study_dates,updated_at&limit=1`,
    { method: "GET" },
  );
  if (!response.ok) throw new Error("Could not read progress");
  const rows: unknown = await response.json();
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row || typeof row !== "object") return { done: [], studyDates: [] };
  const record = row as { done?: unknown; study_dates?: unknown; updated_at?: unknown };
  return {
    done: asStrings(record.done),
    studyDates: asStrings(record.study_dates),
    updatedAt: typeof record.updated_at === "string" ? record.updated_at : undefined,
  };
}

export async function writeSharedProgress(next: StoredProgress): Promise<StoredProgress> {
  const response = await supabaseFetch("/progress?on_conflict=id", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: JSON.stringify({
      id: PROGRESS_ID,
      done: next.done,
      study_dates: next.studyDates,
      updated_at: new Date().toISOString(),
    }),
  });
  if (!response.ok) throw new Error("Could not save progress");
  const rows: unknown = await response.json();
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row || typeof row !== "object") return next;
  const record = row as { done?: unknown; study_dates?: unknown; updated_at?: unknown };
  return {
    done: asStrings(record.done),
    studyDates: asStrings(record.study_dates),
    updatedAt: typeof record.updated_at === "string" ? record.updated_at : undefined,
  };
}

/** Record a visit timestamp in Supabase when the site is opened or unlocked, throttled to 5m. */
export async function recordVisit(current?: StoredProgress): Promise<StoredProgress | null> {
  if (!progressConfigured()) return null;
  try {
    const row = current ?? (await readSharedProgress());
    const last = row.updatedAt ? new Date(row.updatedAt).getTime() : 0;
    if (Date.now() - last > 5 * 60 * 1000) {
      return await writeSharedProgress({
        done: row.done,
        studyDates: row.studyDates,
      });
    }
    return row;
  } catch (err) {
    console.error("Could not record visit:", err);
    return null;
  }
}

/** Record Leah's response to the weekend plans question on the gate card. */
export async function recordWeekendPlan(note: string): Promise<void> {
  if (!progressConfigured() || !note.trim()) return;
  try {
    const cleanNote = note.trim();
    const existing = await supabaseFetch(
      `/progress?id=eq.weekend_plan&select=done&limit=1`,
      { method: "GET" },
    );
    let previousNotes: string[] = [];
    if (existing.ok) {
      const rows: unknown = await existing.json();
      if (Array.isArray(rows) && rows[0] && typeof rows[0] === "object") {
        const record = rows[0] as { done?: unknown };
        if (Array.isArray(record.done)) {
          previousNotes = record.done.filter((x): x is string => typeof x === "string");
        }
      }
    }
    const allNotes = [...previousNotes, cleanNote];

    await supabaseFetch("/progress?on_conflict=id", {
      method: "POST",
      prefer: "resolution=merge-duplicates,return=representation",
      body: JSON.stringify({
        id: "weekend_plan",
        done: allNotes,
        study_dates: [new Date().toISOString().slice(0, 10)],
        updated_at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error("Could not record weekend plan:", err);
  }
}
