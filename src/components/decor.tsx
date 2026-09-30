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

  return (
    // Decorative artwork; kept unoptimized so absolute positioning stays exact.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tinted}
      alt=""
      aria-hidden
      className={cn("pointer-events-none absolute object-contain", className)}
      style={style}
    />
  );
}

export function Logoipsum({ variant = 0 }: { variant?: number }) {
  const marks = [
    <g key="0">
      <circle cx="20" cy="20" r="20" fill="currentColor" />
      <path
        d="M6 15c4-3 8-3 12 0M6 21c4-3 8-3 12 0M8 27c4-3 8-3 12 0"
        stroke="#f5f5f6"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </g>,
    <g key="1">
      <circle cx="20" cy="20" r="6" fill="currentColor" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12;
        const x1 = 20 + Math.cos(a) * 10;
        const y1 = 20 + Math.sin(a) * 10;
        const x2 = 20 + Math.cos(a) * 19;
        const y2 = 20 + Math.sin(a) * 19;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />;
      })}
    </g>,
    <g key="2">
      <circle cx="20" cy="20" r="20" fill="currentColor" />
      <path d="M23 8l-9 13h6l-3 11 10-14h-6l2-10Z" fill="#f5f5f6" />
    </g>,
    <g key="3">
      <circle cx="20" cy="20" r="20" fill="currentColor" />
      <path
        d="M13 13l7 7 7-7M13 27l7-7 7 7"
        stroke="#f5f5f6"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>,
    <g key="4">
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="20" cy="20" rx="8" ry="19" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M2 14h36M2 26h36" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M6 8c9 6 19 6 28 0M6 32c9-6 19-6 28 0" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </g>,
  ];

  return (
    <div className="flex h-[28px] w-[115px] items-center gap-2 text-neutral-400 sm:h-[42px] sm:w-[170px] sm:gap-3">
      <svg viewBox="0 0 40 40" className="size-7 shrink-0 sm:size-10" aria-hidden>
        {marks[variant % marks.length]}
      </svg>
      <span className="text-[13px] leading-none font-bold tracking-tight text-neutral-400 sm:text-[19px]">
        Logoipsum
      </span>
    </div>
  );
}
