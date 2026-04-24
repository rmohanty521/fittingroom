"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type WaitlistRow = {
  id: string;
  email: string;
  discount_code: string;
  code_used: boolean;
  created_at: string;
};

type Props = {
  brand: string;
  userEmail: string;
  rows: WaitlistRow[];
  total: number;
  last7Days: number;
};

function toCsv(rows: WaitlistRow[]): string {
  const header = ["email", "discount_code", "code_used", "created_at"];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        escape(r.email),
        escape(r.discount_code),
        String(r.code_used),
        escape(r.created_at),
      ].join(","),
    );
  }
  return lines.join("\n");
}

export function AdminDashboard({
  brand,
  userEmail,
  rows,
  total,
  last7Days,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.email.toLowerCase().includes(q) ||
        r.discount_code.toLowerCase().includes(q),
    );
  }, [rows, query]);

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  function handleExport() {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-void text-bone px-6 sm:px-10 py-6">
      <header className="flex items-center justify-between mb-10 pb-5 border-b border-bone/10">
        <p className="text-xs tracking-[0.3em] lowercase text-bone/60">
          {brand} / admin
        </p>
        <div className="flex items-center gap-5 text-xs tracking-[0.25em] lowercase text-bone/40">
          <span className="hidden sm:inline">{userEmail}</span>
          <button
            onClick={handleSignOut}
            className="hover:text-bone transition-colors"
          >
            sign out
          </button>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 max-w-md mb-10">
        <Stat label="total" value={total} />
        <Stat label="last 7d" value={last7Days} />
      </section>

      <section className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent border-b border-bone/20 py-2 text-bone placeholder:text-bone/30 focus:outline-none focus:border-bone"
        />
        <button
          onClick={handleExport}
          className="text-xs tracking-[0.3em] lowercase text-bone/60 hover:text-bone transition-colors"
        >
          export csv
        </button>
      </section>

      <section className="overflow-x-auto border border-bone/10">
        <table className="w-full text-sm">
          <thead className="text-left text-bone/40 text-xs tracking-[0.2em] lowercase border-b border-bone/10">
            <tr>
              <th className="px-4 py-3 font-normal">email</th>
              <th className="px-4 py-3 font-normal">code</th>
              <th className="px-4 py-3 font-normal">used</th>
              <th className="px-4 py-3 font-normal">date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-bone/40 text-xs tracking-wider lowercase">
                  nothing here.
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-bone/5">
                <td className="px-4 py-3 text-bone">{r.email}</td>
                <td className="px-4 py-3 text-xs text-bone/70">
                  {r.discount_code}
                </td>
                <td className="px-4 py-3 text-xs lowercase text-bone/40">
                  {r.code_used ? "yes" : "no"}
                </td>
                <td className="px-4 py-3 text-xs text-bone/40">
                  {new Date(r.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-3 text-xs tracking-[0.2em] lowercase text-bone/40">
        {filtered.length} / {total}
      </p>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-bone/10 p-5">
      <p className="text-xs lowercase tracking-[0.2em] text-bone/40">{label}</p>
      <p className="mt-2 text-4xl text-bone">{value}</p>
    </div>
  );
}
