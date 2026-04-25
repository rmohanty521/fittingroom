import Link from "next/link";
import { config } from "@/config";
import { WaitlistForm } from "@/components/waitlist-form";
import { Aura, GrainOverlay, Vignette } from "@/components/graphics";
import { DevCodeGate } from "@/components/dev-code-gate";
import { isPreviewUnlocked } from "@/lib/preview-gate";

export default function HomePage({
  searchParams,
}: {
  searchParams?: { dev?: string };
}) {
  const unlocked = isPreviewUnlocked();
  const denied = searchParams?.dev === "denied";

  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-bone">
      <Aura />

      {unlocked && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
          <Link
            href="/shop"
            className="border border-bone/20 bg-void/60 px-4 py-2 text-[10px] tracking-[0.3em] lowercase text-bone/60 backdrop-blur hover:border-bone/50 hover:text-bone transition"
          >
            view as customer →
          </Link>
          <Link
            href="/seller"
            className="border border-bone/20 bg-void/60 px-4 py-2 text-[10px] tracking-[0.3em] lowercase text-bone/60 backdrop-blur hover:border-bone/50 hover:text-bone transition"
          >
            view as seller →
          </Link>
        </div>
      )}

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 sm:px-10 py-6">
          <span className="text-sm tracking-[0.3em] lowercase text-bone/70">
            {config.brandName}
          </span>
          <span className="text-xs tracking-[0.3em] lowercase text-bone/40">
            001
          </span>
        </header>

        <section className="flex-1 flex items-center justify-center px-6 sm:px-10">
          <div className="w-full max-w-xl text-center">
            <h1 className="text-5xl sm:text-7xl leading-[1.05] tracking-tight text-bone">
              {config.hero.title}
            </h1>
            <p className="mt-6 text-sm sm:text-base text-bone/50 tracking-wider">
              {config.hero.subtitle}
            </p>
            <p className="mt-3 text-xs sm:text-sm text-bone/40 tracking-wider">
              sign up for {config.waitlist.discountPercent}% early bird discount.
            </p>
            <div className="mt-12">
              <WaitlistForm />
            </div>
          </div>
        </section>

        <footer className="px-6 sm:px-10 py-6 flex items-center justify-between text-xs tracking-[0.3em] lowercase text-bone/30">
          <span>mmxxvi</span>
          <DevCodeGate denied={denied} />
        </footer>
      </div>

      <Vignette />
      <GrainOverlay />
    </main>
  );
}
