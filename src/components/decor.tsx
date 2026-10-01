import { cn } from "@/lib/cn";

export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("page-grid pointer-events-none absolute inset-0 opacity-100", className)}
    />
  );
}

export function GlowBlob({
  className,
  color,
  radial,
  strength,
}: {
  className?: string;
  color: "blue" | "lime";
  radial?: boolean;
  strength?: number;
}) {
  const rgb = color === "lime" ? "203,252,1" : "0,59,226";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[40px]",
        className,
      )}
      style={
        radial
          ? {
              background: `radial-gradient(50% 50% at 50% 50%, rgba(${rgb},1) 0%, rgba(${rgb},0.23) 53%, rgba(${rgb},0.06) 75%, rgba(${rgb},0) 100%)`,
              opacity: strength ?? 1,
            }
          : { background: color === "lime" ? "#cbfc01" : "#003be2" }
      }
    />
  );
}

export function Ornament({
  src,
  color = "white",
  className,
  style,
}: {
  src: string;
  color?: "white" | "lime";
  className?: string;
  style?: React.CSSProperties;
}) {
  const tinted = src.replace(/\.png$/, `-${color}.png`);

  let hash = 0;
  for (let i = 0; i < src.length; i++) hash = (hash * 31 + src.charCodeAt(i)) % 997;
  const float = ["ornament-float-a", "ornament-float-b", "ornament-float-c"][hash % 3];

  return (
    // Decorative artwork; kept unoptimized so absolute positioning stays exact.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tinted}
      alt=""
      aria-hidden
      className={cn("pointer-events-none absolute object-contain", float, className)}
      style={style}
    />
  );
}

const LOGOSUM_FILES = [
  "logoipsum1.png",
  "logoipsum2-full-frame.svg",
  "logoipsum3.svg",
  "logoipsum4.svg",
  "logoipsum5.svg",
];

export function Logoipsum({ variant = 0 }: { variant?: number }) {
  const index = variant % LOGOSUM_FILES.length;
  const src = `/icons/${LOGOSUM_FILES[index]}`;

  // 2nd asset is a full frame (mark + wordmark) — no separate text next to it.
  if (index === 1) {
    return (
      <div className="flex h-[37px] items-center sm:h-[42px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="Logoipsum" className="h-[37px] w-auto sm:h-[42px]" />
      </div>
    );
  }

  return (
    <div className="flex h-[37px] w-[145px] items-center gap-2.5 text-neutral-400 sm:h-[42px] sm:w-[170px] sm:gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="size-9 shrink-0 object-contain sm:size-10"
      />
      <span className="text-[17px] leading-none font-bold tracking-tight text-neutral-400 sm:text-[19px]">
        Logoipsum
      </span>
    </div>
  );
}
