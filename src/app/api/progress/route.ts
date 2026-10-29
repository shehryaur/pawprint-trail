import { NextResponse } from "next/server";
import { cookieMatches, GATE_COOKIE, GATE_HEADER } from "@/lib/auth";
import { readSharedProgress, progressConfigured, writeSharedProgress } from "@/lib/progress-db";
import { applyToggle, cleanSnapshot, parseProgressWrite } from "@/lib/progress-state";
import { dateKey } from "@/lib/streak";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function cookieValue(request: Request, name: string) {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    if (trimmed.slice(0, eq) !== name) continue;
    const raw = trimmed.slice(eq + 1);
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }
  return undefined;
}

function gateAllowed(request: Request) {
  const header = request.headers.get(GATE_HEADER);
  const presented = header ?? cookieValue(request, GATE_COOKIE);
  return cookieMatches("gate", presented);
}

export async function GET(request: Request) {
  if (!gateAllowed(request)) return json({ ok: false }, 401);
  if (!progressConfigured()) return json({ ok: false, configured: false }, 503);
  try {
    const row = await readSharedProgress();
    return json(cleanSnapshot(row));
  } catch {
    return json({ ok: false }, 502);
  }
}

export async function POST(request: Request) {
  if (!gateAllowed(request)) return json({ ok: false }, 401);
  if (!progressConfigured()) return json({ ok: false, configured: false }, 503);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }
  const parsed = parseProgressWrite(body, dateKey(new Date()));
  if (!parsed) return json({ ok: false }, 400);

  try {
    const current = parsed.kind === "toggle" ? cleanSnapshot(await readSharedProgress()) : parsed.snapshot;
    const next = parsed.kind === "toggle" ? applyToggle(current, parsed.slug, parsed.value, parsed.today) : current;
    const saved = cleanSnapshot(await writeSharedProgress(next));
    return json(saved);
  } catch {
    return json({ ok: false }, 502);
  }
}

export async function PATCH(request: Request) {
  return POST(request);
}
