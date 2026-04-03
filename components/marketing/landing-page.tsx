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

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
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
      label: locale === "ru" ? "Персональный путь" : "Personalized path",
      value: "1",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="container-shell py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-sky-400/20 bg-sky-400/8 px-3 py-1.5 text-sm text-sky-300 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            {t(uiDictionary.hero.badge)}
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
            {t(uiDictionary.hero.title).split(" ").slice(0, -3).join(" ")}{" "}
            <span className="text-gradient">
              {t(uiDictionary.hero.title).split(" ").slice(-3).join(" ")}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            {t(uiDictionary.hero.subtitle)}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

          <div className="mt-10 flex flex-wrap gap-6">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-0.5 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={locale === "ru" ? "Как это работает" : "How it works"}
            title={
              locale === "ru"
                ? "Простой флоу вокруг выбора карьерного направления."
                : "A simple flow built around career discovery."
            }
            description={
              locale === "ru"
                ? "Каждый экран переводит тебя от неопределённости к ясному направлению и структурированному плану."
                : "Every screen moves you from uncertainty toward a clear direction and a structured starting plan."
            }
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.08}>
                <div className="panel rounded-2xl p-6 h-full">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/10 text-sm font-semibold text-sky-300">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {locale === "ru"
                      ? ["Ответь на вопросы", "Получи совпадения", "Начни learning path"][index]
                      : step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {locale === "ru"
                      ? [
                          "Пройди onboarding-квиз, который измеряет интересы, стиль работы и сильные стороны, а не школьные знания.",
                          "Узнай, какие домены кибербезопасности ближе всего именно тебе, и почему.",
                          "Сразу открой beginner roadmap с модулями, практикой и карьерным контекстом.",
                        ][index]
                      : step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz preview + Features */}
      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn className="panel rounded-2xl p-7">
            <p className="text-sm font-medium text-sky-400 mb-6">
              {locale === "ru" ? "Пример вопроса" : "Sample question"}
            </p>
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-semibold text-white leading-snug">
                {locale === "ru"
                  ? "Тебе ближе строить безопасные системы или расследовать инциденты?"
                  : "Do you prefer building secure systems or investigating incidents?"}
              </h3>
              <p className="text-sm text-slate-400">
                {locale === "ru"
                  ? "Один вопрос на экран. Ничего не ощущается как экзамен."
                  : "One question per screen. Nothing feels like an exam."}
              </p>
            </div>

            <div className="mb-5 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{locale === "ru" ? "Прогресс" : "Progress"}</span>
                <span>12 / 20</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8">
                <div className="h-full w-3/5 rounded-full bg-[linear-gradient(90deg,#38bdf8,#818cf8)]" />
              </div>
            </div>

            <div className="grid gap-2">
              {[
                locale === "ru" ? "Проектировать более безопасные системы" : "Design safer systems",
                locale === "ru" ? "Расследовать инциденты" : "Investigate incidents",
                locale === "ru" ? "Одинаково интересно" : "Both equally",
              ].map((label, index) => (
                <div
                  key={label}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-sm transition-all",
                    index === 0
                      ? "border-sky-400/25 bg-sky-400/8 text-white"
                      : "border-white/6 bg-white/3 text-slate-400",
                  )}
                >
                  {label}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="space-y-5" delay={0.1}>
            <SectionHeading
              eyebrow={locale === "ru" ? "Что измеряет квиз" : "What the quiz measures"}
              title={
                locale === "ru"
                  ? "Интересы и стиль работы映射ся в реальные направления."
                  : "Interests and working style map into real cybersecurity domains."
              }
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Compass,
                  title: locale === "ru" ? "Pathfinder логика" : "Pathfinder logic",
                  description:
                    locale === "ru"
                      ? "Каждый ответ даёт weighted points нескольким трекам — результат выглядит нюансно."
                      : "Each answer scores across tracks — results feel nuanced, not binary.",
                },
                {
                  icon: Sparkles,
                  title: locale === "ru" ? "Объяснение совпадения" : "Match explanations",
                  description:
                    locale === "ru"
                      ? "Results page объясняет сигналы, которые привели к совпадению."
                      : "Results explain the signals behind the match, not just the category.",
                },
                {
                  icon: GraduationCap,
                  title: locale === "ru" ? "Roadmap, не тупик" : "Roadmaps, not dead ends",
                  description:
                    locale === "ru"
                      ? "Сразу от результата к beginner modules и следующим шагам."
                      : "Move directly from result to beginner modules and next-step guidance.",
                },
                {
                  icon: BrainCircuit,
                  title: locale === "ru" ? "Career orientation" : "Career orientation",
                  description:
                    locale === "ru"
                      ? "Фокус на fit и выборе направления, а не на симуляции хакинга."
                      : "Focused on fit and direction, not pretending to be a hacking simulator.",
                },
              ].map((item) => (
                <div key={item.title} className="panel rounded-2xl p-5">
                  <item.icon className="h-5 w-5 text-sky-400" />
                  <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tracks */}
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Cybersecurity tracks"
            title={
              locale === "ru"
                ? "Десять направлений, которые ты можешь исследовать."
                : "Ten distinct directions you can discover and pursue."
            }
            description={
              locale === "ru"
                ? "Каждый путь включает контекст роли, реальные задачи, навыки и beginner roadmap."
                : "Each path includes role context, realistic tasks, skill expectations, and a beginner roadmap."
            }
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tracks.map((track, index) => (
              <FadeIn key={track.slug} delay={Math.min(index * 0.05, 0.3)}>
                <Link
                  href={`/tracks/${track.slug}`}
                  className="group panel block rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/14"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${track.accent}15`,
                        color: track.accent,
                      }}
                    >
                      <TrackIcon icon={track.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-xs text-slate-500">{track.category}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{track.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{track.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {track.starterResources.slice(0, 2).map((resource) => (
                      <span
                        key={resource}
                        className="rounded-md border border-white/6 bg-white/4 px-2.5 py-1 text-xs text-slate-400"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn className="space-y-5">
            <SectionHeading
              eyebrow="Learning dashboard"
              title={
                locale === "ru"
                  ? "Результат превращается в персональный roadmap."
                  : "The result turns into a personalized roadmap."
              }
              description={
                locale === "ru"
                  ? "Dashboard отслеживает прогресс, показывает модули, сохраняет избранные треки."
                  : "The dashboard tracks your chosen path, shows module progress, and saves favourite domains."
              }
            />
            <div className="grid gap-2">
              {platformBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-3 text-sm text-slate-300"
                >
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  {benefit}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="panel rounded-2xl p-6" delay={0.1}>
            <p className="text-sm font-medium text-sky-400 mb-5">
              {locale === "ru" ? "Пример дашборда" : "Sample dashboard"}
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border border-white/6 bg-white/4 p-4">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs text-slate-500">
                      {locale === "ru" ? "Выбранный трек" : "Chosen track"}
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-white">
                      Application Security
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">
                      {locale === "ru" ? "Прогресс" : "Progress"}
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-white">42%</p>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-white/8">
                  <div className="h-full w-[42%] rounded-full bg-[linear-gradient(90deg,#38bdf8,#818cf8)]" />
                </div>
              </div>

              <div className="grid gap-2">
                {[
                  { title: "Secure coding basics", status: locale === "ru" ? "Завершено" : "Completed", pct: "100%" },
                  { title: "Threat modeling", status: locale === "ru" ? "В процессе" : "In progress", pct: "60%" },
                  { title: "API auth review", status: locale === "ru" ? "Следующий" : "Next up", pct: "0%" },
                ].map((module) => (
                  <div
                    key={module.title}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-white/3 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{module.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{module.status}</p>
                    </div>
                    <span className="text-sm text-slate-400">{module.pct}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-white/6 bg-white/3 p-4">
                <p className="text-sm font-medium text-white mb-3">
                  {locale === "ru" ? "Достижения" : "Milestones"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {sampleMilestones.map((milestone) => (
                    <span
                      key={milestone}
                      className="rounded-md border border-sky-400/15 bg-sky-400/6 px-2.5 py-1 text-xs text-sky-300"
                    >
                      {milestone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-space">
        <div className="container-shell">
          <div className="panel rounded-2xl px-8 py-12 text-center">
            <SectionHeading
              eyebrow={locale === "ru" ? "Начать" : "Start now"}
              title={
                locale === "ru"
                  ? "Пройди assessment и получи свой первый roadmap за несколько минут."
                  : "Take the assessment and get your first cybersecurity roadmap in minutes."
              }
              description={
                locale === "ru"
                  ? "CyberPath для любопытных новичков, которые хотят чёткий ответ: с чего начать в кибербезопасности?"
                  : "CyberPath is for curious beginners who want a clear answer: where should I actually start in cybersecurity?"
              }
              align="center"
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/quiz" className={buttonVariants({ size: "lg" })}>
                {locale === "ru" ? "Пройти квиз" : "Take the Quiz"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tracks"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {locale === "ru" ? "Все треки" : "Browse all tracks"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
