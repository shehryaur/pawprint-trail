"use client";

import { useState, type FormEvent } from "react";
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
  const [pending, setPending] = useState(false);
  const [shake, setShake] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password") ?? "").trim();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, password, next: returnTo ?? "" }),
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
      <div className="space-y-2">
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
