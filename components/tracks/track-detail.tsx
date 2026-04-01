import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";
import { BookmarkButton } from "@/components/tracks/bookmark-button";
import { TrackIcon } from "@/components/tracks/track-icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { tracks } from "@/lib/data/cyberpath";
import { Track } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TrackDetailProps {
  track: Track;
}

export function TrackDetail({ track }: TrackDetailProps) {
  const relatedTracks = tracks.filter((item) =>
    track.relatedTrackSlugs.includes(item.slug),
  );

  return (
    <div className="container-shell py-10 lg:py-14">
      <div className="space-y-8">
        <section className="panel rounded-[36px] p-8 sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[1.06fr_0.94fr]">
            <div className="space-y-6">
              <Badge>{track.category}</Badge>
              <div className="space-y-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-[24px]"
                  style={{
                    backgroundColor: `${track.accent}18`,
                    color: track.accent,
                  }}
                >
                  <TrackIcon icon={track.icon} className="h-7 w-7" />
                </div>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {track.name}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {track.roleSummary}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`/dashboard?track=${track.slug}`} className={buttonVariants()}>
                  Start this path
                </Link>
                <BookmarkButton slug={track.slug} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] border border-white/8 bg-white/[0.04] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Difficulty
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  {track.difficulty}
                </p>
              </div>
              <div className="rounded-[26px] border border-white/8 bg-white/[0.04] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Market note
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {track.salaryNote}
                </p>
              </div>
              <div className="rounded-[26px] border border-white/8 bg-white/[0.04] px-5 py-5 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Who this fits
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {track.whoItFits}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <div className="panel rounded-[32px] p-6">
              <SectionHeading
                eyebrow="What you would actually do"
                title="Day-to-day work in this path."
                description="CyberPath keeps the role grounded in realistic activities so users can imagine the work, not just the title."
              />
              <div className="mt-6 grid gap-3">
                {track.actualWork.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel rounded-[32px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                Skills you need
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {track.recommendedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="panel rounded-[32px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                Tools and technologies
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {track.tools.map((tool) => (
                  <div
                    key={tool}
                    className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-slate-300"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="panel rounded-[32px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                Beginner roadmap
              </p>
              <div className="mt-5 grid gap-4">
                {track.roadmap.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[24px] border border-white/8 bg-white/[0.04] px-5 py-5"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Step {index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel rounded-[32px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                Mini practice ideas
              </p>
              <div className="mt-5 grid gap-3">
                {track.practiceIdeas.map((idea) => (
                  <div
                    key={idea}
                    className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-slate-300"
                  >
                    {idea}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Starter modules"
            title="A clean beginner roadmap for this domain."
            description="Each module gives users a concrete place to begin, the vocabulary to build confidence, and the career context to understand why the topic matters."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {track.modules.map((module) => (
              <div key={module.id} className="panel rounded-[30px] p-6">
                <h3 className="text-2xl font-semibold text-white">{module.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {module.summary}
                </p>
                <div className="mt-6 grid gap-3">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.title}
                      className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3"
                    >
                      <p className="text-sm font-medium text-white">
                        {lesson.title}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                        {lesson.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Related paths"
            title="Adjacent domains worth comparing."
            description="Many learners fit more than one direction. CyberPath surfaces the nearby paths that share skills, working style, or longer-term career movement."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {relatedTracks.map((item) => (
              <Link
                key={item.slug}
                href={`/tracks/${item.slug}`}
                className="panel block rounded-[28px] p-6 transition-transform duration-200 hover:-translate-y-1"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: `${item.accent}18`,
                    color: item.accent,
                  }}
                >
                  <TrackIcon icon={item.icon} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.shortDescription}
                </p>
                <span
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "mt-5 px-0",
                  )}
                >
                  View track
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
