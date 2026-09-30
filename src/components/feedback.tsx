"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "success" | "error";
type Toast = { id: number; message: string; tone: Tone };

type Push = (message: string, tone?: Tone) => void;

const ToastContext = createContext<Push>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const push = useCallback<Push>((message, tone = "default") => {
    const id = ++idRef.current;
    setToasts((list) => [...list, { id, message, tone }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex flex-col items-center gap-2 px-4"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            data-testid="toast"
            className={cn(
              "pointer-events-auto flex max-w-[92vw] items-center gap-3 rounded-[24px] px-5 py-3 text-[15px] leading-6",
              "shadow-[0_18px_44px_-24px_rgba(16,24,40,0.6)]",
              t.tone === "success" && "bg-secondary-400 text-neutral-950",
              t.tone === "error" && "bg-primary-800 text-white",
              t.tone === "default" && "bg-white text-neutral-950",
            )}
          >
            <span className="break-words">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): Push {
  return useContext(ToastContext);
}
