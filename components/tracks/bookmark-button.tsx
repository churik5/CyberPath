"use client";

import { startTransition, useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { STORAGE_KEYS } from "@/lib/quiz-engine";
import { TrackSlug } from "@/lib/types";

interface BookmarkButtonProps {
  slug: TrackSlug;
}

export function BookmarkButton({ slug }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEYS.savedTracks);
    const savedTracks = stored ? (JSON.parse(stored) as TrackSlug[]) : [];

    queueMicrotask(() => {
      setSaved(savedTracks.includes(slug));
    });
  }, [slug]);

  const toggle = () => {
    const stored = window.localStorage.getItem(STORAGE_KEYS.savedTracks);
    const savedTracks = stored ? (JSON.parse(stored) as TrackSlug[]) : [];
    const nextTracks = savedTracks.includes(slug)
      ? savedTracks.filter((item) => item !== slug)
      : [...savedTracks, slug];

    window.localStorage.setItem(
      STORAGE_KEYS.savedTracks,
      JSON.stringify(nextTracks),
    );

    startTransition(() => {
      setSaved(nextTracks.includes(slug));
    });
  };

  return (
    <Button variant="outline" size="sm" onClick={toggle}>
      {saved ? (
        <>
          <BookmarkCheck className="h-4 w-4" />
          Saved
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" />
          Save Track
        </>
      )}
    </Button>
  );
}
