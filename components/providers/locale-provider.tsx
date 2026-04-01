"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  defaultLocale,
  localeStorageKey,
  locales,
  pickLocalized,
  type Locale,
  type LocalizedValue,
} from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  isReady: boolean;
  setLocale: (locale: Locale) => void;
  t: <T>(value: LocalizedValue<T>) => T;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(localeStorageKey) as Locale | null;
    const nextLocale = stored && locales.includes(stored) ? stored : defaultLocale;

    queueMicrotask(() => {
      setLocaleState(nextLocale);
      setIsReady(true);
      document.documentElement.lang = nextLocale;
    });
  }, []);

  const setLocale = (nextLocale: Locale) => {
    window.localStorage.setItem(localeStorageKey, nextLocale);
    document.documentElement.lang = nextLocale;
    startTransition(() => {
      setLocaleState(nextLocale);
    });
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        isReady,
        setLocale,
        t: (value) => pickLocalized(locale, value),
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}
