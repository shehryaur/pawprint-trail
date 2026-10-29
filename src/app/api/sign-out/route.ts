import { NextResponse } from "next/server";
import { clearedCookieOptions, FINALE_COOKIE, GATE_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const response = NextResponse.json({ ok: true });
  const expired = clearedCookieOptions(request);
  response.cookies.set(GATE_COOKIE, "", expired);
  response.cookies.set(FINALE_COOKIE, "", expired);
  return response;
}
