import "server-only";

// ---------------------------------------------------------------------------
// Lead delivery. Form submissions (contact + bulk quote) are emailed to the
// shop inbox via Resend (https://resend.com) using its REST API — no SDK
// dependency required. The provider is intentionally thin and env-gated:
//
//   RESEND_API_KEY   server-side API key
//   LEAD_TO_EMAIL    where leads are delivered (e.g. sales@airrefrigerant.com)
//   LEAD_FROM_EMAIL  a verified sender on your Resend domain
//
// When these are not set, sendLead() throws LeadNotConfiguredError and the API
// route returns 503 so the client can fall back to a mailto: link. This keeps
// the forms functional before the provider is connected, and makes "real"
// delivery a pure configuration step. Swapping Resend for SMTP/SendGrid/etc.
// only means editing this one file.
// ---------------------------------------------------------------------------

export class LeadNotConfiguredError extends Error {
  constructor() {
    super("Lead email delivery is not configured");
    this.name = "LeadNotConfiguredError";
  }
}

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const LEAD_TO_EMAIL = process.env.LEAD_TO_EMAIL?.trim();
const LEAD_FROM_EMAIL = process.env.LEAD_FROM_EMAIL?.trim();

export function isLeadEmailConfigured(): boolean {
  return Boolean(RESEND_API_KEY && LEAD_TO_EMAIL && LEAD_FROM_EMAIL);
}

export async function sendLead({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  if (!isLeadEmailConfigured()) throw new LeadNotConfiguredError();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: LEAD_FROM_EMAIL,
      to: [LEAD_TO_EMAIL],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Email provider responded ${res.status}: ${detail}`);
  }
}
