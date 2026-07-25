import { NextResponse } from "next/server";
import { sendLead, isLeadEmailConfigured, LeadNotConfiguredError } from "@/lib/leads";

export const runtime = "nodejs";

// Shared endpoint for the contact and bulk-quote forms. Validates input,
// formats a plain-text lead, and hands off to the email provider. Returns
// 503 ("not_configured") when no provider is wired so the client can fall
// back to mailto: — see lib/leads.ts.

type LeadType = "contact" | "quote";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const type = str(body.type) as LeadType;
  const name = str(body.name);
  const email = str(body.email);

  if (!name || !looksLikeEmail(email)) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  let subject: string;
  let text: string;

  if (type === "quote") {
    const refrigerant = str(body.refrigerant);
    const cylinders = str(body.cylinders);
    if (!refrigerant || !cylinders) {
      return NextResponse.json({ error: "validation" }, { status: 422 });
    }
    subject = `Bulk Quote Request — ${refrigerant} (${cylinders} cylinders)`;
    text = [
      `Name: ${name}`,
      `Company: ${str(body.company) || "—"}`,
      `Email: ${email}`,
      `Phone: ${str(body.phone) || "—"}`,
      `Refrigerant: ${refrigerant}`,
      `Cylinders: ${cylinders}`,
      "",
      str(body.message) || "(no additional details)",
    ].join("\n");
  } else if (type === "contact") {
    const message = str(body.message);
    if (!message) {
      return NextResponse.json({ error: "validation" }, { status: 422 });
    }
    subject = `Website enquiry from ${name}`;
    text = [`From: ${name} (${email})`, "", message].join("\n");
  } else {
    return NextResponse.json({ error: "unknown_type" }, { status: 400 });
  }

  if (!isLeadEmailConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    await sendLead({ subject, text, replyTo: email });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof LeadNotConfiguredError) {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.error("Lead delivery failed:", err);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
