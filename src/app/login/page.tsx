import type { Metadata } from "next";
import Link from "next/link";
import { AuthButton, AuthShell, Field, SocialRow } from "@/components/auth";

export const metadata: Metadata = { title: "Sign In — ByteSpace" };

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Sign in with ease"
      description="Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
    >
      <div className="flex flex-col gap-[73px]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <p className="text-[18px] leading-[29px] text-primary-800">Sign In</p>
            <h1 className="font-heading text-[36px] leading-[43px] font-semibold tracking-[-0.01em] text-neutral-950 md:text-[44px] md:leading-[53px]">
              Welcome Back
            </h1>
          </div>

          <div className="flex flex-col gap-6">
            <Field label="Email" placeholder="designer@example.com" type="email" />
            <Field label="Password" placeholder="********" type="password" />
            <AuthButton>Sign In</AuthButton>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-[#d1d1d1]" />
            <span className="text-[18px] leading-[29px] text-[#888888]">or</span>
            <span className="h-px flex-1 bg-[#d1d1d1]" />
          </div>
          <SocialRow />
        </div>

        <p className="flex justify-center gap-1 text-[16px] leading-[26px]">
          <span className="text-[#888888]">New user?</span>
          <Link href="/register" className="text-primary-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
