import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "@/components/auth-forms";
import { AuthShell } from "@/components/auth";

export const metadata: Metadata = { title: "Create an Account — ByteSpace" };

export default function RegisterPage() {
  return (
    <AuthShell
      pbClass="lg:pb-[51px]"
      eyebrow="Sign up and come in"
      description="The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost"
    >
      <div className="flex flex-col gap-[122px]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <p className="text-[18px] leading-[29px] text-primary-800">Create an Account</p>
            <h1 className="font-heading text-[36px] leading-[43px] font-semibold tracking-[-0.01em] text-neutral-950 md:text-[44px] md:leading-[53px]">
              Welcome to ByteSpace
            </h1>
          </div>

          <SignUpForm />
        </div>

        <p className="flex justify-center gap-1 text-[16px] leading-[26px]">
          <span className="text-neutral-700">Already have an account?</span>
          <Link href="/login" className="text-primary-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
