import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import type { Locale } from "@/lib/i18n";

interface WelcomeEmailProps {
  name: string;
  primaryTrack: string;
  locale: Locale;
}

export default function WelcomeEmail({
  name,
  primaryTrack,
  locale,
}: WelcomeEmailProps) {
  const copy =
    locale === "ru"
      ? {
          preview: "Твой первый маршрут в CyberPath уже готов",
          title: `Добро пожаловать, ${name}!`,
          intro:
            "Ты создал аккаунт в CyberPath, и мы сохранили твой результат квиза.",
          body: `На текущий момент твой strongest match: ${primaryTrack}. Следующий шаг — открыть dashboard и начать первый модуль.`,
        }
      : {
          preview: "Your first CyberPath roadmap is ready",
          title: `Welcome, ${name}!`,
          intro:
            "You created a CyberPath account and your quiz result has been saved.",
          body: `Your current strongest match is ${primaryTrack}. Next, open the dashboard and start your first module.`,
        };

  return (
    <Html>
      <Head />
      <Preview>{copy.preview}</Preview>
      <Body
        style={{
          margin: 0,
          backgroundColor: "#050917",
          color: "#f8fbff",
          fontFamily:
            '"Avenir Next","Segoe UI","IBM Plex Sans",Arial,sans-serif',
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            padding: "40px 24px",
          }}
        >
          <Section
            style={{
              border: "1px solid rgba(148,163,184,0.18)",
              borderRadius: "28px",
              padding: "32px",
              background:
                "linear-gradient(180deg, rgba(15,22,40,0.95), rgba(7,10,22,0.92))",
            }}
          >
            <Text
              style={{
                color: "#B5ECF9",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.28em",
                margin: 0,
              }}
            >
              CyberPath
            </Text>
            <Heading
              style={{
                fontSize: "30px",
                lineHeight: "1.2",
                color: "#FFFFFF",
                marginTop: "20px",
                marginBottom: "16px",
              }}
            >
              {copy.title}
            </Heading>
            <Text
              style={{
                color: "#CBD5E1",
                lineHeight: "1.8",
                margin: 0,
                fontSize: "15px",
              }}
            >
              {copy.intro}
            </Text>
            <Text
              style={{
                color: "#CBD5E1",
                lineHeight: "1.8",
                marginTop: "16px",
                marginBottom: 0,
                fontSize: "15px",
              }}
            >
              {copy.body}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
