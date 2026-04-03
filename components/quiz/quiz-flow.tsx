"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
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
      const parsed = JSON.parse(stored) as { step: number; answers: QuizAnswerMap };
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
        <div className="panel rounded-2xl p-8 text-slate-400 text-sm">
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
    setAnswers((current) => ({ ...current, [question.id]: value }));
  };

  const goNext = () => {
    if (currentAnswer === undefined) return;

    if (step === totalQuestions - 1) {
      const result = computeQuizResult(answers);
      window.localStorage.setItem(STORAGE_KEYS.quizResult, JSON.stringify(result));
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
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">

        {/* Main question card */}
        <div className="panel rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-2">
            <p className="text-sm font-medium text-sky-400">
              {t(uiDictionary.quiz.badge)}
            </p>
            <span className="text-sm text-slate-500">
              {step + 1} / {totalQuestions}
            </span>
          </div>

          <Progress value={progressValue} className="mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="mb-6">
                <p className="text-xs text-slate-500 mb-2">
                  {t(uiDictionary.quiz.assessmentPrompt)}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {question.prompt}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {question.helper}
                </p>
              </div>

              {question.type === "single" ? (
                <div className="grid gap-2.5">
                  {question.options.map((option) => {
                    const selected = currentAnswer === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setAnswer(option.id)}
                        className={cn(
                          "rounded-xl border px-5 py-4 text-left transition-all duration-150",
                          selected
                            ? "border-sky-400/25 bg-sky-400/8 shadow-[0_0_16px_rgba(56,189,248,0.08)]"
                            : "border-white/6 bg-white/3 hover:border-white/12 hover:bg-white/5",
                        )}
                      >
                        <p className="text-sm font-medium text-white">{option.label}</p>
                        <p className="mt-1 text-sm text-slate-400">{option.description}</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2.5">
                    {[1, 2, 3, 4, 5].map((value) => {
                      const selected = currentAnswer === value;
                      return (
                        <button
                          key={value}
                          onClick={() => setAnswer(value)}
                          className={cn(
                            "flex h-16 items-center justify-center rounded-xl border text-lg font-semibold transition-all duration-150",
                            selected
                              ? "border-sky-400/25 bg-sky-400/8 text-white"
                              : "border-white/6 bg-white/3 text-slate-400 hover:border-white/12 hover:text-white",
                          )}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{question.minLabel}</span>
                    <span>{question.maxLabel}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between gap-3 pt-2">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={goBack} disabled={step === 0}>
                <ChevronLeft className="h-4 w-4" />
                {t(uiDictionary.quiz.back)}
              </Button>
              <Link href="/tracks" className={buttonVariants({ variant: "ghost", size: "sm" })}>
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

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="panel rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-300 mb-4">
              {t(uiDictionary.quiz.liveFit)}
            </p>

            {answeredCount === 0 ? (
              <p className="text-sm text-slate-500 leading-6">
                {t(uiDictionary.quiz.liveFitEmpty)}
              </p>
            ) : (
              <div className="space-y-3">
                {liveResult.rankedTracks.slice(0, 3).map((entry, index) => (
                  <div
                    key={entry.track.slug}
                    className="rounded-xl border border-white/6 bg-white/3 px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <p className="text-xs text-slate-500">
                        {index === 0
                          ? t(uiDictionary.quiz.currentBestFit)
                          : index === 1
                            ? t(uiDictionary.quiz.secondaryFit)
                            : t(uiDictionary.quiz.thirdFit)}
                      </p>
                      <span className="text-xs font-medium text-sky-300">
                        {formatPercent(entry.fitPercent)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-white">{entry.track.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-300 mb-3">
              {t(uiDictionary.quiz.measures)}
            </p>
            <div className="grid gap-2">
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
                  className="flex items-center gap-2 rounded-lg border border-white/6 bg-white/3 px-3 py-2 text-sm text-slate-400"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-slate-600" />
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
