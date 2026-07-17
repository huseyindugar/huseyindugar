import { NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, { count: number; start: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // opportunistic cleanup so the map doesn't grow unbounded on a
  // long-running instance
  for (const [key, entry] of hits) {
    if (now - entry.start > RATE_LIMIT_WINDOW_MS) hits.delete(key);
  }

  const entry = hits.get(ip);
  if (!entry) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate-limited" }, { status: 429 });
  }

  const body = await request.json();
  const { name, phone, email, projectType, budget, message, consent } = body ?? {};

  if (!name || !phone || !message || !consent) {
    return NextResponse.json(
      { error: "missing-required-fields" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set - contact form cannot send email notifications."
    );
    return NextResponse.json({ error: "email-not-configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_EMAIL_TO || "info@sadedesign.com";

  try {
    await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || "Sade Design Website <onboarding@resend.dev>",
      to,
      replyTo: typeof email === "string" && email ? email : undefined,
      subject: `Yeni keşif talebi — ${name}`,
      text: [
        `Ad Soyad: ${name}`,
        `Telefon: ${phone}`,
        `E-posta: ${email || "-"}`,
        `Proje Tipi: ${projectType || "-"}`,
        `Bütçe Aralığı: ${budget || "-"}`,
        "",
        "Mesaj:",
        message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return NextResponse.json({ error: "send-failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
