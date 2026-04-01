"use client";

import { startTransition, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { TrackIcon } from "@/components/tracks/track-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uiDictionary } from "@/lib/i18n";
import { getFallbackResult, STORAGE_KEYS } from "@/lib/quiz-engine";
import type { QuizResult } from "@/lib/types";

interface AuthPageProps {
  mode?: string;
  postQuiz?: boolean;
}

export function AuthPage({ mode = "sign-in", postQuiz = false }: AuthPageProps) {
  const router = useRouter();
  const { t, locale } = useLocale();
  const { authAvailable, isAuthenticated, signIn, signUp, user } = useAuth();
  const [activeMode, setActiveMode] = useState<"sign-in" | "sign-up">(
    mode === "sign-up" ? "sign-up" : "sign-in",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult>(() => getFallbackResult());

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEYS.quizResult);
    if (!stored) return;

    queueMicrotask(() => {
      setResult(JSON.parse(stored) as QuizResult);
    });
  }, []);

  if (isAuthenticated && user) {
    return (
      <div className="container-shell py-12">
        <div className="panel rounded-[36px] p-10 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-cyan-200" />
          <h1 className="mt-5 text-3xl font-semibold text-white">
            {t(uiDictionary.auth.successSignedIn)}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-300">
            {user.email}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button onClick={() => router.push("/dashboard")}>
              {t(uiDictionary.header.dashboard)}
            </Button>
            {postQuiz ? (
              <Button variant="outline" onClick={() => router.push("/results")}>
                {t(uiDictionary.results.startPath)}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setStatus(null);

    if (activeMode === "sign-in") {
      const response = await signIn({ email, password });

      if (response.error) {
        setError(response.error);
        setIsSubmitting(false);
        return;
      }

      setStatus(t(uiDictionary.auth.successSignedIn));
      startTransition(() => {
        router.push(postQuiz ? "/results" : "/dashboard");
      });
      return;
    }

    const response = await signUp({
      name,
      email,
      password,
      locale,
      postQuiz,
    });

    if (response.error) {
      setError(response.error);
      setIsSubmitting(false);
      return;
    }

    setStatus(
      response.needsEmailConfirmation
        ? t(uiDictionary.auth.successCheckEmail)
        : t(uiDictionary.auth.successSignedIn),
    );
    setIsSubmitting(false);

    if (!response.needsEmailConfirmation) {
      startTransition(() => {
        router.push(postQuiz ? "/results" : "/dashboard");
      });
    }
  };

  return (
    <div className="container-shell py-10 lg:py-14">
      <div className="grid gap-8 xl:grid-cols-[1fr_0.96fr]">
        <section className="panel rounded-[36px] p-8 sm:p-10">
          <Badge>{t(uiDictionary.nav.auth)}</Badge>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {activeMode === "sign-in"
              ? t(uiDictionary.auth.signInTitle)
              : t(uiDictionary.auth.signUpTitle)}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            {activeMode === "sign-in"
              ? t(uiDictionary.auth.signInSubtitle)
              : t(uiDictionary.auth.signUpSubtitle)}
          </p>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setActiveMode("sign-in")}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                activeMode === "sign-in"
                  ? "border-cyan-300/28 bg-cyan-300/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-slate-300"
              }`}
            >
              {t(uiDictionary.auth.submitSignIn)}
            </button>
            <button
              onClick={() => setActiveMode("sign-up")}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                activeMode === "sign-up"
                  ? "border-cyan-300/28 bg-cyan-300/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-slate-300"
              }`}
            >
              {t(uiDictionary.auth.submitSignUp)}
            </button>
          </div>

          <div className="mt-8 grid gap-4">
            {activeMode === "sign-up" ? (
              <label className="space-y-2">
                <span className="text-sm text-slate-300">{t(uiDictionary.auth.name)}</span>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t(uiDictionary.auth.name)}
                />
              </label>
            ) : null}

            <label className="space-y-2">
              <span className="text-sm text-slate-300">{t(uiDictionary.auth.email)}</span>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                type="email"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm text-slate-300">{t(uiDictionary.auth.password)}</span>
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                type="password"
              />
            </label>
          </div>

          {!authAvailable ? (
            <div className="mt-6 rounded-[22px] border border-amber-300/18 bg-amber-300/8 px-4 py-4 text-sm leading-7 text-amber-50">
              {t(uiDictionary.auth.integrationMissing)}
            </div>
          ) : null}

          {status ? (
            <div className="mt-6 rounded-[22px] border border-cyan-300/18 bg-cyan-300/8 px-4 py-4 text-sm leading-7 text-cyan-50">
              {status}
            </div>
          ) : null}

          {error ? (
            <div className="mt-6 rounded-[22px] border border-rose-300/18 bg-rose-300/8 px-4 py-4 text-sm leading-7 text-rose-50">
              {error}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !email ||
                !password ||
                (activeMode === "sign-up" && !name)
              }
            >
              {activeMode === "sign-in"
                ? t(uiDictionary.auth.submitSignIn)
                : t(uiDictionary.auth.submitSignUp)}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setActiveMode((current) =>
                  current === "sign-in" ? "sign-up" : "sign-in",
                )
              }
            >
              {activeMode === "sign-in"
                ? t(uiDictionary.auth.switchToSignUp)
                : t(uiDictionary.auth.switchToSignIn)}
            </Button>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-400">
            {t(uiDictionary.auth.resendNote)}
          </p>
        </section>

        <aside className="panel rounded-[36px] p-8 sm:p-10">
          <Badge>{postQuiz ? t(uiDictionary.auth.quizContext) : t(uiDictionary.header.takeQuiz)}</Badge>
          <h2 className="mt-6 text-3xl font-semibold text-white">
            {postQuiz
              ? t(uiDictionary.auth.quizContextDescription)
              : t(uiDictionary.hero.subtitle)}
          </h2>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              {t(uiDictionary.results.topMatch)}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: `${result.primaryTrack.track.accent}18`,
                  color: result.primaryTrack.track.accent,
                }}
              >
                <TrackIcon icon={result.primaryTrack.track.icon} />
              </span>
              <div>
                <p className="text-xl font-semibold text-white">
                  {result.primaryTrack.track.name}
                </p>
                <p className="mt-1 text-sm text-cyan-100">
                  {result.primaryTrack.fitPercent}%
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {result.primaryTrack.track.shortDescription}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
