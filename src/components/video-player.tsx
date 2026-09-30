"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/** Idle delay before the control bar fades out, matching YouTube. */
const HIDE_AFTER_MS = 3000;
const TICK_MS = 250;
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

function formatClock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function ReplayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7">
      <path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z" />
    </svg>
  );
}

function VolumeGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05A4.47 4.47 0 0 0 16.5 12zM14 3.23v2.06a6.98 6.98 0 0 1 0 13.42v2.06a8.97 8.97 0 0 0 0-17.54z" />
    </svg>
  );
}

function VolumeOffGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
      <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a7.97 7.97 0 0 0 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    </svg>
  );
}

function SettingsGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.48.48 0 0 0-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87a.48.48 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z" />
    </svg>
  );
}

function FullscreenGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
  );
}

function ExitFullscreenGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
    </svg>
  );
}

function ControlButton({
  label,
  onClick,
  testId,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  testId?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-player-control
      data-testid={testId}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative grid size-9 shrink-0 place-items-center rounded-full text-white/95 transition-colors",
        "after:absolute after:inset-[-6px] after:content-[''] hover:text-white",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-10",
        className,
      )}
    >
      {children}
    </button>
  );
}

/**
 * YouTube-style video surface: auto-hiding control bar, hover-growing seek bar
 * with a scrubber knob and time tooltip, centre play/replay button, volume,
 * speed menu and real fullscreen. The playback clock is simulated by the caller
 * (`duration` seconds) because the repo ships no video files.
 */
