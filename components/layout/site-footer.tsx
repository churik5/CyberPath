"use client";

import Link from "next/link";

import { useLocale } from "@/components/providers/locale-provider";
import { uiDictionary } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-white/8 bg-black/20">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
            CyberPath
          </p>
          <p className="max-w-xl text-sm leading-6 text-slate-400">
            {t(uiDictionary.footer.description)}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-medium text-white">
              {t(uiDictionary.footer.product)}
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <Link href="/quiz" className="block hover:text-white">
                {t(uiDictionary.nav.quiz)}
              </Link>
              <Link href="/tracks" className="block hover:text-white">
                {t(uiDictionary.nav.tracks)}
              </Link>
              <Link href="/dashboard" className="block hover:text-white">
                {t(uiDictionary.nav.dashboard)}
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-white">
              {t(uiDictionary.footer.company)}
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <Link href="/about" className="block hover:text-white">
                {t(uiDictionary.nav.about)}
              </Link>
              <span className="block">{t(uiDictionary.footer.privacy)}</span>
              <span className="block">{t(uiDictionary.footer.terms)}</span>
              <span className="block">{t(uiDictionary.footer.contact)}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
