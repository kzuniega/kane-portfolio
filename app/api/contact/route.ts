import sanitizeHtml from "sanitize-html";
import { contactFormSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

const allowedTags = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "s",
  "ul",
  "ol",
  "li",
  "blockquote",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (rawBody.length > 20_000) {
    return Response.json({ error: "Message is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }
    throw error;
  }

  if (!isRecord(payload)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof payload.body === "string" && payload.body.length > 15_000) {
    return Response.json({ error: "Message must be 15,000 characters or fewer." }, { status: 400 });
  }

  const sanitizedPayload = {
    ...payload,
    body: typeof payload.body === "string"
      ? sanitizeHtml(payload.body, { allowedTags, allowedAttributes: {} })
      : payload.body,
  };
  const validation = contactFormSchema.safeParse(sanitizedPayload);
  if (!validation.success) {
    return Response.json(
      { error: validation.error.issues[0]?.message ?? "Check your message and try again." },
      { status: 400 },
    );
  }

  const { email: cleanEmail, subject: cleanSubject, body: safeBody } = validation.data;
  const plainBody = sanitizeHtml(safeBody, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/gi, " ")
    .trim();

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;
  if (!apiKey || !senderEmail || !senderName || !recipientEmail) {
    console.error("Contact form is missing required Brevo configuration.");
    return Response.json({ error: "Contact form is not configured." }, { status: 503 });
  }

  const htmlContent = [
    `<p><strong>From:</strong> ${escapeHtml(cleanEmail)}</p>`,
    `<p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>`,
    "<hr>",
    safeBody,
  ].join("");
  const textContent = `From: ${cleanEmail}\nSubject: ${cleanSubject}\n\n${plainBody}`;

  let response: Response;
  try {
    response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: recipientEmail }],
        replyTo: { email: cleanEmail },
        subject: `[Portfolio] ${cleanSubject}`,
        htmlContent,
        textContent,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Brevo contact delivery request failed.", error);
    return Response.json({ error: "Message delivery is temporarily unavailable." }, { status: 502 });
  }

  if (!response.ok) {
    console.error(`Brevo rejected contact delivery with status ${response.status}.`);
    return Response.json({ error: "Message delivery is temporarily unavailable." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
