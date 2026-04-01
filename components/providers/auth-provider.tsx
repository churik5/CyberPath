"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import { getAppUrl, hasSupabasePublicEnv } from "@/lib/integrations";
import { STORAGE_KEYS } from "@/lib/quiz-engine";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { Locale } from "@/lib/i18n";

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  locale: Locale;
  postQuiz?: boolean;
}

interface SignInPayload {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isReady: boolean;
  isAuthenticated: boolean;
  authAvailable: boolean;
  signUp: (payload: SignUpPayload) => Promise<{
    error?: string;
    needsEmailConfirmation?: boolean;
  }>;
  signIn: (payload: SignInPayload) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const authAvailable = hasSupabasePublicEnv();

  useEffect(() => {
    const client = getSupabaseBrowserClient();

    if (!client) {
      queueMicrotask(() => {
        setIsReady(true);
      });
      return;
    }

    client.auth.getSession().then(({ data }) => {
      queueMicrotask(() => {
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setIsReady(true);
      });
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_, nextSession) => {
      startTransition(() => {
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async ({ name, email, password, locale, postQuiz }: SignUpPayload) => {
    const client = getSupabaseBrowserClient();

    if (!client) {
      return {
        error:
          "Supabase environment variables are missing. Add them to .env.local before using auth.",
      };
    }

    const appUrl = getAppUrl();
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        ...(appUrl ? { emailRedirectTo: `${appUrl}/dashboard` } : {}),
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    const storedQuizResult = window.localStorage.getItem(STORAGE_KEYS.quizResult);

    void fetch("/api/email/welcome", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        locale,
        postQuiz,
        quizResult: storedQuizResult ? JSON.parse(storedQuizResult) : null,
      }),
    }).catch(() => undefined);

    return {
      needsEmailConfirmation: !data.session,
    };
  };

  const signIn = async ({ email, password }: SignInPayload) => {
    const client = getSupabaseBrowserClient();

    if (!client) {
      return {
        error:
          "Supabase environment variables are missing. Add them to .env.local before using auth.",
      };
    }

    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return {};
  };

  const signOut = async () => {
    const client = getSupabaseBrowserClient();
    if (!client) return;
    await client.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isReady,
        isAuthenticated: Boolean(user),
        authAvailable,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
