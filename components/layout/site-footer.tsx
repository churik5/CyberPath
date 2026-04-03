"use client";

import Link from "next/link";

import { useLocale } from "@/components/providers/locale-provider";
import { uiDictionary } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-white/6 mt-16">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-400/10 border border-sky-400/20 text-xs font-bold text-sky-300">
              CP
            </span>
            <span className="text-sm font-semibold text-white">CyberPath</span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-500">
            {t(uiDictionary.footer.description)}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t(uiDictionary.footer.product)}
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <Link href="/quiz" className="block hover:text-slate-300 transition-colors">
                {t(uiDictionary.nav.quiz)}
              </Link>
              <Link href="/tracks" className="block hover:text-slate-300 transition-colors">
                {t(uiDictionary.nav.tracks)}
              </Link>
              <Link href="/dashboard" className="block hover:text-slate-300 transition-colors">
                {t(uiDictionary.nav.dashboard)}
              </Link>
            </div>
          </div>
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t(uiDictionary.footer.company)}
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <Link href="/about" className="block hover:text-slate-300 transition-colors">
                {t(uiDictionary.nav.about)}
              </Link>
              <span className="block">{t(uiDictionary.footer.privacy)}</span>
              <span className="block">{t(uiDictionary.footer.terms)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container-shell border-t border-white/5 py-5">
        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} CyberPath
        </p>
      </div>
    </footer>
  );
}
