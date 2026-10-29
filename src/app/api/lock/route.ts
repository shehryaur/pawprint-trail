import { NextResponse } from "next/server";
import { clearedCookieOptions, FINALE_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(FINALE_COOKIE, "", {
    ...clearedCookieOptions(request),
    expires: new Date(0),
  });
  return response;
}
