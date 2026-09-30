"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Modal } from "@/components/ui";
import { images } from "@/data/site";

const TOTAL = 30;

type PreviewConfig = { title: string; subtitle?: string };

const PreviewContext = createContext<(config: PreviewConfig) => void>(() => {});

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PreviewConfig | null>(null);

  const openPreview = useCallback((next: PreviewConfig) => setConfig(next), []);
  const close = useCallback(() => setConfig(null), []);

  return (
    <PreviewContext.Provider value={openPreview}>
      {children}
      <PreviewDialog config={config} onClose={close} />
    </PreviewContext.Provider>
  );
}

export function usePreview(): (config: PreviewConfig) => void {
  return useContext(PreviewContext);
}

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function PreviewDialog({
  config,
  onClose,
}: {
  config: PreviewConfig | null;
  onClose: () => void;
}) {
  if (!config) return null;
  // Keyed by title so every open starts the player from 0:00.
  return <PreviewPlayer key={config.title} config={config} onClose={onClose} />;
}

function PreviewPlayer({
  config,
  onClose,
}: {
  config: PreviewConfig;
  onClose: () => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const finished = elapsed >= TOTAL;
  const running = playing && !finished;

  useEffect(() => {
    if (!playing || finished) return;
    const id = window.setInterval(() => setElapsed((e) => (e >= TOTAL ? e : e + 1)), 1000);
    return () => window.clearInterval(id);
  }, [playing, finished]);

  const percent = Math.min(100, (elapsed / TOTAL) * 100);

  const toggle = () => {
    if (finished) {
      setElapsed(0);
      setPlaying(true);
      return;
    }
    setPlaying((p) => !p);
  };

  const seek = (ratio: number) => {
    setElapsed(Math.max(0, Math.min(TOTAL, Math.round(ratio * TOTAL))));
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={config.title}
      description={config.subtitle ?? "Preview player"}
      size="lg"
      testId="preview-modal"
    >
      <div className="relative aspect-[720/479] w-full overflow-hidden rounded-[16px] bg-[#1b1b1b]">
        <Image
          src={images.courseHero}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 760px"
          className="object-cover opacity-90"
        />

        <button
          type="button"
          data-testid="preview-toggle"
          aria-label={running ? "Pause preview" : "Play preview"}
          onClick={toggle}
          className="absolute inset-0 grid place-items-center"
        >
          <span className="grid size-[76px] place-items-center rounded-[24px] border border-white/40 bg-black/35 backdrop-blur-[12px] transition-transform hover:scale-105">
            {running ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-8 text-white">
                <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-8 text-white">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            )}
          </span>
        </button>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pt-10 pb-4">
          <div
            role="slider"
            tabIndex={0}
            aria-label="Preview position"
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-valuenow={elapsed}
            data-testid="preview-progress"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              seek((e.clientX - rect.left) / rect.width);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setElapsed((v) => Math.min(TOTAL, v + 5));
              if (e.key === "ArrowLeft") setElapsed((v) => Math.max(0, v - 5));
            }}
            className="h-2 w-full cursor-pointer rounded-full bg-white/35"
          >
            <div className="h-full rounded-full bg-secondary-400" style={{ width: `${percent}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-[14px] leading-[20px] text-white">
            <button
              type="button"
              data-testid="preview-playpause"
              onClick={toggle}
              className="font-medium hover:underline"
            >
              {running ? "Pause" : "Play"}
            </button>
            <span data-testid="preview-time">
              {clock(elapsed)} / {clock(TOTAL)}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
