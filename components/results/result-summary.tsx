"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { TrackIcon } from "@/components/tracks/track-icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { uiDictionary } from "@/lib/i18n";
import { getLocalizedResultSignals } from "@/lib/localized-content";
import { getFallbackResult, STORAGE_KEYS } from "@/lib/quiz-engine";
import { QuizResult } from "@/lib/types";
import { cn, formatPercent } from "@/lib/utils";

const signalKeys = [
  "builder",
  "defender",
  "investigator",
  "analyst",
  "strategist",
  "people",
] as const;

function SignalRadar({
  result,
  labels,
  title,
}: {
  result: QuizResult;
  labels: Record<(typeof signalKeys)[number], string>;
  title: string;
}) {
  const size = 280;
  const center = size / 2;
  const radius = 96;
  const maxScore = Math.max(...Object.values(result.signalScores), 1);

  const points = signalKeys.map((signal, index) => {
    const angle = (Math.PI * 2 * index) / signalKeys.length - Math.PI / 2;
    const ratio = result.signalScores[signal] / maxScore;
    const pointRadius = radius * ratio;
    return {
      label: signal,
      x: center + Math.cos(angle) * pointRadius,
      y: center + Math.sin(angle) * pointRadius,
      labelX: center + Math.cos(angle) * (radius + 26),
      labelY: center + Math.sin(angle) * (radius + 26),
    };
  });

  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="panel rounded-2xl p-5">
      <p className="text-sm font-medium text-slate-300 mb-4">{title}</p>
      <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-auto w-full max-w-[300px]">
        {[0.33, 0.66, 1].map((ratio) => {
          const ring = signalKeys
            .map((_, index) => {
              const angle = (Math.PI * 2 * index) / signalKeys.length - Math.PI / 2;
              const ringRadius = radius * ratio;
              return `${center + Math.cos(angle) * ringRadius},${center + Math.sin(angle) * ringRadius}`;
            })
            .join(" ");
          return (
            <polygon key={ratio} points={ring} fill="none" stroke="rgba(255,255,255,0.08)" />
          );
        })}

        {signalKeys.map((_, index) => {
          const angle = (Math.PI * 2 * index) / signalKeys.length - Math.PI / 2;
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={center + Math.cos(angle) * radius}
              y2={center + Math.sin(angle) * radius}
              stroke="rgba(255,255,255,0.07)"
            />
          );
        })}

        <polygon
          points={polygon}
          fill="rgba(56,189,248,0.14)"
          stroke="rgba(56,189,248,0.8)"
          strokeWidth={1.5}
        />

        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r={3.5} fill="#38bdf8" />
            <text x={point.labelX} y={point.labelY} fill="#94a3b8" fontSize="11" textAnchor="middle">
              {labels[point.label]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ResultSummary() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const { isAuthenticated } = useAuth();
  const [result, setResult] = useState<QuizResult>(() => getFallbackResult());

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEYS.quizResult);
    if (stored) {
      queueMicrotask(() => setResult(JSON.parse(stored) as QuizResult));
    }
  }, []);

  const retakeQuiz = () => {
    window.localStorage.removeItem(STORAGE_KEYS.quizProgress);
    window.localStorage.removeItem(STORAGE_KEYS.quizResult);
    startTransition(() => router.push("/quiz?reset=1"));
  };

  const topTracks = [result.primaryTrack, result.secondaryTrack, result.tertiaryTrack];
  const localizedSignals = getLocalizedResultSignals(result.signalScores, locale);

  return (
    <div className="container-shell py-10 lg:py-14 space-y-6">

      {/* Top match hero */}
      <div className="panel rounded-2xl p-6 sm:p-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_360px] xl:items-start">
          <div className="space-y-5">
            <p className="text-sm font-medium text-sky-400">{t(uiDictionary.results.badge)}</p>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {t(uiDictionary.results.topMatch)}{" "}
                <span className="text-gradient">{result.primaryTrack.track.name}</span>.
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-400 max-w-xl">
                {locale === "ru"
                  ? `CyberPath сопоставил тебя с этим направлением — у тебя сильное пересечение с ${result.secondaryTrack.track.name} и ${result.tertiaryTrack.track.name}.`
                  : `CyberPath matched you here with strong overlap into ${result.secondaryTrack.track.name} and ${result.tertiaryTrack.track.name}.`}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {topTracks.map((entry, index) => (
                <div
                  key={entry.track.slug}
                  className={cn(
                    "rounded-xl border px-4 py-3",
                    index === 0
                      ? "border-sky-400/20 bg-sky-400/8"
                      : "border-white/6 bg-white/3",
                  )}
                >
                  <p className="text-xs text-slate-500 mb-1">
                    {index === 0
                      ? t(uiDictionary.results.primary)
                      : index === 1
                        ? t(uiDictionary.results.secondary)
                        : t(uiDictionary.results.tertiary)}
                  </p>
                  <p className={cn("text-sm font-semibold", index === 0 ? "text-sky-100" : "text-white")}>
                    {entry.track.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {formatPercent(entry.fitPercent)} {t(uiDictionary.results.fit)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {isAuthenticated ? (
                <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
                  {t(uiDictionary.results.startPath)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <Link href="/auth?mode=sign-up&postQuiz=1" className={buttonVariants({ size: "lg" })}>
                    {t(uiDictionary.results.createAccount)}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/auth?mode=sign-in&postQuiz=1"
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                  >
                    {t(uiDictionary.results.signIn)}
                  </Link>
                </>
              )}
              <Button variant="outline" size="lg" onClick={retakeQuiz}>
                <RotateCcw className="h-4 w-4" />
                {t(uiDictionary.results.retake)}
              </Button>
            </div>
          </div>

          {/* Score bars */}
          <div className="panel rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-300 mb-5">
              {t(uiDictionary.results.scoreDistribution)}
            </p>
            <div className="space-y-3.5">
              {result.rankedTracks.map((entry) => (
                <div key={entry.track.slug} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2.5 text-slate-300 min-w-0">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${entry.track.accent}15`,
                          color: entry.track.accent,
                        }}
                      >
                        <TrackIcon icon={entry.track.icon} className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate text-xs">{entry.track.name}</span>
                    </div>
                    <span className="text-xs text-sky-300 shrink-0">
                      {formatPercent(entry.fitPercent)}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-white/6">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${entry.fitPercent}%`,
                        background: `linear-gradient(90deg, ${entry.track.accent}, rgba(255,255,255,0.3))`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auth gate */}
      {!isAuthenticated ? (
        <div className="panel rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">{t(uiDictionary.results.authGateTitle)}</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-lg">{t(uiDictionary.results.authGateDescription)}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/auth?mode=sign-up&postQuiz=1" className={buttonVariants()}>
              {t(uiDictionary.results.createAccount)}
            </Link>
            <Link href="/auth?mode=sign-in&postQuiz=1" className={buttonVariants({ variant: "outline" })}>
              {t(uiDictionary.results.signIn)}
            </Link>
          </div>
        </div>
      ) : null}

      {/* Radar + signals */}
      <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
        <SignalRadar
          result={result}
          labels={localizedSignals.labels}
          title={locale === "ru" ? "Радар стиля работы" : "Working-style radar"}
        />

        <div className="space-y-4">
          <div className="panel rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-300 mb-4">
              {t(uiDictionary.results.whyMatched)}
            </p>
            <div className="grid gap-2">
              {localizedSignals.reasons.map((reason) => (
                <div
                  key={reason}
                  className="rounded-xl border border-white/6 bg-white/3 px-4 py-3 text-sm leading-6 text-slate-300"
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>

          <div className="panel rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-300 mb-3">
              {t(uiDictionary.results.strengths)}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {localizedSignals.strengths.map((strength) => (
                <span
                  key={strength}
                  className="rounded-lg border border-sky-400/15 bg-sky-400/6 px-3 py-1.5 text-xs text-sky-300"
                >
                  {strength}
                </span>
              ))}
            </div>

            <p className="text-sm font-medium text-slate-300 mb-3">
              {t(uiDictionary.results.tasks)}
            </p>
            <div className="grid gap-2">
              {result.tasksYouMayEnjoy.map((task) => (
                <div
                  key={task}
                  className="rounded-xl border border-white/6 bg-white/3 px-4 py-3 text-sm leading-6 text-slate-300"
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 tracks detail */}
      <div>
        <p className="text-sm font-medium text-sky-400 mb-5">
          {t(uiDictionary.results.topTracks)}
        </p>
        <div className="grid gap-4 lg:grid-cols-3">
          {topTracks.map((entry, index) => (
            <div key={entry.track.slug} className="panel rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${entry.track.accent}15`,
                    color: entry.track.accent,
                  }}
                >
                  <TrackIcon icon={entry.track.icon} />
                </span>
                <span className="text-xs text-slate-500">
                  {index === 0
                    ? locale === "ru" ? "Лучший матч" : "Best fit"
                    : index === 1
                      ? locale === "ru" ? "Смежный путь" : "Adjacent path"
                      : locale === "ru" ? "Вариант" : "Wildcard"}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">{entry.track.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{entry.track.shortDescription}</p>
              <div className="mt-4 grid gap-2">
                {entry.track.actualWork.slice(0, 2).map((workItem) => (
                  <div
                    key={workItem}
                    className="rounded-lg border border-white/6 bg-white/3 px-3 py-2.5 text-xs text-slate-400 leading-5"
                  >
                    {workItem}
                  </div>
                ))}
              </div>
              <Link
                href={`/tracks/${entry.track.slug}`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 w-full")}
              >
                {locale === "ru" ? "Открыть трек" : "Open track"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
