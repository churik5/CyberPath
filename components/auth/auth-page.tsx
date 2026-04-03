"use client";

import { startTransition, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uiDictionary } from "@/lib/i18n";

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

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(postQuiz ? "/results" : "/dashboard");
    }
  }, [isAuthenticated, user, postQuiz, router]);

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
    <div className="container-shell flex min-h-[calc(100svh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {activeMode === "sign-in"
              ? t(uiDictionary.auth.signInTitle)
              : t(uiDictionary.auth.signUpTitle)}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {activeMode === "sign-in"
              ? t(uiDictionary.auth.signInSubtitle)
              : t(uiDictionary.auth.signUpSubtitle)}
          </p>
        </div>

        <div className="panel rounded-2xl p-7">
          <div className="flex gap-1 rounded-xl bg-white/5 p-1 mb-6">
            <button
              onClick={() => setActiveMode("sign-in")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                activeMode === "sign-in"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              {t(uiDictionary.auth.submitSignIn)}
            </button>
            <button
              onClick={() => setActiveMode("sign-up")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                activeMode === "sign-up"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              {t(uiDictionary.auth.submitSignUp)}
            </button>
          </div>

          <div className="space-y-4">
            {activeMode === "sign-up" ? (
              <div className="space-y-1.5">
                <label className="text-sm text-slate-300">
                  {t(uiDictionary.auth.name)}
                </label>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t(uiDictionary.auth.name)}
                />
              </div>
            ) : null}

            <div className="space-y-1.5">
              <label className="text-sm text-slate-300">
                {t(uiDictionary.auth.email)}
              </label>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                type="email"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-slate-300">
                {t(uiDictionary.auth.password)}
              </label>
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>

          {!authAvailable ? (
            <div className="mt-5 rounded-xl border border-amber-400/15 bg-amber-400/8 px-4 py-3 text-sm text-amber-200">
              {t(uiDictionary.auth.integrationMissing)}
            </div>
          ) : null}

          {status ? (
            <div className="mt-5 rounded-xl border border-sky-400/15 bg-sky-400/8 px-4 py-3 text-sm text-sky-200">
              {status}
            </div>
          ) : null}

          {error ? (
            <div className="mt-5 rounded-xl border border-rose-400/15 bg-rose-400/8 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !email ||
              !password ||
              (activeMode === "sign-up" && !name)
            }
            className="mt-6 w-full"
            size="lg"
          >
            {activeMode === "sign-in"
              ? t(uiDictionary.auth.submitSignIn)
              : t(uiDictionary.auth.submitSignUp)}
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="mt-4 text-center text-xs text-slate-500">
            {t(uiDictionary.auth.resendNote)}
          </p>
        </div>
      </div>
    </div>
  );
}
