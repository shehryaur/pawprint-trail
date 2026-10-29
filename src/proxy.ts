import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clearedCookieOptions, cookieMatches, FINALE_COOKIE, GATE_COOKIE, GATE_HEADER, safeNext } from "@/lib/auth";

function forgetCookies(response: NextResponse, request: NextRequest) {
  const expired = clearedCookieOptions(request);
  response.cookies.set(GATE_COOKIE, "", expired);
  response.cookies.set(FINALE_COOKIE, "", expired);
  return response;
}

function enterUrl(request: NextRequest) {
  const enter = new URL("/enter", request.url);
  const next = safeNext(request.nextUrl.pathname + request.nextUrl.search);
  if (next && next !== "/") enter.searchParams.set("next", next);
  return enter;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/api/unlock" || pathname === "/api/lock" || pathname === "/api/sign-out" || pathname === "/api/progress") {
    return NextResponse.next();
  }

  const presented = request.headers.get(GATE_HEADER) ?? request.cookies.get(GATE_COOKIE)?.value;
  const allowed = cookieMatches("gate", presented);

  if (pathname === "/enter") {
    if (allowed) {
      const next = safeNext(request.nextUrl.searchParams.get("next")) ?? "/";
      return NextResponse.redirect(new URL(next, request.url));
    }
    return NextResponse.next();
  }

  if (!allowed) {
    return forgetCookies(NextResponse.redirect(enterUrl(request)), request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
