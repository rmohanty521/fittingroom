import Link from "next/link";
import { notFound } from "next/navigation";
import { getListing, listListings } from "@/lib/listings";

export function generateStaticParams() {
  return listListings().map((l) => ({ id: l.id }));
}

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = getListing(params.id);
  if (!listing) notFound();

  const heroBg = listing.images[0] ?? "#1a1a1a";

  return (
    <div className="px-6 sm:px-10 py-10 sm:py-16">
      <Link
        href="/shop"
        className="inline-block mb-10 text-sm tracking-[0.3em] lowercase text-bone/40 hover:text-bone/80 transition"
      >
        ← catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-3">
          <div
            className="relative aspect-[3/4] w-full border border-bone/10 flex items-center justify-center"
            style={{ background: heroBg }}
          >
            <span className="text-sm tracking-[0.4em] lowercase text-bone/30">
              {listing.designer}
            </span>
          </div>
          {listing.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {listing.images.slice(1).map((bg, i) => (
                <div
                  key={i}
                  className="aspect-square border border-bone/10"
                  style={{ background: bg }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-32 self-start space-y-8">
          <div>
            <p className="text-sm tracking-[0.3em] lowercase text-bone/40">
              {listing.era}
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight lowercase text-bone">
              {listing.designer}
            </h1>
            <p className="mt-2 text-lg tracking-wider lowercase text-bone/60">
              {listing.title}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-y-4 border-y border-bone/10 py-6 text-sm tracking-[0.2em] lowercase">
            <dt className="text-bone/40">size</dt>
            <dd className="text-bone/80">{listing.size}</dd>
            <dt className="text-bone/40">condition</dt>
            <dd className="text-bone/80">{listing.condition}</dd>
            <dt className="text-bone/40">category</dt>
            <dd className="text-bone/80">{listing.category}</dd>
            <dt className="text-bone/40">retail value</dt>
            <dd className="text-bone/80">
              ${listing.retailValue.toLocaleString()}
            </dd>
            <dt className="text-bone/40">seller</dt>
            <dd className="text-bone/80">{listing.seller}</dd>
          </dl>

          <p className="text-base tracking-wider lowercase text-bone/70 leading-relaxed">
            {listing.description}
          </p>

          <div className="space-y-4 border-t border-bone/10 pt-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm tracking-[0.3em] lowercase text-bone/40">
                weekly
              </span>
              <span className="text-3xl tracking-tight lowercase text-bone">
                ${listing.pricePerWeek}
              </span>
            </div>
            <button
              type="button"
              disabled={!listing.available}
              className="w-full border border-bone/30 py-4 text-sm tracking-[0.3em] lowercase text-bone hover:bg-bone hover:text-void transition disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-bone disabled:cursor-not-allowed"
            >
              {listing.available ? "request to rent" : "currently rented"}
            </button>
            <p className="text-xs tracking-[0.3em] lowercase text-bone/30 text-center">
              dev preview · rental flow not yet wired
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
