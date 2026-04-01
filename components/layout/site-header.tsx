"use client";

import Link from "next/link";
import { Settings, UserRound } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { buttonVariants } from "@/components/ui/button";
import { uiDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { t } = useLocale();
  const { isAuthenticated, signOut } = useAuth();

  const navItems = [
    { href: "/quiz", label: t(uiDictionary.nav.quiz) },
    { href: "/tracks", label: t(uiDictionary.nav.tracks) },
    { href: "/dashboard", label: t(uiDictionary.nav.dashboard) },
    { href: "/about", label: t(uiDictionary.nav.about) },
    { href: "/settings", label: t(uiDictionary.nav.settings) },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(4,8,22,0.72)] backdrop-blur-xl">
      <div className="container-shell flex h-18 items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(82,229,255,0.2),rgba(123,140,255,0.16))] text-lg font-semibold text-white shadow-[0_12px_40px_rgba(82,229,255,0.16)]">
            CP
          </span>
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-cyan-100/70">
              CYBERPATH
            </p>
            <p className="text-xs text-slate-400">{t(uiDictionary.tagline)}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/settings"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hidden sm:inline-flex",
            )}
            aria-label={t(uiDictionary.nav.settings)}
          >
            <Settings className="h-4 w-4" />
          </Link>
          <Link
            href="/tracks"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            {t(uiDictionary.header.exploreTracks)}
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className={buttonVariants({ size: "sm" })}
              >
                <UserRound className="h-4 w-4" />
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
                className={buttonVariants({ variant: "outline", size: "sm" })}
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
