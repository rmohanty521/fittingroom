import { listListings, type Listing } from "@/lib/listings";
import { ListingCard } from "@/components/listing-card";

const CATEGORIES: Array<Listing["category"] | "all"> = [
  "all",
  "outerwear",
  "tops",
  "bottoms",
  "footwear",
  "accessories",
];

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const all = listListings();
  const category = searchParams.category;
  const filtered =
    category && category !== "all"
      ? all.filter((l) => l.category === category)
      : all;

  return (
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="mb-12 sm:mb-16 max-w-2xl">
        <h1 className="text-3xl sm:text-5xl tracking-tight lowercase text-bone">
          the catalog
        </h1>
        <p className="mt-4 text-base tracking-wider lowercase text-bone/50">
          archival pieces, sourced from private collectors. rented by the week.
        </p>
      </div>

      <nav className="mb-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-bone/10 pb-4">
        {CATEGORIES.map((c) => {
          const active = (category ?? "all") === c;
          const href = c === "all" ? "/shop" : `/shop?category=${c}`;
          return (
            <a
              key={c}
              href={href}
              className={`text-sm tracking-[0.3em] lowercase transition ${
                active ? "text-bone" : "text-bone/40 hover:text-bone/70"
              }`}
            >
              {c}
            </a>
          );
        })}
      </nav>

      {filtered.length === 0 ? (
        <p className="text-base tracking-wider lowercase text-bone/40">
          nothing here yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
