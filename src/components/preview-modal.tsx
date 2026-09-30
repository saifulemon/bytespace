"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Modal } from "@/components/ui";
import { VideoPlayer } from "@/components/video-player";
import { images } from "@/data/site";

const TOTAL = 30;

type PreviewConfig = { title: string; subtitle?: string; videoId?: string };

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
  return (
    <Modal
      open
      onClose={onClose}
      title={config.title}
      description={config.subtitle ?? "Preview player"}
      size="lg"
      testId="preview-modal"
    >
      <VideoPlayer
        poster={images.courseHero}
        duration={TOTAL}
        videoId={config.videoId}
        sizes="(max-width: 768px) 100vw, 760px"
      />
    </Modal>
  );
}
