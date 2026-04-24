"use client";

import { useState } from "react";
import { config } from "@/config";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setMessage("invalid email.");
      return;
    }

    setStatus("submitting");
    setMessage(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6">
        <p className="text-2xl text-bone">{config.success.title}</p>
        <p className="mt-2 text-sm text-bone/50 tracking-wider">
          {config.success.body}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <div className="relative border-b border-bone/30 focus-within:border-bone transition-colors">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          aria-label="email"
          placeholder={config.hero.placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage(null);
            }
          }}
          disabled={status === "submitting"}
          className="w-full bg-transparent py-3 pr-20 text-center text-bone placeholder:text-bone/30 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-xs tracking-[0.3em] lowercase text-bone/60 hover:text-bone transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "…" : config.hero.cta}
        </button>
      </div>
      {status === "error" && message && (
        <p className="mt-4 text-xs tracking-wider lowercase text-bone/50">
          {message}
        </p>
      )}
    </form>
  );
}
