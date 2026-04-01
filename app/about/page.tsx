import { SectionHeading } from "@/components/layout/section-heading";

export default function AboutPage() {
  return (
    <div className="container-shell py-10 lg:py-14">
      <div className="space-y-8">
        <section className="panel rounded-[36px] p-8 sm:p-10">
          <SectionHeading
            eyebrow="About CyberPath"
            title="CyberPath is a career-orientation platform for cybersecurity beginners."
            description="The product exists to help learners answer one hard question early: which direction in cybersecurity actually fits me? Instead of sending users into generic course catalogs, CyberPath uses assessment logic, matched tracks, and starter roadmaps to give them a clear first step."
          />
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Career orientation + learning",
              description:
                "CyberPath combines domain discovery with roadmap guidance so users move from curiosity to a realistic path, not just content consumption.",
            },
            {
              title: "Educational and safe by design",
              description:
                "The product avoids weaponized content, exploit instructions, or fake hacker branding. It stays focused on education, direction, and professional development.",
            },
            {
              title: "Structured for expansion",
              description:
                "The MVP is already modeled around tracks, quiz data, results, modules, and user progress so it can grow into a fuller platform later.",
            },
          ].map((item) => (
            <div key={item.title} className="panel rounded-[30px] p-6">
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
