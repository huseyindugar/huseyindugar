import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
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
