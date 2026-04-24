import type { Metadata } from "next";
import { config } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${config.brandName} — ${config.hero.title}`,
  description: config.hero.subtitle,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
