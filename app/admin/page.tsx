import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminDashboard, type WaitlistRow } from "./dashboard";
import { config } from "@/config";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data, error } = await supabase
    .from("waitlist")
    .select("id, email, discount_code, code_used, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen px-6 py-10">
        <p className="text-red-700">Error loading waitlist: {error.message}</p>
      </main>
    );
  }

  const rows = (data ?? []) as WaitlistRow[];

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const recentCount = rows.filter(
    (r) => new Date(r.created_at).getTime() >= sevenDaysAgo,
  ).length;

  return (
    <AdminDashboard
      brand={config.brandName}
      userEmail={user.email ?? ""}
      rows={rows}
      total={rows.length}
      last7Days={recentCount}
    />
  );
}
