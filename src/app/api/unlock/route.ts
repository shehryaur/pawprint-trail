import { NextResponse } from "next/server";
import {
  FINALE_COOKIE,
  GATE_COOKIE,
  passCookieOptions,
  passwordMatches,
  passwordsReady,
  safeNext,
  tokenFor,
  type GateKind,
} from "@/lib/auth";

const wrongMessage = {
  gate: "That isn't the word. Ask the friend who sent you this trail.",
  finale: "Not yet. Your friend will share this word when you have finished.",
} as const;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const asJson = contentType.includes("application/json");
  let kind: GateKind = "gate";
  let password = "";
  let next = "";

  if (asJson) {
    let body: { kind?: string; password?: string; next?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, message: "Try that once more." }, { status: 400 });
    }
    kind = body.kind === "finale" ? "finale" : "gate";
    password = typeof body.password === "string" ? body.password.trim().toLowerCase() : "";
    next = typeof body.next === "string" ? body.next : "";
  } else {
    const form = await request.formData();
    kind = form.get("kind") === "finale" ? "finale" : "gate";
    password = String(form.get("password") ?? "").trim().toLowerCase();
    next = String(form.get("next") ?? "");
  }

  const pageUrl = (path: string) => {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    const proto = request.headers.get("x-forwarded-proto") ?? "http";
    return new URL(path, host ? `${proto}://${host}` : request.url);
  };

  const fail = (status: number, message: string) => {
    if (asJson) return NextResponse.json({ ok: false, message }, { status });
    const back = pageUrl(kind === "finale" ? "/finale" : "/enter");
    back.searchParams.set("denied", "1");
    return NextResponse.redirect(back, 303);
  };

  if (!passwordsReady(kind)) {
    return fail(503, "This trail is not open yet. The passwords still need to be set.");
  }

  if (!passwordMatches(kind, password)) {
    return fail(401, wrongMessage[kind]);
  }

  const destination = pageUrl(kind === "finale" ? "/finale" : (safeNext(next) ?? "/"));
  const token = tokenFor(kind, password);
  const response = asJson
    ? NextResponse.json({ ok: true, token })
    : NextResponse.redirect(destination, 303);
  response.cookies.set(kind === "finale" ? FINALE_COOKIE : GATE_COOKIE, token, passCookieOptions(request));
  return response;
}
