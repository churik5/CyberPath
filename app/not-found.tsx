import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-shell py-20">
      <div className="panel rounded-[36px] p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
          Not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          This CyberPath page does not exist.
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-300">
          The track or route you requested could not be found.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className={buttonVariants()}>
            Return home
          </Link>
          <Link href="/tracks" className={buttonVariants({ variant: "outline" })}>
            Browse tracks
          </Link>
        </div>
      </div>
    </div>
  );
}
