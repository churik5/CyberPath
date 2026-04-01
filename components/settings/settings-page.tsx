"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { uiDictionary, localeLabels, locales } from "@/lib/i18n";

export function SettingsPage() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="container-shell py-10 lg:py-14">
      <div className="space-y-8">
        <section className="panel rounded-[36px] p-8 sm:p-10">
          <Badge>{t(uiDictionary.common.openSettings)}</Badge>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {t(uiDictionary.settings.title)}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {t(uiDictionary.settings.subtitle)}
          </p>
        </section>

        <section className="panel rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
            {t(uiDictionary.settings.languageTitle)}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            {t(uiDictionary.settings.languageDescription)}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {locales.map((item) => (
              <button
                key={item}
                onClick={() => setLocale(item)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  locale === item
                    ? "border-cyan-300/28 bg-cyan-300/10 text-white"
                    : "border-white/10 bg-white/[0.04] text-slate-300"
                }`}
              >
                {localeLabels[item]}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
