import { notFound } from "next/navigation";

import { TrackDetail } from "@/components/tracks/track-detail";
import { trackMap, tracks } from "@/lib/data/cyberpath";

interface TrackDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return tracks.map((track) => ({
    slug: track.slug,
  }));
}

export default async function TrackDetailPage({
  params,
}: TrackDetailPageProps) {
  const { slug } = await params;
  const track = trackMap[slug as keyof typeof trackMap];

  if (!track) {
    notFound();
  }

  return <TrackDetail track={track} />;
}
