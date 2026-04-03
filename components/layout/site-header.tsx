"use client";

import Link from "next/link";
import { Settings } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { buttonVariants } from "@/components/ui/button";
import { locales, localeLabels, uiDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { t, locale, setLocale } = useLocale();
  const { isAuthenticated, signOut } = useAuth();

  const navItems = [
    { href: "/quiz", label: t(uiDictionary.nav.quiz) },
    { href: "/tracks", label: t(uiDictionary.nav.tracks) },
    { href: "/about", label: t(uiDictionary.nav.about) },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[rgba(6,8,24,0.80)] backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/10 border border-sky-400/20 text-xs font-bold text-sky-300">
            CP
          </span>
          <span className="text-sm font-semibold text-white tracking-tight">
            CyberPath
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {/* Language switcher */}
          <div className="hidden sm:flex items-center rounded-lg border border-white/8 bg-white/4 p-0.5">
            {locales.map((item) => (
              <button
                key={item}
                onClick={() => setLocale(item)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                  locale === item
                    ? "bg-white/10 text-white"
                    : "text-slate-500 hover:text-slate-300",
                )}
              >
                {localeLabels[item]}
              </button>
            ))}
          </div>

          {isAuthenticated ? (
            <>
              <Link
                href="/settings"
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden sm:inline-flex")}
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                {t(uiDictionary.header.dashboard)}
              </Link>
              <button
                onClick={() => void signOut()}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {t(uiDictionary.header.signOut)}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth?mode=sign-in"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "hidden sm:inline-flex",
                )}
              >
                {t(uiDictionary.header.signIn)}
              </Link>
              <Link href="/quiz" className={buttonVariants({ size: "sm" })}>
                {t(uiDictionary.header.takeQuiz)}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
