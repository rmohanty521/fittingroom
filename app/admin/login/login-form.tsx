"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message.toLowerCase());
      setLoading(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        required
        autoComplete="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-transparent border-b border-bone/30 py-2 text-center text-bone placeholder:text-bone/30 focus:outline-none focus:border-bone"
      />
      <input
        type="password"
        required
        autoComplete="current-password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-transparent border-b border-bone/30 py-2 text-center text-bone placeholder:text-bone/30 focus:outline-none focus:border-bone"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 py-2 text-xs tracking-[0.3em] lowercase text-bone/70 hover:text-bone transition-colors disabled:opacity-60"
      >
        {loading ? "…" : "enter"}
      </button>
      {error && (
        <p className="text-xs tracking-wider lowercase text-bone/50 text-center">
          {error}
        </p>
      )}
    </form>
  );
}
