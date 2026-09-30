"use client";

import { useEffect, type ReactNode } from "react";
import { CloseIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

const sizes = {
  sm: "sm:max-w-[420px]",
  md: "sm:max-w-[560px]",
  lg: "sm:max-w-[760px]",
};

/**
 * Centered dialog. Renders nothing while closed so the static screenshots of
 * every route stay byte-identical. Closes on backdrop click, the ✕ button and
 * Escape, and locks body scroll while open.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  testId,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: keyof typeof sizes;
  testId?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      data-testid={testId ?? "modal"}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-neutral-950/50"
      />
      <div
        className={cn(
          "relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-[24px] bg-white",
          "shadow-[0_28px_70px_-30px_rgba(16,24,40,0.55)]",
          sizes[size],
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-hairline px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-[20px] leading-[26px] font-semibold tracking-[-0.01em] text-neutral-950">
              {title}
            </h2>
            {description ? (
              <p className="text-[14px] leading-[22px] text-neutral-700">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            data-testid="modal-close"
            className="grid size-9 shrink-0 place-items-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8" data-testid="modal-body">
          {children}
        </div>

        {footer ? (
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-hairline px-6 py-4 sm:px-8">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ModalOption({
  active,
  onClick,
  children,
  role,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  role?: string;
}) {
  return (
    <button
      type="button"
      role={role}
      aria-selected={role === "option" ? active : undefined}
      aria-pressed={role ? undefined : active}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-[12px] px-4 py-3 text-left text-[16px] leading-[26px] transition-colors",
        active
          ? "bg-secondary-400 font-medium text-neutral-950"
          : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950",
      )}
    >
      <span className="flex items-center gap-3">{children}</span>
      {active ? (
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-neutral-950 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden className="size-3">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : null}
    </button>
  );
}
