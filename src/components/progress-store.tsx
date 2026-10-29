"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { applyToggle, cleanSnapshot, type ProgressSnapshot } from "@/lib/progress-state";
import { dateKey, streakCount } from "@/lib/streak";

const KEY = "pawprint-trail-done-v1";
const DAYS_KEY = "pawprint-trail-days-v1";
const EVENT = "pawprint-trail-progress";

type ProgressValue = {
  done: string[];
  studyDates: string[];
  streak: number;
  studiedToday: boolean;
  toggle: (slug: string, value: boolean) => void;
};

const ProgressContext = createContext<ProgressValue | null>(null);

function parse(raw: string) {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  return localStorage.getItem(KEY) ?? "[]";
}

function getDaysSnapshot() {
  return localStorage.getItem(DAYS_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

function markToday() {
  const today = dateKey(new Date());
  const days = parse(getDaysSnapshot());
  if (days.includes(today)) return;
  localStorage.setItem(DAYS_KEY, JSON.stringify([...days, today]));
}

function readResponse(data: unknown): ProgressSnapshot | null {
  if (!data || typeof data !== "object") return null;
  const record = data as { done?: unknown; studyDates?: unknown };
  if (!Array.isArray(record.done) || !Array.isArray(record.studyDates)) return null;
  return cleanSnapshot({ done: record.done, studyDates: record.studyDates });
}

async function fetchProgress(method: "GET" | "POST", body?: ProgressSnapshot) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    return await fetch("/api/progress", {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

export function ProgressProvider({ children, remote = false }: { children: ReactNode; remote?: boolean }) {
  const [mode, setMode] = useState<"local" | "remote">(remote ? "remote" : "local");
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const rawDays = useSyncExternalStore(subscribe, getDaysSnapshot, getServerSnapshot);
  const localDone = useMemo(() => parse(raw), [raw]);
  const localDays = useMemo(() => parse(rawDays), [rawDays]);

  const [remoteSnap, setRemoteSnap] = useState<ProgressSnapshot>({ done: [], studyDates: [] });
  const snapshotRef = useRef(remoteSnap);
  const confirmedRef = useRef(remoteSnap);
  const readyRef = useRef(false);
  const queueRef = useRef<{ slug: string; value: boolean }[]>([]);
  const saving = useRef(0);
  const pendingRef = useRef<ProgressSnapshot | null>(null);

  const publish = useCallback((next: ProgressSnapshot) => {
    snapshotRef.current = next;
    setRemoteSnap(next);
  }, []);

  const fallbackToLocal = useCallback(() => {
    modeRef.current = "local";
    readyRef.current = false;
    setMode("local");
  }, []);

  const persistRef = useRef<(next: ProgressSnapshot) => Promise<void>>(async () => {});

  const persist = useCallback(
    async (next: ProgressSnapshot) => {
      pendingRef.current = next;
      if (saving.current > 0) return;
      saving.current += 1;
      try {
        while (pendingRef.current && modeRef.current === "remote") {
          const body = pendingRef.current;
          pendingRef.current = null;
          const response = await fetchProgress("POST", body);
          if (modeRef.current !== "remote") return;
          if (!response.ok) {
            pendingRef.current = null;
            publish(confirmedRef.current);
            return;
          }
          const saved = readResponse(await response.json());
          if (!saved || modeRef.current !== "remote") return;
          confirmedRef.current = saved;
          if (!pendingRef.current) publish(saved);
        }
      } catch {
        if (modeRef.current === "remote") {
          pendingRef.current = null;
          publish(confirmedRef.current);
        }
      } finally {
        saving.current -= 1;
        if (pendingRef.current && modeRef.current === "remote") void persistRef.current(pendingRef.current);
      }
    },
    [publish],
  );

  useEffect(() => {
    persistRef.current = persist;
  }, [persist]);

  useEffect(() => {
    if (mode !== "remote") return;
    let cancelled = false;

    function stashQueueLocally() {
      if (queueRef.current.length === 0) return;
      let next: ProgressSnapshot = { done: parse(getSnapshot()), studyDates: parse(getDaysSnapshot()) };
      for (const change of queueRef.current) {
        next = applyToggle(next, change.slug, change.value, dateKey(new Date()));
      }
      queueRef.current = [];
      localStorage.setItem(KEY, JSON.stringify(next.done));
      localStorage.setItem(DAYS_KEY, JSON.stringify(next.studyDates));
    }

    async function load() {
      try {
        const response = await fetchProgress("GET");
        if (cancelled || modeRef.current !== "remote") return;
        if (!response.ok) {
          stashQueueLocally();
          fallbackToLocal();
          return;
        }
        const loaded = readResponse(await response.json());
        if (!loaded) {
          stashQueueLocally();
          fallbackToLocal();
          return;
        }
        let next = loaded;
        for (const change of queueRef.current) {
          next = applyToggle(next, change.slug, change.value, dateKey(new Date()));
        }
        const queued = queueRef.current.length > 0;
        queueRef.current = [];
        readyRef.current = true;
        confirmedRef.current = loaded;
        publish(next);
        if (queued) void persist(next);
      } catch {
        if (cancelled || modeRef.current !== "remote") return;
        stashQueueLocally();
        fallbackToLocal();
      }
    }

    function refresh() {
      if (!readyRef.current || saving.current > 0 || pendingRef.current || modeRef.current !== "remote") return;
      void fetchProgress("GET")
        .then(async (response) => {
          if (!response.ok || saving.current > 0 || pendingRef.current || modeRef.current !== "remote") return;
          const loaded = readResponse(await response.json());
          if (!loaded || saving.current > 0 || pendingRef.current) return;
          confirmedRef.current = loaded;
          publish(loaded);
        })
        .catch(() => {});
    }

    function onVisible() {
      if (document.visibilityState === "visible") refresh();
    }

    void load();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [mode, persist, publish, fallbackToLocal]);

  const toggle = useCallback(
    (slug: string, value: boolean) => {
      if (modeRef.current !== "remote") {
        const current = parse(getSnapshot());
        const next = value ? [...new Set([...current, slug])] : current.filter((item) => item !== slug);
        if (value) markToday();
        localStorage.setItem(KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(EVENT));
        return;
      }
      const next = applyToggle(snapshotRef.current, slug, value, dateKey(new Date()));
      publish(next);
      if (!readyRef.current) {
        queueRef.current.push({ slug, value });
        return;
      }
      void persist(next);
    },
    [persist, publish],
  );

  const done = mode === "local" ? localDone : remoteSnap.done;
  const studyDates = mode === "local" ? localDays : remoteSnap.studyDates;
  const streak = streakCount(studyDates);
  const studiedToday = studyDates.includes(dateKey(new Date()));

  return (
    <ProgressContext.Provider value={{ done, studyDates, streak, studiedToday, toggle }}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return value;
}
