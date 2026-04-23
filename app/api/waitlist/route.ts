import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = "https://waitlist-api-sigma.vercel.app/api/waitlist";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const upstream = await fetch(UPSTREAM, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, product: "gigledger" }),
  }).catch(() => null);

  if (!upstream?.ok) {
    return NextResponse.json({ error: "upstream error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
