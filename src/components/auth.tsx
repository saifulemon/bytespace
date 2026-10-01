import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { StarIcon } from "@/components/icons";
import { GridBackdrop, Ornament } from "@/components/decor";
import { Logo } from "@/components/site";
import { cn } from "@/lib/cn";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/site";

export function AuthShell({
  eyebrow,
  description,
  pbClass = "lg:pb-[40px]",
  children,
}: {
  eyebrow: string;
  description: string;
  pbClass?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-primary-800">
      <GridBackdrop />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-24 lg:h-[1024px] lg:px-0 lg:pb-0">
        <div className="relative z-30 pt-[35px] lg:absolute lg:top-[35px] lg:left-[122px] lg:pt-0">
          <Logo wordmark={false} />
        </div>

        <AuthAside />

        <div className="relative z-20 flex flex-col gap-8 pt-16 lg:absolute lg:top-[120px] lg:left-[122px] lg:w-[475px] lg:pt-0">
          <div className="flex flex-col gap-4">
            <p className="font-heading text-[20px] leading-[24px] font-semibold tracking-[-0.01em] text-neutral-50">
              {eyebrow}
            </p>
            <p className="text-[18px] leading-[29px] text-neutral-50">{description}</p>
          </div>
        </div>

        <div className="relative z-20 mt-10 w-full max-w-[579px] rounded-[24px] bg-white lg:absolute lg:top-[120px] lg:right-[120px] lg:mt-0 lg:w-[579px]">
          <div className={cn("px-6 pt-10 pb-10 sm:px-10 lg:px-[63px] lg:pt-[61px]", pbClass)}>{children}</div>
        </div>
      </div>
    </section>
  );
}

function AuthAside() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      <CourseCard course={courses[1]} variant="loose" className="absolute top-[394px] left-[122px]" />
      <CourseCard course={courses[2]} variant="loose" className="absolute top-[305px] left-[233px]" />
      <Ornament src="/images/8670b841_344x344.png" color="lime" style={{ left: 149, top: 320, width: 147, height: 147 }} />
      <Ornament src="/images/f9c0e0fd_189x189.png" color="lime" style={{ left: 95, top: 702, width: 189, height: 189 }} />
      <Ornament src="/images/e3b55902_387x387.png" color="white" style={{ left: 471, top: 626, width: 176, height: 176 }} />

      <div className="absolute top-[740px] left-[348px] flex w-[258px] flex-col gap-2 rounded-[16px] bg-secondary-400 p-4">
        <div className="flex flex-col">
          <span className="text-[16px] leading-[24px] font-medium text-neutral-950">Happy Students</span>
          <span className="flex items-center gap-0 text-[10px] leading-4 text-[#424348]">
            4.5 (240)
            <StarIcon className="size-4 text-primary-800" />
          </span>
        </div>
        <div className="flex items-center">
          {[
            "/images/9ef8cb32_52x52.png",
            "/images/b44979e1_96x96.png",
            "/images/83fb3e04_43x43.png",
            "/images/f3cf29a8_43x43.png",
            "/images/5824acac_43x43.png",
            "/images/7fdccc78_43x43.png",
            "/images/1e078348_43x43.png",
          ].map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={43}
              height={43}
              className="size-[43px] rounded-full object-cover"
              style={{ marginLeft: i === 0 ? 0 : -16 }}
            />
          ))}
          <span
            className="grid size-[43px] place-items-center rounded-full bg-neutral-950 text-[12px] leading-[18px] font-bold text-neutral-50"
            style={{ marginLeft: -16 }}
          >
            2K+
          </span>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string;
  placeholder: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] leading-[17px] font-medium text-neutral-950">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={cn(
          "h-[52px] w-full rounded-[12px] border bg-white px-6 text-[18px] leading-[29px] text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-primary-600",
          error ? "border-primary-800" : "border-neutral-100",
        )}
      />
      {error ? (
        <span role="alert" className="text-[13px] leading-[18px] text-primary-800">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function AuthButton({ children, ...props }: { children: ReactNode } & ComponentProps<"button">) {
  return (
    <button
      type="button"
      {...props}
      className="inline-flex h-[46px] items-center justify-center gap-2 self-end rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
    >
      {children}
    </button>
  );
}

export function SocialRow({ onSelect }: { onSelect?: (provider: "Facebook" | "Google") => void }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {["facebook", "google"].map((provider) => {
        const label = provider === "facebook" ? "Facebook" : "Google";
        return (
          <button
            key={provider}
            type="button"
            data-testid={`social-${provider}`}
            aria-label={`Continue with ${label}`}
            onClick={() => onSelect?.(label)}
            className="grid size-[72px] place-items-center rounded-[24px] transition-colors hover:opacity-80"
          >
            {/* Full 72x72 frame incl. border, straight from Figma */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/icons/${provider}.svg`} alt="" className="size-[72px]" />
          </button>
        );
      })}
    </div>
  );
}
