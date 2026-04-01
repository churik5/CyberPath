import { quizQuestions, tracks } from "@/lib/data/cyberpath";

const collections = [
  {
    name: "quiz_questions",
    count: `${quizQuestions.length}`,
    description: "Assessment prompts, scale config, helper copy, and display order.",
  },
  {
    name: "tracks",
    count: `${tracks.length}`,
    description:
      "Track metadata, career copy, skills, tools, related domains, and starter modules.",
  },
  {
    name: "modules",
    count: `${tracks.reduce((total, track) => total + track.modules.length, 0)}`,
    description: "Roadmap units that power the personalized dashboard experience.",
  },
  {
    name: "resources",
    count: "Starter seeded",
    description:
      "Editable beginner resources, featured recommendations, and future curation slots.",
  },
];

const tables = [
  "profiles",
  "tracks",
  "quiz_questions",
  "quiz_options",
  "quiz_attempts",
  "quiz_answers",
  "user_track_results",
  "modules",
  "lessons",
  "user_progress",
  "saved_tracks",
];

export function AdminOverview() {
  return (
    <div className="container-shell py-10 lg:py-14">
      <div className="space-y-8">
        <section className="panel rounded-[36px] p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
            Admin-ready structure
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            A clean content model ready for future editing workflows.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            The MVP keeps data local for speed, but the structure is already
            aligned with a future Supabase-backed admin surface. Quiz logic,
            weighted answers, track descriptions, and learning modules can move
            into editable content collections without changing the product model.
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection) => (
            <div key={collection.name} className="panel rounded-[28px] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                {collection.name}
              </p>
              <p className="mt-4 text-3xl font-semibold text-white">
                {collection.count}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {collection.description}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="panel rounded-[32px] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
              Editable collections later
            </p>
            <div className="mt-5 grid gap-3">
              {[
                "Quiz questions and answer weights",
                "Track descriptions and fit narratives",
                "Learning modules, lessons, and starter resources",
                "Featured tracks and homepage content blocks",
              ].map((item) => (
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
              Supabase-ready tables
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {tables.map((table) => (
                <div
                  key={table}
                  className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 font-mono text-sm text-slate-300"
                >
                  {table}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
