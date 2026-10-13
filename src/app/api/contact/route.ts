import { NextRequest, NextResponse } from "next/server";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  recipientEmail: string;
}

// Provider: EmailJS (server-side REST API)
async function sendViaEmailJS(payload: ContactPayload): Promise<void> {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !privateKey) {
    throw new Error("EmailJS env vars not configured");
  }

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: privateKey,
      template_params: {
        from_name: payload.name,
        from_email: payload.email,
        subject: payload.subject || `Inquiry from ${payload.name}`,
        message: payload.message,
        to_email: payload.recipientEmail,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`EmailJS failed (${res.status}): ${body}`);
  }
}

// Provider: Resend
async function sendViaResend(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_ADDRESS;

  if (!apiKey || !fromAddress) {
    throw new Error("Resend env vars not configured");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [payload.recipientEmail],
      reply_to: payload.email,
      subject: payload.subject || `Portfolio Inquiry from ${payload.name}`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;"><h2 style="color:#FF6B2B;margin-bottom:4px;">New Portfolio Inquiry</h2><p style="color:#666;font-size:13px;margin-bottom:24px;">Received via your portfolio contact form</p><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px 0;font-weight:600;width:100px;color:#333;">Name</td><td style="padding:8px 0;color:#555;">${payload.name}</td></tr><tr><td style="padding:8px 0;font-weight:600;color:#333;">Email</td><td style="padding:8px 0;"><a href="mailto:${payload.email}" style="color:#FF6B2B;">${payload.email}</a></td></tr><tr><td style="padding:8px 0;font-weight:600;color:#333;">Subject</td><td style="padding:8px 0;color:#555;">${payload.subject || "N/A"}</td></tr></table><hr style="border:none;border-top:1px solid #eee;margin:20px 0;" /><p style="font-weight:600;color:#333;margin-bottom:8px;">Message</p><p style="color:#555;line-height:1.7;white-space:pre-wrap;">${payload.message}</p></div>`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend failed (${res.status}): ${body}`);
  }
}

// Provider: Formspree
async function sendViaFormspree(payload: ContactPayload): Promise<void> {
  const formId = process.env.FORMSPREE_FORM_ID;

  if (!formId) {
    throw new Error("Formspree env var not configured");
  }

  const res = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      subject: payload.subject || `Inquiry from ${payload.name}`,
      message: payload.message,
      _replyto: payload.email,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Formspree failed (${res.status}): ${body}`);
  }
}

// Route Handler
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;

    const { name, email, message, recipientEmail } = body;
    if (!name || !email || !message || !recipientEmail) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    const providers: Array<{
      name: string;
      fn: (p: ContactPayload) => Promise<void>;
    }> = [
      { name: "EmailJS", fn: sendViaEmailJS },
      { name: "Resend", fn: sendViaResend },
      { name: "Formspree", fn: sendViaFormspree },
    ];

    const errors: string[] = [];

    for (const provider of providers) {
      try {
        await provider.fn(body);
        console.log(`[contact] Message sent via ${provider.name}`);
        return NextResponse.json(
          { success: true, provider: provider.name },
          { status: 200 }
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(`[contact] ${provider.name} failed: ${msg}`);
        errors.push(`${provider.name}: ${msg}`);
      }
    }

    console.error("[contact] All providers failed:", errors);
    return NextResponse.json(
      {
        error: "All email providers failed. Please try contacting directly.",
        details: errors,
      },
      { status: 502 }
    );
  } catch (err) {
    console.error("[contact] Unhandled error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}