import Link from "next/link";
import { requirePreview } from "@/lib/preview-gate";
import { config } from "@/config";
import { GrainOverlay } from "@/components/graphics";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  requirePreview();

  return (
    <main className="relative min-h-screen bg-void text-bone">
      <header className="sticky top-0 z-30 border-b border-bone/10 bg-void/80 backdrop-blur">
        <div className="flex items-center justify-between px-6 sm:px-10 py-5">
          <Link
            href="/shop"
            className="text-base tracking-[0.3em] lowercase text-bone/80 hover:text-bone transition"
          >
            {config.brandName}
          </Link>
          <nav className="flex items-center gap-6 text-sm tracking-[0.3em] lowercase text-bone/50">
            <Link href="/shop" className="hover:text-bone transition">
              catalog
            </Link>
            <Link
              href="/"
              className="hover:text-bone transition"
              title="back to public landing"
            >
              exit
            </Link>
          </nav>
        </div>
        <div className="px-6 sm:px-10 pb-2 text-xs tracking-[0.4em] lowercase text-bone/30">
          dev preview · not public
        </div>
      </header>

      <div className="relative z-10">{children}</div>

      <GrainOverlay />
    </main>
  );
}
