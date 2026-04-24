import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { generateDiscountCode } from "@/lib/discount-code";
import { sendWaitlistEmail } from "@/lib/email";
import { config } from "@/config";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawEmail =
    typeof body === "object" && body && "email" in body
      ? (body as { email: unknown }).email
      : null;

  if (typeof rawEmail !== "string") {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const email = rawEmail.trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();

  const { data: existing, error: selectError } = await supabase
    .from("waitlist")
    .select("email, discount_code")
    .eq("email", email)
    .maybeSingle();

  if (selectError) {
    console.error("waitlist select error", selectError);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (existing) {
    return NextResponse.json({ ok: true, alreadyJoined: true });
  }

  let inserted: { email: string; discount_code: string } | null = null;
  for (let attempt = 0; attempt < 5 && !inserted; attempt++) {
    const discountCode = generateDiscountCode(config.waitlist.codePrefix);
    const { data, error } = await supabase
      .from("waitlist")
      .insert({ email, discount_code: discountCode })
      .select("email, discount_code")
      .single();

    if (!error) {
      inserted = data;
      break;
    }

    if (error.code === "23505") {
      // unique violation — either email (someone just signed up) or code (retry)
      const { data: dup } = await supabase
        .from("waitlist")
        .select("email, discount_code")
        .eq("email", email)
        .maybeSingle();
      if (dup) {
        return NextResponse.json({ ok: true, alreadyJoined: true });
      }
      continue;
    }

    console.error("waitlist insert error", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (!inserted) {
    return NextResponse.json(
      { error: "Could not generate a unique code" },
      { status: 500 },
    );
  }

  try {
    await sendWaitlistEmail(inserted.email, inserted.discount_code);
  } catch (err) {
    console.error("resend error", err);
    // row is saved — don't fail the signup, user can be re-emailed from admin later
  }

  return NextResponse.json({ ok: true });
}
