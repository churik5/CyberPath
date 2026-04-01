"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { SectionHeading } from "@/components/layout/section-heading";
import { BookmarkButton } from "@/components/tracks/bookmark-button";
import { TrackIcon } from "@/components/tracks/track-icon";
import { buttonVariants } from "@/components/ui/button";
import { tracks } from "@/lib/data/cyberpath";
import { cn } from "@/lib/utils";

const categories = ["All", ...new Set(tracks.map((track) => track.category))];

export function TracksCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [beginnerMode, setBeginnerMode] = useState(false);
  const deferredSearch = useDeferredValue(search);

  const query = deferredSearch.trim().toLowerCase();

  const filteredTracks = tracks.filter((track) => {
    const matchesSearch =
      !query ||
      `${track.name} ${track.category} ${track.shortDescription} ${track.whoItFits}`
        .toLowerCase()
        .includes(query);
    const matchesCategory = category === "All" || track.category === category;
    const matchesBeginner =
      !beginnerMode ||
      track.difficulty.toLowerCase().includes("beginner") ||
      track.difficulty.toLowerCase().includes("friendly");

    return matchesSearch && matchesCategory && matchesBeginner;
  });

  return (
    <div className="container-shell py-10 lg:py-14">
      <div className="space-y-8">
        <section className="panel rounded-[36px] p-8 sm:p-10">
          <SectionHeading
            eyebrow="Cybersecurity tracks"
            title="Compare the cybersecurity paths CyberPath can match users into."
            description="Each card explains who the domain fits, what the work looks like, the skills it rewards, and where a beginner can start. Use search, category filters, and beginner mode to narrow the field."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <label className="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4">
              <span className="block text-xs uppercase tracking-[0.24em] text-slate-400">
                Search tracks
              </span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-slate-500"
                placeholder="AppSec, cloud, policy, awareness..."
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    category === item
                      ? "border-cyan-300/28 bg-cyan-300/10 text-white"
                      : "border-white/8 bg-white/[0.04] text-slate-300 hover:text-white",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setBeginnerMode((current) => !current)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                beginnerMode
                  ? "border-cyan-300/28 bg-cyan-300/10 text-white"
                  : "border-white/8 bg-white/[0.04] text-slate-300",
              )}
            >
              Beginner mode
            </button>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          {filteredTracks.map((track) => (
            <div key={track.slug} className="panel rounded-[30px] p-6 sm:p-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: `${track.accent}18`,
                      color: track.accent,
                    }}
                  >
                    <TrackIcon icon={track.icon} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {track.category}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      {track.name}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                      {track.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookmarkButton slug={track.slug} />
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/8 bg-white/[0.04] px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Who this fits
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {track.whoItFits}
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.04] px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Difficulty
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {track.difficulty}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Typical tasks
                  </p>
                  <div className="mt-3 grid gap-3">
                    {track.actualWork.slice(0, 2).map((task) => (
                      <div
                        key={task}
                        className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-300"
                      >
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Starter modules
                  </p>
                  <div className="mt-3 grid gap-3">
                    {track.modules.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3"
                      >
                        <p className="text-sm font-medium text-white">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {item.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/tracks/${track.slug}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  View track
                </Link>
                <Link href={`/dashboard?track=${track.slug}`} className={buttonVariants()}>
                  Start this path
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
