import { QuizFlow } from "@/components/quiz/quiz-flow";

interface QuizPageProps {
  searchParams: Promise<{
    reset?: string;
  }>;
}

export default async function QuizPage({ searchParams }: QuizPageProps) {
  const params = await searchParams;

  return <QuizFlow shouldReset={params.reset === "1"} />;
}
