export function hasSupabasePublicEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function hasResendEnv() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "";
}
