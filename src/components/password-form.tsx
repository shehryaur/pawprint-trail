"use client";

import { useState, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useDenLock } from "@/components/den-switch";
import { rememberPass } from "@/lib/pass-memory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const deniedCopy = {
  gate: "That isn't the word. Ask the friend who sent you this trail.",
  finale: "Not yet. Your friend will share this word when you have finished.",
} as const;

export function PasswordForm({
  kind,
  label,
  hint,
  denied = false,
  returnTo,
}: {
  kind: "gate" | "finale";
  label: string;
  hint?: string;
  denied?: boolean;
  returnTo?: string | null;
}) {
  const router = useRouter();
  const setLocked = useDenLock();
  const [error, setError] = useState<string | null>(denied ? deniedCopy[kind] : null);
  const [noteError, setNoteError] = useState(false);
  const [pending, setPending] = useState(false);
  const [shake, setShake] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "").trim();
    const weekendNote = String(formData.get("weekendNote") ?? "").trim();

    // Compulsory check: weekend note must be filled to enter
    if (kind === "gate" && !weekendNote) {
      setNoteError(true);
      setError("Please share your plans for the weekend above to enter.");
      setShake(false);
      requestAnimationFrame(() => setShake(true));
      noteRef.current?.focus();
      return;
    }

    setPending(true);
    setError(null);
    setNoteError(false);

    try {
      const response = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, password, weekendNote, next: returnTo ?? "" }),
      });
      const data = (await response.json().catch(() => null)) as { message?: string; token?: string } | null;
      if (!response.ok || !data?.token) {
        setError(data?.message ?? "That isn't the word.");
        setShake(false);
        requestAnimationFrame(() => setShake(true));
        setPending(false);
        return;
      }
      rememberPass(kind, data.token);
      if (kind === "finale") {
        setLocked(false);
        router.refresh();
        return;
      }
      window.location.assign(returnTo || "/");
    } catch {
      setError("The trail didn't answer. Try once more.");
      setPending(false);
    }
  }

  return (
    <form
      method="post"
      action="/api/unlock"
      onSubmit={onSubmit}
      className={`w-full min-w-0 space-y-4 ${shake ? "animate-shake" : ""}`}
      onAnimationEnd={() => setShake(false)}
    >
      <input type="hidden" name="kind" value={kind} />
      {returnTo ? <input type="hidden" name="next" value={returnTo} /> : null}

      {kind === "gate" ? (
        <div
          className={`space-y-2 rounded-2xl border p-4 text-center shadow-xs transition-colors duration-200 ${
            noteError
              ? "border-red-500 bg-red-50/70 ring-2 ring-red-400/30"
              : "border-[#e4cc9f] bg-[#fffaf0]"
          }`}
        >
          <label
            htmlFor="gate-weekend-note"
            className={`block text-center text-sm font-semibold transition-colors ${
              noteError ? "text-red-700" : "text-[#53361a]"
            }`}
          >
            What are your plans for the weekend?
          </label>
          <textarea
            ref={noteRef}
            id="gate-weekend-note"
            name="weekendNote"
            rows={2}
            placeholder="Any plans?"
            onChange={() => {
              if (noteError) setNoteError(false);
              if (error) setError(null);
            }}
            className={`w-full resize-none rounded-xl border p-3 text-left text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 ${
              noteError
                ? "border-red-400 bg-white focus:border-red-500 focus:ring-red-400/30"
                : "border-border/80 bg-white/95 focus:border-[#c4843e] focus:ring-[#c4843e]/30"
            }`}
          />
          {noteError ? (
            <p role="alert" className="text-xs font-semibold text-red-600 animate-in fade-in duration-200">
              Please share your plans to come in.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-2 text-left">
        <label htmlFor={`${kind}-password`} className="text-sm font-semibold">
          Password
        </label>
        <Input
          id={`${kind}-password`}
          name="password"
          type="password"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          required
          spellCheck={false}
          aria-invalid={error != null}
          aria-describedby={hint ? `${kind}-hint` : undefined}
          placeholder="The secret word"
          className="h-12 w-full min-w-0 rounded-full bg-white/80 px-4 text-base md:text-base"
        />
        {hint ? (
          <p id={`${kind}-hint`} className="text-sm text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="rounded-2xl bg-secondary px-3 py-2 text-sm text-secondary-foreground">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-12 w-full rounded-full px-6 text-base whitespace-normal">
        {pending ? "Sniffing the trail…" : label}
      </Button>
    </form>
  );
}
