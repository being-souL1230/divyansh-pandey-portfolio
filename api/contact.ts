import type { IncomingMessage, ServerResponse } from "node:http";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function readRawBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  if (req.method !== "POST") {
    sendJson(res, 405, { message: "Method not allowed" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    sendJson(res, 500, {
      message: "Email service is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL.",
    });
    return;
  }

  let payload: ContactPayload;
  try {
    if (req.body && typeof req.body === "object") {
      payload = req.body as ContactPayload;
    } else if (typeof req.body === "string" && req.body.trim()) {
      payload = JSON.parse(req.body) as ContactPayload;
    } else {
      const raw = await readRawBody(req);
      payload = raw ? (JSON.parse(raw) as ContactPayload) : {};
    }
  } catch {
    sendJson(res, 400, { message: "Invalid JSON body" });
    return;
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const message = (payload.message || "").trim();

  if (name.length < 2) {
    sendJson(res, 400, { message: "Name must be at least 2 characters", field: "name" });
    return;
  }
  if (!isValidEmail(email)) {
    sendJson(res, 400, { message: "Invalid email address", field: "email" });
    return;
  }
  if (message.length < 10) {
    sendJson(res, 400, { message: "Message must be at least 10 characters", field: "message" });
    return;
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong><br/>${safeMessage}</p>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    sendJson(res, 500, { message: `Email send failed: ${errorText}` });
    return;
  }

  sendJson(res, 200, { success: true, message: "Message sent successfully" });
}
