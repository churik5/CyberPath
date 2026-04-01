"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Compass,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/layout/section-heading";
import { TrackIcon } from "@/components/tracks/track-icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  howItWorksSteps,
  platformBenefits,
  quizQuestions,
  sampleMilestones,
  tracks,
} from "@/lib/data/cyberpath";
import { uiDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function MotionBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function HeroConstellation() {
  const positionedTracks = [
    { slug: "application-security", top: "12%", left: "14%" },
    { slug: "cloud-security", top: "18%", left: "68%" },
    { slug: "security-engineering", top: "44%", left: "76%" },
    { slug: "soc-blue-team", top: "66%", left: "70%" },
    { slug: "dfir", top: "72%", left: "22%" },
    { slug: "threat-intelligence", top: "50%", left: "8%" },
  ] as const;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      <div className="hero-orb absolute inset-10 rounded-full" />
      <div className="absolute inset-[18%] rounded-full border border-cyan-300/12" />
      <div className="absolute inset-[28%] rounded-full border border-cyan-300/10" />
      <div className="absolute inset-[38%] rounded-full border border-cyan-300/8" />
      <div className="absolute inset-0 rounded-[32px] border border-white/8 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16),transparent_54%),linear-gradient(180deg,rgba(10,16,32,0.82),rgba(7,11,24,0.45))] shadow-[0_40px_120px_rgba(0,0,0,0.45)]" />

      {positionedTracks.map((position) => {
        const track = tracks.find((item) => item.slug === position.slug);
        if (!track) return null;

        return (
          <div
            key={track.slug}
            className="orbit-node"
            style={{ top: position.top, left: position.left }}
          >
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-lg">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${track.accent}22`,
                  color: track.accent,
                }}
              >
                <TrackIcon icon={track.icon} />
              </span>
              <span className="text-sm font-medium text-slate-200">
                {track.name}
              </span>
            </div>
          </div>
        );
      })}

      <div className="absolute inset-[31%] rounded-full border border-cyan-300/18 bg-[radial-gradient(circle_at_30%_30%,rgba(82,229,255,0.18),transparent_58%),linear-gradient(180deg,rgba(10,17,32,0.95),rgba(5,9,20,0.88))] p-8 shadow-[0_36px_120px_rgba(17,24,39,0.58)]">
        <div className="flex h-full flex-col justify-between">
          <Badge className="w-fit">Assessment Engine</Badge>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/60">
              Pathfinder mode
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Match users to the cybersecurity work they are most likely to
              enjoy.
            </h3>
            <p className="text-sm leading-6 text-slate-300">
              CyberPath turns onboarding answers into ranked tracks, signal
              profiles, and beginner roadmaps.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Top fit
              </p>
              <p className="mt-2 text-base font-medium text-white">
                Application Security
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                Signals: builder + defender
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                Roadmap unlocked
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  const { t, locale } = useLocale();
  const { isAuthenticated } = useAuth();

  const heroStats = [
    {
      label: locale === "ru" ? "Умных вопросов" : "Smart questions",
      value: `${quizQuestions.length}`,
    },
    {
      label: locale === "ru" ? "Кибер-треков" : "Cyber tracks",
      value: `${tracks.length}`,
    },
    {
      label: locale === "ru" ? "Персональный путь" : "Roadmap created",
      value: locale === "ru" ? "1 roadmap" : "1 personalized path",
    },
  ];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="container-shell grid gap-16 py-18 lg:min-h-[calc(100svh-80px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-2xl space-y-8"
          >
            <Badge>{t(uiDictionary.hero.badge)}</Badge>
            <div className="space-y-6">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {t(uiDictionary.hero.title).split(" ").slice(0, -3).join(" ")}{" "}
                <span className="text-gradient">
                  {t(uiDictionary.hero.title).split(" ").slice(-3).join(" ")}
                </span>
              </h1>
              <p className="max-w-xl text-pretty text-lg leading-8 text-slate-300 sm:text-xl">
                {t(uiDictionary.hero.subtitle)}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/quiz" className={buttonVariants({ size: "lg" })}>
                {t(uiDictionary.hero.primaryCta)}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={isAuthenticated ? "/dashboard" : "/auth?mode=sign-in"}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {isAuthenticated
                  ? t(uiDictionary.hero.afterAuthPrimary)
                  : t(uiDictionary.hero.secondaryCta)}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[24px] border border-white/8 bg-white/4 px-5 py-4 backdrop-blur-sm"
                >
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <HeroConstellation />
          </motion.div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={locale === "ru" ? "Как это работает" : "How it works"}
            title={
              locale === "ru"
                ? "Простой продуктовый флоу вокруг выбора карьерного направления, а не случайного серфинга по курсам."
                : "A simple flow built around career discovery, not random course browsing."
            }
            description={
              locale === "ru"
                ? "CyberPath ощущается как настоящее product onboarding. Каждый экран переводит пользователя от неопределенности к ясному направлению, понятному совпадению и структурированному стартовому плану."
                : "CyberPath is designed to feel like a real product onboarding. Every screen moves the user from uncertainty toward a clear direction, a reasoned match, and a structured starting plan."
            }
            align="center"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
              <MotionBlock key={step.title}>
                <div className="panel rounded-[28px] p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/60">
                    {locale === "ru" ? `Шаг ${index + 1}` : `Step ${index + 1}`}
                  </p>
                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    {locale === "ru"
                      ? [
                          "Ответь на вопросы",
                          "Получи совпадения по security-трекам",
                          "Начни learning path",
                        ][index]
                      : step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {locale === "ru"
                      ? [
                          "Пройди спокойный onboarding-квиз, который измеряет интересы, стиль работы и сильные стороны, а не школьные знания.",
                          "Узнай, какие домены кибербезопасности ближе всего именно тебе, и почему система решила именно так.",
                          "Сразу открой beginner roadmap с модулями, практикой и карьерным контекстом.",
                        ][index]
                      : step.description}
                  </p>
                </div>
              </MotionBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionBlock className="panel rounded-[32px] p-8">
            <div className="flex items-center gap-3 text-cyan-100">
              <BrainCircuit className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.24em]">
                {locale === "ru" ? "Основа assessment" : "Assessment core"}
              </p>
            </div>
            <div className="mt-8 space-y-6">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  {locale === "ru" ? "Пример экрана" : "Live example"}
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  {locale === "ru"
                    ? "«Тебе ближе строить более безопасные системы или разбирать инциденты?»"
                    : "“Do you prefer building systems or investigating incidents?”"}
                </h3>
                <p className="text-sm leading-7 text-slate-300">
                  {locale === "ru"
                    ? "Один вопрос на экран. Короткие формулировки. Плавные переходы. Веса ответов работают под капотом. Ничего не ощущается как экзамен."
                    : "One question per screen. Short wording. Smooth transitions. Weighted scoring behind the scenes. Nothing feels like an exam."}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{locale === "ru" ? "Прогресс" : "Progress"}</span>
                  <span>12 / 20</span>
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div className="h-full w-3/5 rounded-full bg-[linear-gradient(90deg,#52e5ff,#7b8cff)]" />
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  locale === "ru"
                    ? "Я бы лучше проектировал более безопасные системы"
                    : "I’d rather design safer systems",
                  locale === "ru"
                    ? "Я бы лучше расследовал инциденты"
                    : "I’d rather investigate incidents",
                  locale === "ru"
                    ? "Мне одинаково интересны оба варианта"
                    : "I enjoy both equally",
                ].map((label, index) => (
                  <div
                    key={label}
                    className={cn(
                      "rounded-[22px] border px-4 py-4 text-sm leading-6 transition-all",
                      index === 0
                        ? "border-cyan-300/30 bg-cyan-300/10 text-white"
                        : "border-white/8 bg-white/4 text-slate-300",
                    )}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </MotionBlock>

          <MotionBlock className="space-y-6">
            <SectionHeading
              eyebrow={
                locale === "ru" ? "Что измеряет квиз" : "What the quiz measures"
              }
              title={
                locale === "ru"
                  ? "Интересы, сильные стороны и стиль работы мапятся в реальные направления кибербезопасности."
                  : "Interests, strengths, and working style map into real cybersecurity domains."
              }
              description={
                locale === "ru"
                  ? "CyberPath считает баллы по техническим, аналитическим, defensive, policy и human-centered предпочтениям, а потом ранжирует те домены, которые тебе действительно подходят."
                  : "CyberPath scores across technical, analytical, defensive, offensive-simulation, policy, and human-centered preferences, then ranks the domains that fit best."
              }
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Compass,
                  title: locale === "ru" ? "Логика pathfinder" : "Pathfinder logic",
                  description:
                    locale === "ru"
                      ? "Каждый ответ дает weighted points одному или нескольким трекам, поэтому результат выглядит нюансно, а не бинарно."
                      : "Each answer contributes weighted points to one or more tracks, so results feel nuanced instead of binary.",
                },
                {
                  icon: Sparkles,
                  title:
                    locale === "ru"
                      ? "Объяснение почему ты совпал"
                      : "Why-you-matched explanations",
                  description:
                    locale === "ru"
                      ? "Results page объясняет не только название домена, но и сигналы, которые привели к совпадению."
                      : "Results pages explain the signals behind the match, not just the category name.",
                },
                {
                  icon: GraduationCap,
                  title:
                    locale === "ru"
                      ? "Roadmap, а не тупик"
                      : "Roadmaps, not dead ends",
                  description:
                    locale === "ru"
                      ? "Пользователь идет прямо от результата к beginner modules, mini-challenges и следующим шагам."
                      : "Users move directly from result to beginner modules, practical mini-challenges, and next-step guidance.",
                },
                {
                  icon: BrainCircuit,
                  title:
                    locale === "ru"
                      ? "Сначала career orientation"
                      : "Career orientation first",
                  description:
                    locale === "ru"
                      ? "Продукт остается сфокусированным на fit, выборе направления и readiness к обучению, а не притворяется hacking simulator."
                      : "The product stays focused on fit, direction, and learning readiness instead of pretending to be a hacking simulator.",
                },
              ].map((item) => (
                <div key={item.title} className="panel rounded-[28px] p-6">
                  <item.icon className="h-6 w-6 text-cyan-200" />
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </MotionBlock>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Cybersecurity tracks"
            title="Ten distinct directions users can discover, compare, and pursue."
            description="Each path combines role context, realistic tasks, skill expectations, beginner modules, and a clear tone so users can picture the work before they commit to it."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tracks.map((track) => (
              <MotionBlock key={track.slug}>
                <Link
                  href={`/tracks/${track.slug}`}
                  className="group panel block rounded-[28px] p-6 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: `${track.accent}18`,
                        color: track.accent,
                      }}
                    >
                      <TrackIcon icon={track.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {track.category}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">
                    {track.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {track.shortDescription}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {track.starterResources.slice(0, 2).map((resource) => (
                      <span
                        key={resource}
                        className="rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </Link>
              </MotionBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <MotionBlock className="space-y-6">
            <SectionHeading
              eyebrow="Learning dashboard"
              title="The result turns into a personalized roadmap users can actually follow."
              description="The dashboard is where CyberPath becomes more than an assessment. It tracks a chosen path, shows module progress, saves favorite domains, and makes progress feel tangible."
            />
            <div className="grid gap-4">
              {platformBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-[24px] border border-white/8 bg-white/4 px-5 py-4 text-sm leading-7 text-slate-300"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </MotionBlock>

          <MotionBlock className="panel rounded-[32px] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
              Sample dashboard state
            </p>
            <div className="mt-6 space-y-6">
              <div className="rounded-[26px] border border-white/8 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Chosen track</p>
                    <p className="mt-1 text-xl font-semibold text-white">
                      Application Security
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Progress</p>
                    <p className="mt-1 text-xl font-semibold text-white">42%</p>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/8">
                  <div className="h-full w-[42%] rounded-full bg-[linear-gradient(90deg,#52e5ff,#7b8cff)]" />
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  "Secure coding basics",
                  "Threat modeling for features",
                  "API auth review",
                ].map((moduleTitle, index) => (
                  <div
                    key={moduleTitle}
                    className="rounded-[24px] border border-white/8 bg-white/4 px-5 py-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {moduleTitle}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                          {index === 0 ? "Completed" : index === 1 ? "In progress" : "Next up"}
                        </p>
                      </div>
                      <div className="text-sm text-slate-400">
                        {index === 0 ? "100%" : index === 1 ? "60%" : "0%"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[24px] border border-white/8 bg-white/4 p-5">
                <p className="text-sm font-medium text-white">Milestones</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {sampleMilestones.map((milestone) => (
                    <span
                      key={milestone}
                      className="rounded-full border border-cyan-300/14 bg-cyan-300/8 px-3 py-1.5 text-xs text-cyan-100"
                    >
                      {milestone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </MotionBlock>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="panel rounded-[36px] px-8 py-12 text-center sm:px-12">
            <SectionHeading
              eyebrow="Start now"
              title="Take the assessment and get your first cybersecurity roadmap in a few minutes."
              description="CyberPath is designed for curious beginners who want a clean answer to one hard question: where should I actually start in cybersecurity?"
              align="center"
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/quiz" className={buttonVariants({ size: "lg" })}>
                Take the Quiz
              </Link>
              <Link
                href="/tracks"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Browse all tracks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
