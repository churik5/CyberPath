import { AuthPage } from "@/components/auth/auth-page";

interface AuthRoutePageProps {
  searchParams: Promise<{
    mode?: string;
    postQuiz?: string;
  }>;
}

export default async function AuthRoutePage({
  searchParams,
}: AuthRoutePageProps) {
  const params = await searchParams;

  return (
    <AuthPage
      mode={params.mode}
      postQuiz={params.postQuiz === "1"}
    />
  );
}
