"use client";

import { PlayIcon } from "@/components/icons";
import { usePreview } from "@/components/preview-modal";
import { previewVideos } from "@/data/site";

export function LessonPlayButton({ title }: { title: string }) {
  const preview = usePreview();

  return (
    <button
      type="button"
      aria-label={`Play ${title}`}
      data-testid="lesson-play"
      onClick={() =>
        preview({ title, subtitle: "Lesson preview", videoId: previewVideos[title] })
      }
      className="grid size-[72px] shrink-0 place-items-center rounded-[24px] bg-secondary-400 text-white transition-transform hover:scale-105"
    >
      <PlayIcon className="ml-1 size-10" />
    </button>
  );
}
