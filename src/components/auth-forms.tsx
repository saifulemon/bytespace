"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthButton, Field, SocialRow } from "@/components/auth";
import { useToast } from "@/components/feedback";

type Errors = Partial<Record<"name" | "email" | "password", string>>;

const emailError = (value: string) => {
  if (!value.trim()) return "Enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address.";
  return "";
};

const passwordError = (value: string) => {
  if (!value) return "Enter your password.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return "";
};

export function SignInForm() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = { email: emailError(email), password: passwordError(password) };
    setErrors(next);
    if (next.email || next.password) return;
    toast("Welcome back! You're signed in.", "success");
    router.push("/");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={submit} noValidate data-testid="signin-form">
      <Field
        label="Email"
        placeholder="designer@example.com"
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(v) => {
          setEmail(v);
          if (errors.email) setErrors((e) => ({ ...e, email: "" }));
        }}
        error={errors.email}
      />
      <Field
        label="Password"
        placeholder="********"
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(v) => {
          setPassword(v);
          if (errors.password) setErrors((e) => ({ ...e, password: "" }));
        }}
        error={errors.password}
      />
      <AuthButton type="submit" data-testid="signin-submit">
        Sign In
      </AuthButton>
    </form>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {
      name: name.trim() ? "" : "Enter your full name.",
      email: emailError(email),
      password: passwordError(password),
    };
    setErrors(next);
    if (next.name || next.email || next.password) return;
    toast(`Account created — welcome to ByteSpace, ${name.trim().split(" ")[0]}!`, "success");
    router.push("/");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={submit} noValidate data-testid="signup-form">
      <Field
        label="Full Name"
        placeholder="Jamie Davis"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(v) => {
          setName(v);
          if (errors.name) setErrors((e) => ({ ...e, name: "" }));
        }}
        error={errors.name}
      />
      <Field
        label="Email"
        placeholder="designer@example.com"
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(v) => {
          setEmail(v);
          if (errors.email) setErrors((e) => ({ ...e, email: "" }));
        }}
        error={errors.email}
      />
      <Field
        label="Password"
        placeholder="********"
        type="password"
        name="password"
        autoComplete="new-password"
        value={password}
        onChange={(v) => {
          setPassword(v);
          if (errors.password) setErrors((e) => ({ ...e, password: "" }));
        }}
        error={errors.password}
      />
      <AuthButton type="submit" data-testid="signup-submit">
        Continue
      </AuthButton>
    </form>
  );
}

export function SocialButtons() {
  const toast = useToast();
  return (
    <SocialRow
      onSelect={(provider) =>
        toast(`${provider} sign-in isn't connected in this demo — use the form instead.`)
      }
    />
  );
}
