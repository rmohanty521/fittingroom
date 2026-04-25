import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const PREVIEW_COOKIE = "dev_preview";

// Hardcoded by design. Rotate by editing this constant. Low-security preview gate —
// see memory `project_archiveaccess_preview_gate.md` for context.
export const PREVIEW_CODE = "FFFgetin3";

export function isPreviewUnlocked(): boolean {
  return cookies().get(PREVIEW_COOKIE)?.value === PREVIEW_CODE;
}

export function requirePreview() {
  if (!isPreviewUnlocked()) notFound();
}
