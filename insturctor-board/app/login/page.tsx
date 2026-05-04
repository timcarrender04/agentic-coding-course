"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };

      setError(body.error ?? "request failed");

      return;
    }

    router.replace("/student");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[var(--color-board)] flex items-center justify-center p-6">
      <form
        className="w-full max-w-sm bg-[var(--color-cockpit)] text-white p-6 rounded-sm shadow-lg space-y-4"
        onSubmit={onSubmit}
      >
        <h1 className="text-xl font-bold font-display text-[var(--color-primary-soft)]">
          {mode === "login" ? "Sign in" : "Create account"}
        </h1>

        <label className="block space-y-1">
          <span className="text-xs text-slate-300">Email</span>
          <input
            required
            autoComplete="email"
            className="w-full px-3 py-2 rounded-sm bg-[var(--color-ink)] text-white outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block space-y-1">
          <span className="text-xs text-slate-300">Password</span>
          <input
            required
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            className="w-full px-3 py-2 rounded-sm bg-[var(--color-ink)] text-white outline-none"
            minLength={8}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error ? (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <button
          className="w-full py-2 rounded-sm bg-[var(--color-primary-soft)] text-[var(--color-ink)] font-bold disabled:opacity-50"
          disabled={submitting}
          type="submit"
        >
          {submitting
            ? "..."
            : mode === "login"
              ? "Sign in"
              : "Create account"}
        </button>

        <button
          className="w-full text-xs text-slate-300 hover:text-white"
          type="button"
          onClick={() => {
            setError(null);
            setMode(mode === "login" ? "register" : "login");
          }}
        >
          {mode === "login"
            ? "Need an account? Register"
            : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}
