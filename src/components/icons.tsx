import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="5.7 5 28.6 31.3" fill="currentColor" aria-hidden {...props}>
      <path
        fillRule="evenodd"
        d="M11.7 5L16.3 17.7L30 18Q34.3 18 34.3 22.3L34.3 32Q34.3 36.3 30 36.3L10.7 36.3Q5.7 36.3 5.7 31.3L5.7 10Q5.7 5 11.7 5ZM16.7 20L16.7 31.7L29 26Z"
      />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="11" cy="11" r="6.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16L20.5 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18 6H16C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6H6C4.9 6 4 6.9 4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8C20 6.9 19.1 6 18 6ZM12 4C13.1 4 14 4.9 14 6H10C10 4.9 10.9 4 12 4ZM18 20H6V8H8V10C8 10.55 8.45 11 9 11C9.55 11 10 10.55 10 10V8H14V10C14 10.55 14.45 11 15 11C15.55 11 16 10.55 16 10V8H18V20Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.5l2.9 6.03 6.6.9-4.8 4.55 1.17 6.57L12 17.5l-5.87 3.05L7.3 13.98 2.5 9.43l6.6-.9L12 2.5Z" />
    </svg>
  );
}

export function SignalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <rect x="3" y="14" width="3.6" height="7" rx="1.2" />
      <rect x="9.2" y="10" width="3.6" height="11" rx="1.2" />
      <rect x="15.4" y="6" width="3.6" height="15" rx="1.2" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M7 17L17 7M17 7H8.5M17 7v8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M6 9.5l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 32" fill="currentColor" aria-hidden {...props}>
      <path d="M0 32V17.6C0 7.9 5.5 1.4 15.6 0l1.9 4.6C12 6.3 9 10 8.7 15.2H16V32H0Zm24 0V17.6C24 7.9 29.5 1.4 39.6 0l1.9 4.6C36 6.3 33 10 32.7 15.2H40V32H24Z" />
    </svg>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 33 33" fill="none" aria-hidden {...props}>
      <path
        d="M31.5 16.8c0-1.1-.1-2.1-.3-3.1H16.5v5.9h8.4a7.2 7.2 0 0 1-3.1 4.7v3.9h5c2.9-2.7 4.7-6.7 4.7-11.4Z"
        fill="currentColor"
      />
      <path
        d="M16.5 32c4.2 0 7.7-1.4 10.3-3.8l-5-3.9c-1.4.9-3.1 1.5-5.3 1.5-4.1 0-7.5-2.7-8.7-6.4H2.6v4A15.5 15.5 0 0 0 16.5 32Z"
        fill="currentColor"
        
      />
      <path
        d="M7.8 19.4a9.3 9.3 0 0 1 0-5.9v-4H2.6a15.5 15.5 0 0 0 0 13.9l5.2-4Z"
        fill="currentColor"
        
      />
      <path
        d="M16.5 7.1c2.3 0 4.3.8 5.9 2.3l4.4-4.4A15.5 15.5 0 0 0 2.6 9.5l5.2 4c1.2-3.7 4.6-6.4 8.7-6.4Z"
        fill="currentColor"
        
      />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 33 33" fill="none" aria-hidden {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5 1C7.94 1 1 7.94 1 16.5S7.94 32 16.5 32 32 25.06 32 16.5 25.06 1 16.5 1Zm3.62 16.1h-2.6c-.36 0-.65.29-.65.65v2.1h3.25l-.41 4.12h-2.84v9.62h-4.23V23.97h-2.65v-4.12h2.65v-2.71c0-2.4 1.45-4.15 4.05-4.15h3.38v4.12Z"
        fill="currentColor"
      />
    </svg>
  );
}

const categoryPaths: Record<string, string> = {
  development:
    "M13 6L4 18l9 12 9-12-9-12Zm0 0v24M4 18h18" ,
  it: "M5 9h26v16H5zM11 30h14M16 25v5",
  business:
    "M6 26V16m7 10V10m7 16v-7m7 7V6",
  marketing: "M6 14v14h6l10 6V8l-10 6H6Zm22-4a5 5 0 0 1 0 10",
  photography: "M5 11h6l3-4h6l3 4h6v16H5V11Zm11 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z",
};

export function CategoryIcon({ name, ...props }: { name: keyof typeof categoryPaths } & IconProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d={categoryPaths[name]} />
    </svg>
  );
}

export const categoryIconNames = Object.keys(categoryPaths) as (keyof typeof categoryPaths)[];

export function FilterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden {...props}>
      <path d="M4 7h10M18 7h2M4 12h4M12 12h8M4 17h12M20 17h0" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="12" r="2" />
      <circle cx="18" cy="17" r="2" />
    </svg>
  );
}

export function LevelIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden {...props}>
      <path d="M5 19V13M12 19V8M19 19V4" />
    </svg>
  );
}

export function SortIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M4 7h16M6 12h12M9 17h6" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" />
      <circle cx="10" cy="8" r="3.2" />
      <path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.4 5.2a3.2 3.2 0 0 1 0 5.6" />
    </svg>
  );
}
