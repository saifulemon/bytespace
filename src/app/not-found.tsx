import Link from "next/link";
import { Footer, Header, HeaderSlot } from "@/components/site";
import { GridBackdrop } from "@/components/decor";

export default function NotFound() {
  return (
    <>
      <Header />
      <section data-aos="fade-up" className="relative isolate h-[957px] w-full overflow-hidden bg-primary-800">
        <GridBackdrop />

        <HeaderSlot />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[160px] flex justify-center"
          style={{
            transform: "translate(9.81px, 11.59px) scale(0.981, 0.964)",
            transformOrigin: "0 0",
          }}
        >
          <span
            className="font-heading font-semibold tracking-[-0.01em] text-transparent"
            style={{
              fontSize: "clamp(140px, 33.3vw, 480px)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              backgroundImage:
                "linear-gradient(180deg, #d4fb20 0%, rgba(212,251,32,0.96) 25%, rgba(212,251,32,0.81) 50.5%, rgba(212,251,32,0.61) 68%, rgba(255,255,255,0) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            404
          </span>
        </div>

        <div className="absolute inset-x-0 top-[521px] max-sm:top-[380px] flex flex-col items-center gap-8 px-6">
          <h1
            className="max-w-[935px] text-center font-heading text-[40px] leading-[48px] font-semibold tracking-[-0.01em] text-white md:text-[72px] md:leading-[86px]"
            style={{ wordSpacing: "-0.0185em" }}
          >
            The page you are looking for doesn’t exist
          </h1>
          <p className="max-w-[486px] text-center text-[18px] leading-[29px] text-neutral-100">
            Try to use a correct url or go back to homepage to start again
          </p>
          <Link
            href="/"
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <div className="mt-[3px]">
        <Footer />
      </div>
    </>
  );
}
