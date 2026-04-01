"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { quizQuestions } from "@/lib/data/cyberpath";
import { uiDictionary } from "@/lib/i18n";
import { getLocalizedQuizQuestions } from "@/lib/localized-content";
import { computeQuizResult, STORAGE_KEYS } from "@/lib/quiz-engine";
import { QuizAnswerMap } from "@/lib/types";
import { cn, formatPercent } from "@/lib/utils";

interface QuizFlowProps {
  shouldReset?: boolean;
}

export function QuizFlow({ shouldReset = false }: QuizFlowProps) {
  const router = useRouter();
  const { t, locale } = useLocale();
  const { isAuthenticated } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswerMap>({});

  useEffect(() => {
    let nextStep = 0;
    let nextAnswers: QuizAnswerMap = {};

    if (shouldReset) {
      window.localStorage.removeItem(STORAGE_KEYS.quizProgress);
      window.localStorage.removeItem(STORAGE_KEYS.quizResult);
    }

    const stored = window.localStorage.getItem(STORAGE_KEYS.quizProgress);

    if (stored && !shouldReset) {
      const parsed = JSON.parse(stored) as {
        step: number;
        answers: QuizAnswerMap;
      };
      nextStep = parsed.step ?? 0;
      nextAnswers = parsed.answers ?? {};
    }

    queueMicrotask(() => {
      setStep(nextStep);
      setAnswers(nextAnswers);
      setHydrated(true);
    });
  }, [shouldReset]);

  useEffect(() => {
    if (!hydrated) return;

    window.localStorage.setItem(
      STORAGE_KEYS.quizProgress,
      JSON.stringify({ step, answers }),
    );
  }, [answers, hydrated, step]);

  if (!hydrated) {
    return (
      <div className="container-shell py-16">
        <div className="panel rounded-[32px] p-8 text-slate-300">
          {t(uiDictionary.quiz.preparing)}
        </div>
      </div>
    );
  }

  const localizedQuestions = getLocalizedQuizQuestions(locale);
  const question = localizedQuestions[step];
  const totalQuestions = quizQuestions.length;
  const progressValue = ((step + 1) / totalQuestions) * 100;
  const currentAnswer = answers[question.id];
  const answeredCount = Object.keys(answers).length;
  const liveResult = computeQuizResult(answers);

  const setAnswer = (value: string | number) => {
    setAnswers((current) => ({
      ...current,
      [question.id]: value,
    }));
  };

  const goNext = () => {
    if (currentAnswer === undefined) return;

    if (step === totalQuestions - 1) {
      const result = computeQuizResult(answers);
      window.localStorage.setItem(
        STORAGE_KEYS.quizResult,
        JSON.stringify(result),
      );

      startTransition(() => {
        router.push(isAuthenticated ? "/results" : "/auth?mode=sign-up&postQuiz=1");
      });

      return;
    }

    setStep((current) => Math.min(current + 1, totalQuestions - 1));
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  return (
    <div className="container-shell py-10 lg:py-14">
      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="panel rounded-[36px] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <Badge>{t(uiDictionary.quiz.badge)}</Badge>
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {t(uiDictionary.quiz.title)}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    {t(uiDictionary.quiz.subtitle)}
                  </p>
                </div>
              </div>
              <div className="text-sm text-slate-400">
                {t(uiDictionary.quiz.questionOf)} {step + 1} / {totalQuestions}
              </div>
            </div>

            <Progress value={progressValue} />

            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-[32px] border border-white/8 bg-white/[0.03] p-6 sm:p-8"
              >
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/60">
                    {t(uiDictionary.quiz.assessmentPrompt)}
                  </p>
                  <h2 className="text-balance text-3xl font-semibold tracking-tight text-white">
                    {question.prompt}
                  </h2>
                  <p className="max-w-2xl text-sm leading-7 text-slate-300">
                    {question.helper}
                  </p>
                </div>

                {question.type === "single" ? (
                  <div className="mt-8 grid gap-3">
                    {question.options.map((option) => {
                      const selected = currentAnswer === option.id;

                      return (
                        <button
                          key={option.id}
                          onClick={() => setAnswer(option.id)}
                          className={cn(
                            "rounded-[24px] border px-5 py-5 text-left transition-all duration-200",
                            selected
                              ? "border-cyan-300/30 bg-cyan-300/10 shadow-[0_18px_42px_rgba(82,229,255,0.1)]"
                              : "border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.05]",
                          )}
                        >
                          <p className="text-base font-medium text-white">
                            {option.label}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {option.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-8 space-y-6">
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 4, 5].map((value) => {
                        const selected = currentAnswer === value;

                        return (
                          <button
                            key={value}
                            onClick={() => setAnswer(value)}
                            className={cn(
                              "flex h-20 items-center justify-center rounded-[24px] border text-xl font-semibold transition-all duration-200",
                              selected
                                ? "border-cyan-300/30 bg-cyan-300/10 text-white shadow-[0_18px_42px_rgba(82,229,255,0.1)]"
                                : "border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/14 hover:bg-white/[0.05]",
                            )}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                      <span>{question.minLabel}</span>
                      <span>{question.maxLabel}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <Button variant="outline" onClick={goBack} disabled={step === 0}>
                  <ChevronLeft className="h-4 w-4" />
                  {t(uiDictionary.quiz.back)}
                </Button>
                <Link
                  href="/tracks"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  {t(uiDictionary.quiz.exploreFirst)}
                </Link>
              </div>
              <Button onClick={goNext} disabled={currentAnswer === undefined}>
                {step === totalQuestions - 1
                  ? t(uiDictionary.quiz.seeResults)
                  : t(uiDictionary.quiz.next)}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="panel rounded-[32px] p-6">
            <div className="flex items-center gap-3 text-cyan-100">
              <ShieldCheck className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.24em]">
                {t(uiDictionary.quiz.liveFit)}
              </p>
            </div>

            {answeredCount === 0 ? (
              <p className="mt-5 text-sm leading-7 text-slate-300">
                {t(uiDictionary.quiz.liveFitEmpty)}
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {liveResult.rankedTracks.slice(0, 3).map((entry, index) => (
                  <div
                    key={entry.track.slug}
                    className="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                          {index === 0
                            ? t(uiDictionary.quiz.currentBestFit)
                            : index === 1
                              ? t(uiDictionary.quiz.secondaryFit)
                              : t(uiDictionary.quiz.thirdFit)}
                        </p>
                        <p className="mt-2 text-base font-medium text-white">
                          {entry.track.name}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-cyan-100">
                        {formatPercent(entry.fitPercent)}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {entry.track.shortDescription}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel rounded-[32px] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
              {t(uiDictionary.quiz.measures)}
            </p>
            <div className="mt-5 grid gap-3">
              {[
                t(uiDictionary.quiz.measureItems.builder),
                t(uiDictionary.quiz.measureItems.defender),
                t(uiDictionary.quiz.measureItems.investigator),
                t(uiDictionary.quiz.measureItems.analyst),
                t(uiDictionary.quiz.measureItems.strategist),
                t(uiDictionary.quiz.measureItems.people),
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
