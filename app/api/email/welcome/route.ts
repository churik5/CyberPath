import { NextResponse } from "next/server";
import { Resend } from "resend";

import WelcomeEmail from "@/emails/welcome-email";
import { hasResendEnv } from "@/lib/integrations";
import type { Locale } from "@/lib/i18n";
import type { QuizResult } from "@/lib/types";

interface Payload {
  name: string;
  email: string;
  locale: Locale;
  postQuiz?: boolean;
  quizResult?: QuizResult | null;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;

  if (!hasResendEnv()) {
    return NextResponse.json(
      { ok: false, message: "Resend is not configured." },
      { status: 202 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const primaryTrack =
    body.quizResult?.primaryTrack.track.name ?? "Cybersecurity roadmap";

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: body.email,
    subject:
      body.locale === "ru"
        ? "Добро пожаловать в CyberPath"
        : "Welcome to CyberPath",
    react: WelcomeEmail({
      name: body.name,
      primaryTrack,
      locale: body.locale,
    }),
  });

  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
