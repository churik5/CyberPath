"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/layout/section-heading";
import { TrackIcon } from "@/components/tracks/track-icon";
import { Badge } from "@/components/ui/badge";
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
  const size = 320;
  const center = size / 2;
  const radius = 108;
  const maxScore = Math.max(...Object.values(result.signalScores), 1);

  const points = signalKeys.map((signal, index) => {
    const angle = (Math.PI * 2 * index) / signalKeys.length - Math.PI / 2;
    const ratio = result.signalScores[signal] / maxScore;
    const pointRadius = radius * ratio;
    return {
      label: signal,
      x: center + Math.cos(angle) * pointRadius,
      y: center + Math.sin(angle) * pointRadius,
      labelX: center + Math.cos(angle) * (radius + 28),
      labelY: center + Math.sin(angle) * (radius + 28),
    };
  });

  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="panel rounded-[32px] p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
        {title}
      </p>
      <div className="mt-6 overflow-hidden">
        <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-auto w-full max-w-[360px]">
          {[0.33, 0.66, 1].map((ratio) => {
            const ring = signalKeys
              .map((_, index) => {
                const angle = (Math.PI * 2 * index) / signalKeys.length - Math.PI / 2;
                const ringRadius = radius * ratio;
                const x = center + Math.cos(angle) * ringRadius;
                const y = center + Math.sin(angle) * ringRadius;
                return `${x},${y}`;
              })
              .join(" ");

            return (
              <polygon
                key={ratio}
                points={ring}
                fill="none"
                stroke="rgba(148, 163, 184, 0.18)"
              />
            );
          })}

          {signalKeys.map((_, index) => {
            const angle = (Math.PI * 2 * index) / signalKeys.length - Math.PI / 2;
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;

            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(148, 163, 184, 0.14)"
              />
            );
          })}

          <polygon
            points={polygon}
            fill="rgba(82, 229, 255, 0.18)"
            stroke="rgba(82, 229, 255, 0.9)"
            strokeWidth={2}
          />

          {points.map((point) => (
            <g key={point.label}>
              <circle cx={point.x} cy={point.y} r={4} fill="#52E5FF" />
              <text
                x={point.labelX}
                y={point.labelY}
                fill="#CBD5E1"
                fontSize="12"
                textAnchor="middle"
              >
                {labels[point.label]}
              </text>
            </g>
          ))}
        </svg>
      </div>
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
      queueMicrotask(() => {
        setResult(JSON.parse(stored) as QuizResult);
      });
    }
  }, []);

  const retakeQuiz = () => {
    window.localStorage.removeItem(STORAGE_KEYS.quizProgress);
    window.localStorage.removeItem(STORAGE_KEYS.quizResult);

    startTransition(() => {
      router.push("/quiz?reset=1");
    });
  };

  const topTracks = [
    result.primaryTrack,
    result.secondaryTrack,
    result.tertiaryTrack,
  ];
  const localizedSignals = getLocalizedResultSignals(result.signalScores, locale);

  return (
    <div className="container-shell py-10 lg:py-14">
      <div className="space-y-8">
        <section className="panel rounded-[36px] p-8 sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
            <div className="space-y-6">
              <Badge>{t(uiDictionary.results.badge)}</Badge>
              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {t(uiDictionary.results.topMatch)}{" "}
                  <span className="text-gradient">
                    {result.primaryTrack.track.name}
                  </span>
                  .
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {locale === "ru"
                    ? `CyberPath сопоставил тебя с этим направлением, потому что в ответах повторялись сигналы, связанные с: ${localizedSignals.reasons[0]?.replace(/^[^:]+:\s*/, "").replace(/\.$/, "")}. Дополнительно у тебя заметное пересечение с ${result.secondaryTrack.track.name} и ${result.tertiaryTrack.track.name}.`
                    : `CyberPath matched you to this path because your answers leaned toward ${localizedSignals.reasons[0]?.replace(/^[^:]+:\s*/, "").replace(/\.$/, "")}, with strong overlap into ${result.secondaryTrack.track.name} and ${result.tertiaryTrack.track.name}.`}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {topTracks.map((entry, index) => (
                  <div
                    key={entry.track.slug}
                    className="rounded-[24px] border border-white/8 bg-white/[0.04] px-5 py-5"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {index === 0
                        ? t(uiDictionary.results.primary)
                        : index === 1
                          ? t(uiDictionary.results.secondary)
                          : t(uiDictionary.results.tertiary)}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      {entry.track.name}
                    </p>
                    <p className="mt-2 text-sm text-cyan-100">
                      {formatPercent(entry.fitPercent)} {t(uiDictionary.results.fit)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ size: "lg" })}
                  >
                    {t(uiDictionary.results.startPath)}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth?mode=sign-up&postQuiz=1"
                      className={buttonVariants({ size: "lg" })}
                    >
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

            <div className="panel rounded-[32px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                {t(uiDictionary.results.scoreDistribution)}
              </p>
              <div className="mt-6 space-y-4">
                {result.rankedTracks.map((entry) => (
                  <div key={entry.track.slug} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <div className="flex items-center gap-3 text-slate-200">
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: `${entry.track.accent}18`,
                            color: entry.track.accent,
                          }}
                        >
                          <TrackIcon icon={entry.track.icon} className="h-4 w-4" />
                        </span>
                        <span>{entry.track.name}</span>
                      </div>
                      <span className="text-cyan-100">
                        {formatPercent(entry.fitPercent)}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${entry.fitPercent}%`,
                          background: `linear-gradient(90deg, ${entry.track.accent}, rgba(255,255,255,0.45))`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {!isAuthenticated ? (
          <section className="panel rounded-[32px] p-8">
            <SectionHeading
              eyebrow={t(uiDictionary.nav.auth)}
              title={t(uiDictionary.results.authGateTitle)}
              description={t(uiDictionary.results.authGateDescription)}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth?mode=sign-up&postQuiz=1"
                className={buttonVariants({ size: "lg" })}
              >
                {t(uiDictionary.results.createAccount)}
              </Link>
              <Link
                href="/auth?mode=sign-in&postQuiz=1"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {t(uiDictionary.results.signIn)}
              </Link>
            </div>
          </section>
        ) : null}

        <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <SignalRadar
            result={result}
            labels={localizedSignals.labels}
            title={locale === "ru" ? "Радар рабочего стиля" : "Working-style radar"}
          />

          <div className="space-y-6">
            <div className="panel rounded-[32px] p-6">
              <SectionHeading
                eyebrow={t(uiDictionary.results.whyMatched)}
                title={t(uiDictionary.results.whyMatchedTitle)}
                description={t(uiDictionary.results.whyMatchedDescription)}
              />
              <div className="mt-6 grid gap-3">
                {localizedSignals.reasons.map((reason) => (
                  <div
                    key={reason}
                    className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-slate-300"
                  >
                    {reason}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel rounded-[32px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                {t(uiDictionary.results.strengths)}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {localizedSignals.strengths.map((strength) => (
                  <span
                    key={strength}
                    className="rounded-full border border-cyan-300/18 bg-cyan-300/8 px-4 py-2 text-sm text-cyan-100"
                  >
                    {strength}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                  {t(uiDictionary.results.tasks)}
                </p>
                <div className="mt-4 grid gap-3">
                  {result.tasksYouMayEnjoy.map((task) => (
                    <div
                      key={task}
                      className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-slate-300"
                    >
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow={t(uiDictionary.results.topTracks)}
            title={t(uiDictionary.results.topTracksTitle)}
            description={t(uiDictionary.results.topTracksDescription)}
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {topTracks.map((entry, index) => (
              <div key={entry.track.slug} className="panel rounded-[30px] p-6">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: `${entry.track.accent}18`,
                      color: entry.track.accent,
                    }}
                  >
                    <TrackIcon icon={entry.track.icon} />
                  </span>
                  <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    {index === 0
                      ? locale === "ru"
                        ? "Лучший матч"
                        : "Best fit"
                      : index === 1
                        ? locale === "ru"
                          ? "Соседний путь"
                          : "Adjacent path"
                        : locale === "ru"
                          ? "Дополнительный вариант"
                          : "Wildcard"}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {entry.track.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {entry.track.shortDescription}
                </p>
                <div className="mt-6 space-y-3">
                  {entry.track.actualWork.slice(0, 2).map((workItem) => (
                    <div
                      key={workItem}
                      className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-300"
                    >
                      {workItem}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/tracks/${entry.track.slug}`}
                  className={cn(buttonVariants({ variant: "outline" }), "mt-6 w-full")}
                >
                  {locale === "ru" ? "Открыть трек" : "Open track detail"}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