export function VideoPlayer({
  poster,
  alt = "",
  duration,
  sizes = "100vw",
  className,
}: {
  poster: string;
  alt?: string;
  duration: number;
  sizes?: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hideRef = useRef<number | null>(null);

  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [controls, setControls] = useState(true);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const finished = elapsed >= duration;
  const running = playing && !finished;
  const showControls = controls || !running || settingsOpen;
  const percent = clamp((elapsed / duration) * 100, 0, 100);
  const effectiveVolume = muted ? 0 : volume;

  const bump = useCallback(() => {
    setControls(true);
    if (hideRef.current !== null) window.clearTimeout(hideRef.current);
    hideRef.current = window.setTimeout(() => setControls(false), HIDE_AFTER_MS);
  }, []);

  const showNow = useCallback(() => {
    if (hideRef.current !== null) window.clearTimeout(hideRef.current);
    setControls(true);
  }, []);

  const toggle = useCallback(() => {
    if (finished) {
      setElapsed(0);
      setPlaying(true);
      bump();
      return;
    }
    if (playing) {
      setPlaying(false);
      showNow();
    } else {
      setPlaying(true);
      bump();
    }
  }, [finished, playing, bump, showNow]);

  const seekBy = useCallback(
    (delta: number) => setElapsed((e) => clamp(e + delta, 0, duration)),
    [duration],
  );

  const seekTo = useCallback((ratio: number) => setElapsed(clamp(ratio * duration, 0, duration)), [duration]);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    const el = rootRef.current;
    if (el?.requestFullscreen) void el.requestFullscreen().catch(() => {});
  }, []);

  useEffect(() => {
    if (!running) return;
    const step = (TICK_MS / 1000) * speed;
    const id = window.setInterval(() => setElapsed((e) => Math.min(duration, e + step)), TICK_MS);
    return () => window.clearInterval(id);
  }, [running, speed, duration]);

  useEffect(() => {
    const onFullscreenChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Escape leaves fullscreen (or the speed menu) instead of closing the dialog.
  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.fullscreenElement) {
        e.stopPropagation();
        void document.exitFullscreen().catch(() => {});
        return;
      }
      if (settingsOpen) {
        setSettingsOpen(false);
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [settingsOpen]);

  // First hide is scheduled up front so the bar still fades out when the clip
  // opens and nobody touches the mouse; later ones go through bump().
  useEffect(() => {
    hideRef.current = window.setTimeout(() => setControls(false), HIDE_AFTER_MS);
    return () => {
      if (hideRef.current !== null) window.clearTimeout(hideRef.current);
    };
  }, []);

  const ratioFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return rect.width === 0 ? 0 : clamp((clientX - rect.left) / rect.width, 0, 1);
  };

  const onTrackPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const ratio = ratioFromClientX(e.clientX);
    setScrubbing(true);
    setHoverRatio(ratio);
    seekTo(ratio);
    bump();
  };

  const onTrackPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const ratio = ratioFromClientX(e.clientX);
    setHoverRatio(ratio);
    if (scrubbing) seekTo(ratio);
    bump();
  };

  const onTrackPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setScrubbing(false);
  };

  const onVolumePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    applyVolumeFromClientX(e.clientX, e.currentTarget);
  };

  const onVolumePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    applyVolumeFromClientX(e.clientX, e.currentTarget);
  };

  const applyVolumeFromClientX = (clientX: number, el: HTMLDivElement) => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const next = Math.round(clamp((clientX - rect.left) / rect.width, 0, 1) * 100);
    setVolume(next);
    if (next > 0) setMuted(false);
  };

  const onRootKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    const onControl = Boolean(target?.closest("[data-player-control]"));
    bump();

    switch (e.key) {
      case " ":
      case "k":
      case "K":
        if (onControl) return;
        e.preventDefault();
        toggle();
        break;
      case "ArrowLeft":
        if (onControl) return;
        e.preventDefault();
        seekBy(-5);
        break;
      case "ArrowRight":
        if (onControl) return;
        e.preventDefault();
        seekBy(5);
        break;
      case "Home":
        if (onControl) return;
        setElapsed(0);
        break;
      case "End":
        if (onControl) return;
        setElapsed(duration);
        break;
      case "ArrowUp":
        e.preventDefault();
        setMuted(false);
        setVolume((v) => clamp(v + 5, 0, 100));
        break;
      case "ArrowDown":
        e.preventDefault();
        setVolume((v) => clamp(v - 5, 0, 100));
        break;
      case "m":
      case "M":
        setMuted((m) => !m);
        break;
      case "f":
      case "F":
        toggleFullscreen();
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      data-player-root
      tabIndex={0}
      onPointerMove={bump}
      onPointerDown={bump}
      onKeyDown={onRootKeyDown}
      className={cn(
        "group/player relative aspect-[720/479] w-full touch-none bg-black outline-none select-none",
        fullscreen ? "rounded-none" : "rounded-[16px]",
        showControls ? "" : "cursor-none",
        className,
      )}
    >
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority
      />

      <button
        type="button"
        data-player-control
        data-testid="preview-toggle"
        aria-label={running ? "Pause preview" : "Play preview"}
        onClick={toggle}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer"
      />

      {!running ? (
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
          <span className="grid size-[68px] place-items-center rounded-[14px] bg-black/60 text-white sm:size-[76px]">
            {finished ? <ReplayGlyph /> : <PlayGlyph />}
          </span>
        </div>
      ) : null}

      {settingsOpen ? (
        <button
          type="button"
          aria-label="Close settings menu"
          onClick={() => setSettingsOpen(false)}
          className="absolute inset-0 z-20 cursor-default"
        />
      ) : null}

      <div
        data-testid="preview-controls"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/75 via-black/35 to-transparent pt-14 pb-1.5",
          "transition-[opacity,visibility] duration-200",
          showControls ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.floor(elapsed)}
          aria-valuetext={`${formatClock(elapsed)} of ${formatClock(duration)}`}
          data-player-control
          data-testid="preview-progress"
          onPointerDown={onTrackPointerDown}
          onPointerMove={onTrackPointerMove}
          onPointerUp={onTrackPointerUp}
          onPointerCancel={onTrackPointerUp}
          onPointerLeave={() => {
            if (!scrubbing) setHoverRatio(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              seekBy(-5);
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              seekBy(5);
            }
            if (e.key === "Home") setElapsed(0);
            if (e.key === "End") setElapsed(duration);
          }}
          className="group/bar pointer-events-auto relative mx-3 cursor-pointer py-[7px] touch-none"
        >
          <div className="relative h-[3px] w-full rounded-full bg-white/30 transition-[height] duration-150 group-hover/bar:h-[5px]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/45"
              style={{ width: `${clamp(percent + 18, 0, 100)}%` }}
            />
            <div className="absolute inset-y-0 left-0 rounded-full bg-secondary-400" style={{ width: `${percent}%` }} />
            <span
              className={cn(
                "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-400 transition-[width,height] duration-150",
                scrubbing ? "size-3" : "size-0 group-hover/bar:size-3",
              )}
              style={{ left: `${percent}%` }}
            />
          </div>
          {hoverRatio !== null ? (
            <span
              className="pointer-events-none absolute bottom-full mb-2 -translate-x-1/2 rounded-lg bg-black/85 px-2 py-1 text-[12px] leading-4 font-medium text-white tabular-nums"
              style={{ left: `${clamp(hoverRatio * 100, 5, 95)}%` }}
            >
              {formatClock(hoverRatio * duration)}
            </span>
          ) : null}
        </div>

        <div className="pointer-events-auto mt-1 flex items-center gap-0.5 px-1.5 sm:gap-1 sm:px-2.5">
          <ControlButton
            testId="preview-playpause"
            label={running ? "Pause" : "Play"}
            onClick={toggle}
          >
            {running ? <PauseGlyph /> : <PlayGlyph />}
          </ControlButton>

          <div className="group/vol flex items-center">
            <ControlButton
              testId="preview-mute"
              label={effectiveVolume === 0 ? "Unmute" : "Mute"}
              onClick={() => setMuted((m) => !m)}
            >
              {effectiveVolume === 0 ? <VolumeOffGlyph /> : <VolumeGlyph />}
            </ControlButton>
            <div className="w-0 overflow-hidden transition-[width] duration-200 group-focus-within/vol:w-16 group-hover/vol:w-16">
              <div
                data-player-control
                data-testid="preview-volume"
                role="slider"
                tabIndex={0}
                aria-label="Volume"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={effectiveVolume}
                onPointerDown={onVolumePointerDown}
                onPointerMove={onVolumePointerMove}
                onPointerUp={(e) => {
                  if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                    e.currentTarget.releasePointerCapture(e.pointerId);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setMuted(false);
                    setVolume((v) => clamp(v + 5, 0, 100));
                  }
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setVolume((v) => clamp(v - 5, 0, 100));
                  }
                }}
                className="relative mx-1.5 flex h-6 w-14 cursor-pointer touch-none items-center"
              >
                <div className="h-1 w-full rounded-full bg-white/30">
                  <div className="h-full rounded-full bg-white" style={{ width: `${effectiveVolume}%` }} />
                </div>
                <span
                  className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover/vol:opacity-100 group-focus-within/vol:opacity-100"
                  style={{ left: `${effectiveVolume}%` }}
                />
              </div>
            </div>
          </div>

          <span
            data-testid="preview-time"
            className="ml-1.5 text-[12px] leading-4 font-medium whitespace-nowrap text-white/95 tabular-nums sm:text-[13px]"
          >
            {formatClock(elapsed)} / {formatClock(duration)}
          </span>

          <span className="flex-1" />

          <ControlButton
            testId="preview-settings"
            label="Settings"
            onClick={() => setSettingsOpen((v) => !v)}
          >
            <span className={cn("block transition-transform duration-200", settingsOpen && "rotate-90")}>
              <SettingsGlyph />
            </span>
          </ControlButton>
          <ControlButton
            testId="preview-fullscreen"
            label={fullscreen ? "Exit full screen" : "Full screen"}
            onClick={toggleFullscreen}
          >
            {fullscreen ? <ExitFullscreenGlyph /> : <FullscreenGlyph />}
          </ControlButton>
        </div>
      </div>

      {settingsOpen ? (
        <div
          role="menu"
          aria-label="Playback settings"
          data-testid="preview-settings-menu"
          className="absolute right-2 bottom-16 z-40 w-[236px] overflow-hidden rounded-2xl bg-[#282828] py-1.5 text-[14px] leading-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
        >
          <button
            type="button"
            role="menuitem"
            data-player-control
            onClick={() => setSpeed((s) => SPEEDS[(SPEEDS.indexOf(s) + 1) % SPEEDS.length])}
            className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-white/10"
          >
            <span>Playback speed</span>
            <span className="text-white/70">{speed === 1 ? "Normal" : `${speed}x`}</span>
          </button>
          <div className="flex w-full items-center justify-between px-4 py-2.5">
            <span>Quality</span>
            <span className="text-white/70">1080p HD</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
