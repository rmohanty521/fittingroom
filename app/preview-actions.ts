"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PREVIEW_CODE, PREVIEW_COOKIE } from "@/lib/preview-gate";

export async function unlockPreviewAction(formData: FormData) {
  const input = String(formData.get("code") ?? "").trim();

  if (input !== PREVIEW_CODE) {
    redirect("/?dev=denied");
  }

  cookies().set(PREVIEW_COOKIE, PREVIEW_CODE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/");
}

export async function lockPreviewAction() {
  cookies().delete(PREVIEW_COOKIE);
  redirect("/");
}
