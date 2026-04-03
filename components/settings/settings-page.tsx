"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { uiDictionary, localeLabels, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SettingsPage() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="container-shell py-10 lg:py-14">
      <div className="max-w-xl space-y-6">
        <div>
          <p className="text-sm font-medium text-sky-400 mb-2">
            {t(uiDictionary.common.openSettings)}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {t(uiDictionary.settings.title)}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {t(uiDictionary.settings.subtitle)}
          </p>
        </div>

        <div className="panel rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-1">
            {t(uiDictionary.settings.languageTitle)}
          </h2>
          <p className="text-sm text-slate-400 mb-5">
            {t(uiDictionary.settings.languageDescription)}
          </p>
          <div className="flex flex-wrap gap-2">
            {locales.map((item) => (
              <button
                key={item}
                onClick={() => setLocale(item)}
                className={cn(
                  "rounded-xl border px-5 py-2.5 text-sm font-medium transition-all",
                  locale === item
                    ? "border-sky-400/25 bg-sky-400/10 text-white"
                    : "border-white/8 bg-white/4 text-slate-400 hover:border-white/14 hover:text-slate-200",
                )}
              >
                {localeLabels[item]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
