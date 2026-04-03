"use client";

import Link from "next/link";

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
          {isAuthenticated ? (
            <>
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
