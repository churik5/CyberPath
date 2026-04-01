import { DashboardHome } from "@/components/dashboard/dashboard-home";

interface DashboardPageProps {
  searchParams: Promise<{
    track?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;

  return <DashboardHome trackSlug={params.track} />;
}
