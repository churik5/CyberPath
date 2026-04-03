"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/layout/section-heading";
import { TrackIcon } from "@/components/tracks/track-icon";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { sampleMilestones, trackMap } from "@/lib/data/cyberpath";
import { uiDictionary } from "@/lib/i18n";
import { getFallbackResult, STORAGE_KEYS } from "@/lib/quiz-engine";
import { QuizResult, Track, TrackSlug } from "@/lib/types";

interface DashboardHomeProps {
  trackSlug?: string | null;
}

export function DashboardHome({ trackSlug }: DashboardHomeProps) {
  const { t } = useLocale();
  const { isAuthenticated, authAvailable } = useAuth();
  const [result, setResult] = useState<QuizResult>(() => getFallbackResult());
  const [savedTracks, setSavedTracks] = useState<Track[]>([]);

  useEffect(() => {
    const storedResult = window.localStorage.getItem(STORAGE_KEYS.quizResult);
    const storedSaved = window.localStorage.getItem(STORAGE_KEYS.savedTracks);

    const nextResult = storedResult ? (JSON.parse(storedResult) as QuizResult) : null;
    const nextSavedTracks = storedSaved
      ? (JSON.parse(storedSaved) as TrackSlug[])
          .map((slug) => trackMap[slug])
          .filter(Boolean)
      : null;

    queueMicrotask(() => {
      if (nextResult) setResult(nextResult);
      if (nextSavedTracks) setSavedTracks(nextSavedTracks);
    });
  }, []);

  const overrideSlug = trackSlug as TrackSlug | null;
  const selectedTrack =
    (overrideSlug ? trackMap[overrideSlug] : null) ?? result.primaryTrack.track;
  const roadmap = selectedTrack.modules;
  const completedLessons = 4;
  const totalLessons = roadmap.reduce((total, mod) => total + mod.lessons.length, 0);
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  if (!isAuthenticated) {
    return (
      <div className="container-shell py-12">
        <div className="panel rounded-2xl p-8 max-w-lg">
          <SectionHeading
            eyebrow={t(uiDictionary.nav.auth)}
            title={t(uiDictionary.dashboard.authGateTitle)}
            description={t(uiDictionary.dashboard.authGateDescription)}
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/auth?mode=sign-in" className={buttonVariants()}>
              {t(uiDictionary.auth.submitSignIn)}
            </Link>
            <Link
              href="/auth?mode=sign-up&postQuiz=1"
              className={buttonVariants({ variant: "outline" })}
            >
              {t(uiDictionary.auth.submitSignUp)}
            </Link>
          </div>
          {!authAvailable ? (
            <p className="mt-4 text-sm text-amber-300/80">
              {t(uiDictionary.auth.integrationMissing)}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="container-shell py-10 lg:py-14 space-y-6">

      {/* Top: track overview */}
      <div className="panel rounded-2xl p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <p className="text-sm font-medium text-sky-400">
              {t(uiDictionary.dashboard.badge)}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t(uiDictionary.dashboard.titlePrefix)}{" "}
              <span className="text-gradient">{selectedTrack.name}</span>.
            </h1>
            <p className="text-base text-slate-400">
              {t(uiDictionary.dashboard.subtitle)}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 xl:flex-col xl:items-end xl:justify-center">
            {[
              { label: t(uiDictionary.dashboard.chosenTrack), value: selectedTrack.name },
              { label: t(uiDictionary.dashboard.progress), value: `${progressPercent}%` },
              { label: t(uiDictionary.dashboard.quizzesCompleted), value: "1" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/6 bg-white/4 px-4 py-3 min-w-[120px]"
              >
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 rounded-xl border border-white/6 bg-white/3 p-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${selectedTrack.accent}15`,
              color: selectedTrack.accent,
            }}
          >
            <TrackIcon icon={selectedTrack.icon} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-2">
              <p className="text-base font-semibold text-white truncate">
                {selectedTrack.name}
              </p>
              <span className="text-sm text-slate-400 shrink-0">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} />
          </div>
        </div>
      </div>

      {/* Main: modules + sidebar */}
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">

        {/* Modules */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-400">
            {t(uiDictionary.dashboard.modules)}
          </p>
          {roadmap.map((module, moduleIndex) => (
            <div key={module.id} className="panel rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Module {moduleIndex + 1}</p>
                  <h2 className="text-lg font-semibold text-white">{module.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{module.summary}</p>
                </div>
                <span
                  className={`shrink-0 rounded-lg border px-3 py-1 text-xs font-medium ${
                    moduleIndex === 0
                      ? "border-sky-400/20 bg-sky-400/8 text-sky-300"
                      : moduleIndex === 1
                        ? "border-white/8 bg-white/4 text-slate-300"
                        : "border-white/6 bg-white/3 text-slate-500"
                  }`}
                >
                  {moduleIndex === 0 ? "Active" : moduleIndex === 1 ? "Next" : "Locked"}
                </span>
              </div>

              <div className="grid gap-2">
                {module.lessons.map((lesson, lessonIndex) => {
                  const complete = moduleIndex === 0 && lessonIndex < 2;
                  const inProgress = moduleIndex === 0 && lessonIndex === 2;

                  return (
                    <div
                      key={lesson.title}
                      className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-white/3 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{lesson.title}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{lesson.duration}</p>
                      </div>
                      <span
                        className={`text-xs shrink-0 ${
                          complete
                            ? "text-emerald-400"
                            : inProgress
                              ? "text-sky-400"
                              : "text-slate-600"
                        }`}
                      >
                        {complete ? "Done" : inProgress ? "In progress" : "Up next"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Milestones */}
          <div className="panel rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-300 mb-4">
              {t(uiDictionary.dashboard.milestones)}
            </p>
            <div className="grid gap-2">
              {sampleMilestones.map((milestone, index) => (
                <div
                  key={milestone}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/6 bg-white/3 px-3 py-3"
                >
                  <p className="text-sm text-white">{milestone}</p>
                  <span className={`text-xs shrink-0 ${index < 2 ? "text-emerald-400" : "text-slate-600"}`}>
                    {index < 2 ? "✓" : "–"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Saved tracks */}
          <div className="panel rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-300 mb-4">
              {t(uiDictionary.dashboard.savedTracks)}
            </p>
            <div className="grid gap-2">
              {(savedTracks.length
                ? savedTracks
                : result.rankedTracks.slice(1, 3).map((item) => item.track)
              ).map((track) => (
                <Link
                  key={track.slug}
                  href={`/tracks/${track.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-3 py-3 transition-colors hover:border-white/12"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${track.accent}15`,
                      color: track.accent,
                    }}
                  >
                    <TrackIcon icon={track.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{track.name}</p>
                    <p className="text-xs text-slate-500">{track.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Next action */}
          <div className="panel rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-300 mb-2">
              {t(uiDictionary.dashboard.nextAction)}
            </p>
            <p className="text-sm text-slate-400 leading-6 mb-4">
              {t(uiDictionary.dashboard.nextActionDescription)}
            </p>
            <div className="grid gap-2">
              <Link href="/results" className={buttonVariants({ variant: "outline", size: "sm" })}>
                {t(uiDictionary.dashboard.reviewResults)}
              </Link>
              <Link href="/tracks" className={buttonVariants({ size: "sm" })}>
                {t(uiDictionary.dashboard.compareTracks)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
