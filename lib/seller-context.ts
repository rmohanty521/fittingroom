import { cookies } from "next/headers";
import { listSellers } from "./listings";

const COOKIE = "dev_seller";

// Dev-only stand-in for "which seller am I logged in as?" — replace with auth.uid()
// once partner sellers have real Supabase accounts.
export function getCurrentSeller(): string {
  const fromCookie = cookies().get(COOKIE)?.value;
  const sellers = listSellers();
  if (fromCookie && sellers.includes(fromCookie)) return fromCookie;
  return sellers[0] ?? "@archive.atelier";
}

export function setCurrentSellerCookie(seller: string) {
  cookies().set(COOKIE, seller, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}
