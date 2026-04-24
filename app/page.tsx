import { config } from "@/config";
import { WaitlistForm } from "@/components/waitlist-form";
import { Aura, GrainOverlay, Vignette } from "@/components/graphics";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-bone">
      <Aura />

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
          <span>—</span>
        </footer>
      </div>

      <Vignette />
      <GrainOverlay />
    </main>
  );
}
