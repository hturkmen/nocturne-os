import { NextRequest, NextResponse } from "next/server";
import { site } from "@/content/site";
export const runtime = "nodejs";
const configured = () =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
const headers = () => ({
  apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
});
export async function GET() {
  if (!configured())
    return NextResponse.json({ mode: "local", notes: site.testimonials });
  try {
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/visitor_notes?approved=eq.true&select=id,name,message,created_at&order=created_at.desc&limit=100`,
      { headers: headers(), cache: "no-store" },
    );
    if (!response.ok) throw Error();
    return NextResponse.json({
      mode: "database",
      notes: await response.json(),
    });
  } catch {
    return NextResponse.json(
      { error: "Guestbook unavailable." },
      { status: 503 },
    );
  }
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host"))
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 4096)
    return NextResponse.json({ error: "Note is too large." }, { status: 413 });
  try {
    const raw = await request.text();
    if (raw.length > 4096)
      return NextResponse.json(
        { error: "Note is too large." },
        { status: 413 },
      );
    const data = JSON.parse(raw);
    if (typeof data.website === "string" && data.website)
      return NextResponse.json(
        { error: "Unable to accept this note." },
        { status: 400 },
      );
    if (
      typeof data.message !== "string" ||
      (data.name !== undefined && typeof data.name !== "string")
    )
      return NextResponse.json(
        { error: "Please enter a valid note." },
        { status: 400 },
      );
    const message = data.message.trim();
    const name = (data.name || "").trim() || "Anonymous";
    if (message.length < 5 || message.length > 500 || name.length > 40)
      return NextResponse.json(
        {
          error:
            "Use 5–500 characters for your note and up to 40 for your name.",
        },
        { status: 400 },
      );
    if (!configured())
      return NextResponse.json({ mode: "local", status: "save-in-browser" });
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const { createHmac } = await import("node:crypto");
    if (!process.env.RATE_LIMIT_SECRET)
      return NextResponse.json(
        { error: "Notes are temporarily unavailable." },
        { status: 503 },
      );
    const fingerprint = createHmac("sha256", process.env.RATE_LIMIT_SECRET)
      .update(ip)
      .digest("hex");
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/rpc/submit_visitor_note`,
      {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          note_name: name,
          note_message: message,
          client_fingerprint: fingerprint,
        }),
      },
    );
    if (response.status === 429)
      return NextResponse.json(
        { error: "Please wait a minute before leaving another note." },
        { status: 429 },
      );
    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        {
          error: detail.includes("rate_limit")
            ? "Please wait a minute before leaving another note."
            : "Your note could not be saved. Try again shortly.",
        },
        { status: detail.includes("rate_limit") ? 429 : 503 },
      );
    }
    return NextResponse.json({ mode: "database", status: "pending-review" });
  } catch {
    return NextResponse.json(
      { error: "Unable to read this note. Please try again." },
      { status: 400 },
    );
  }
}
