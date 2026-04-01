"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/layout/section-heading";
import { TrackIcon } from "@/components/tracks/track-icon";
import { Badge } from "@/components/ui/badge";
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

    const nextResult = storedResult
      ? (JSON.parse(storedResult) as QuizResult)
      : null;
    const nextSavedTracks = storedSaved
      ? (JSON.parse(storedSaved) as TrackSlug[])
          .map((slug) => trackMap[slug])
          .filter(Boolean)
      : null;

    queueMicrotask(() => {
      if (nextResult) {
        setResult(nextResult);
      }

      if (nextSavedTracks) {
        setSavedTracks(nextSavedTracks);
      }
    });
  }, []);

  const overrideSlug = trackSlug as TrackSlug | null;
  const selectedTrack =
    (overrideSlug ? trackMap[overrideSlug] : null) ?? result.primaryTrack.track;
  const roadmap = selectedTrack.modules;
  const completedLessons = 4;
  const totalLessons = roadmap.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  if (!isAuthenticated) {
    return (
      <div className="container-shell py-10 lg:py-14">
        <div className="panel rounded-[36px] p-8 sm:p-10">
          <SectionHeading
            eyebrow={t(uiDictionary.nav.auth)}
            title={t(uiDictionary.dashboard.authGateTitle)}
            description={t(uiDictionary.dashboard.authGateDescription)}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            <p className="mt-5 text-sm leading-7 text-amber-100/90">
              {t(uiDictionary.auth.integrationMissing)}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="container-shell py-10 lg:py-14">
      <div className="space-y-8">
        <section className="panel rounded-[36px] p-8 sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
            <div className="space-y-6">
              <Badge>{t(uiDictionary.dashboard.badge)}</Badge>
              <div>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {t(uiDictionary.dashboard.titlePrefix)}{" "}
                  <span className="text-gradient">{selectedTrack.name}</span>.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {t(uiDictionary.dashboard.subtitle)}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: t(uiDictionary.dashboard.chosenTrack), value: selectedTrack.name },
                  { label: t(uiDictionary.dashboard.progress), value: `${progressPercent}%` },
                  { label: t(uiDictionary.dashboard.quizzesCompleted), value: "1" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-white/8 bg-white/[0.04] px-5 py-4"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel rounded-[32px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                {t(uiDictionary.dashboard.pathOverview)}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: `${selectedTrack.accent}18`,
                    color: selectedTrack.accent,
                  }}
                >
                  <TrackIcon icon={selectedTrack.icon} />
                </span>
                <div>
                  <p className="text-xl font-semibold text-white">
                    {selectedTrack.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {selectedTrack.difficulty}
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>{t(uiDictionary.dashboard.roadmapCompletion)}</span>
                  <span>{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} />
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-300">
                {selectedTrack.shortDescription}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={t(uiDictionary.dashboard.modules)}
              title={t(uiDictionary.dashboard.modulesTitle)}
              description={t(uiDictionary.dashboard.modulesDescription)}
            />

            <div className="grid gap-5">
              {roadmap.map((module, moduleIndex) => (
                <div key={module.id} className="panel rounded-[30px] p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        {`Module ${moduleIndex + 1}`}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        {module.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {module.summary}
                      </p>
                    </div>
                    <div className="rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                      {moduleIndex === 0
                        ? "Active now"
                        : moduleIndex === 1
                          ? "Queued next"
                          : "Locked"}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const complete = moduleIndex === 0 && lessonIndex < 2;
                      const inProgress = moduleIndex === 0 && lessonIndex === 2;

                      return (
                        <div
                          key={lesson.title}
                          className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-medium text-white">
                                {lesson.title}
                              </p>
                              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                                {lesson.duration}
                              </p>
                            </div>
                            <div className="text-sm text-slate-300">
                              {complete
                                ? "Completed"
                                : inProgress
                                  ? "In progress"
                                  : "Up next"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="panel rounded-[32px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                {t(uiDictionary.dashboard.milestones)}
              </p>
              <div className="mt-5 grid gap-3">
                {sampleMilestones.map((milestone, index) => (
                  <div
                    key={milestone}
                    className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4"
                  >
                    <p className="text-sm font-medium text-white">{milestone}</p>
                    <p className="mt-2 text-sm text-slate-400">
                      {index < 2 ? "Unlocked" : "On deck"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel rounded-[32px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                {t(uiDictionary.dashboard.savedTracks)}
              </p>
              <div className="mt-5 grid gap-3">
                {(savedTracks.length ? savedTracks : result.rankedTracks.slice(1, 3).map((item) => item.track)).map((track) => (
                  <Link
                    key={track.slug}
                    href={`/tracks/${track.slug}`}
                    className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 transition-colors hover:border-white/14"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${track.accent}18`,
                          color: track.accent,
                        }}
                      >
                        <TrackIcon icon={track.icon} className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{track.name}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {track.category}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="panel rounded-[32px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                {t(uiDictionary.dashboard.nextAction)}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {t(uiDictionary.dashboard.nextActionDescription)}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/results" className={buttonVariants({ variant: "outline" })}>
                  {t(uiDictionary.dashboard.reviewResults)}
                </Link>
                <Link href="/tracks" className={buttonVariants()}>
                  {t(uiDictionary.dashboard.compareTracks)}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
