import Link from "next/link";
import type { Listing } from "@/lib/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  const placeholder = listing.images[0] ?? "#1a1a1a";

  return (
    <Link
      href={`/shop/${listing.id}`}
      className="group block"
      aria-label={`${listing.designer} ${listing.title}`}
    >
      <div
        className="relative aspect-[3/4] w-full overflow-hidden border border-bone/10 transition group-hover:border-bone/30"
        style={{ background: placeholder }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs tracking-[0.4em] lowercase text-bone/30">
            {listing.designer}
          </span>
        </div>
        {!listing.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-void/70 backdrop-blur-sm">
            <span className="text-sm tracking-[0.3em] lowercase text-bone/70">
              rented
            </span>
          </div>
        )}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs tracking-[0.3em] lowercase text-bone/40">
          <span>{listing.era}</span>
          <span>{listing.size}</span>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-base tracking-wider lowercase text-bone/90 truncate">
            {listing.designer}
          </p>
          <p className="text-sm tracking-[0.2em] lowercase text-bone/60 whitespace-nowrap">
            ${listing.pricePerWeek}/wk
          </p>
        </div>
        <p className="text-sm tracking-wider lowercase text-bone/50 truncate">
          {listing.title}
        </p>
      </div>
    </Link>
  );
}
