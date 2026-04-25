import Link from "next/link";
import { listListingsBySeller, listSellers } from "@/lib/listings";
import { getCurrentSeller } from "@/lib/seller-context";
import {
  deleteListingAction,
  switchSellerAction,
  toggleAvailabilityAction,
} from "./actions";

export default function SellerDashboard() {
  const currentSeller = getCurrentSeller();
  const sellers = listSellers();
  const myListings = listListingsBySeller(currentSeller);

  const totalValue = myListings.reduce((s, l) => s + l.retailValue, 0);
  const weeklyRevenue = myListings
    .filter((l) => l.available)
    .reduce((s, l) => s + l.pricePerWeek, 0);
  const availableCount = myListings.filter((l) => l.available).length;

  return (
    <div className="px-6 sm:px-10 py-12 sm:py-16 space-y-12">
      <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <p className="text-sm tracking-[0.3em] lowercase text-bone/40">
            seller portal
          </p>
          <h1 className="mt-2 text-3xl sm:text-5xl tracking-tight lowercase text-bone">
            your listings
          </h1>
        </div>

        <form action={switchSellerAction} className="flex items-end gap-3">
          <label className="space-y-2">
            <span className="block text-xs tracking-[0.3em] lowercase text-bone/40">
              managing as
            </span>
            <select
              name="seller"
              defaultValue={currentSeller}
              className="bg-transparent border-b border-bone/20 py-2 pr-6 text-base tracking-wider lowercase text-bone focus:border-bone/60 focus:outline-none cursor-pointer"
            >
              {sellers.map((s) => (
                <option key={s} value={s} className="bg-void">
                  {s}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="text-xs tracking-[0.3em] lowercase text-bone/60 hover:text-bone transition pb-2"
          >
            switch →
          </button>
        </form>
      </section>

      <section className="grid grid-cols-3 gap-4 sm:gap-8 border-y border-bone/10 py-6">
        <Stat label="active" value={String(availableCount)} hint={`of ${myListings.length}`} />
        <Stat label="weekly potential" value={`$${weeklyRevenue.toLocaleString()}`} hint="if all rented" />
        <Stat label="catalog value" value={`$${totalValue.toLocaleString()}`} hint="retail" />
      </section>

      <section className="flex items-center justify-between">
        <h2 className="text-sm tracking-[0.3em] lowercase text-bone/60">
          inventory ({myListings.length})
        </h2>
        <Link
          href="/seller/new"
          className="border border-bone/30 px-5 py-2 text-xs tracking-[0.3em] lowercase text-bone hover:bg-bone hover:text-void transition"
        >
          + new listing
        </Link>
      </section>

      {myListings.length === 0 ? (
        <div className="border border-dashed border-bone/15 py-20 text-center">
          <p className="text-base tracking-wider lowercase text-bone/50">
            no listings yet.
          </p>
          <Link
            href="/seller/new"
            className="mt-4 inline-block text-sm tracking-[0.3em] lowercase text-bone/70 hover:text-bone transition"
          >
            upload your first piece →
          </Link>
        </div>
      ) : (
        <div className="space-y-px">
          <div className="hidden sm:grid grid-cols-[80px_2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3 text-xs tracking-[0.3em] lowercase text-bone/30 border-b border-bone/10">
            <span></span>
            <span>piece</span>
            <span>era · size</span>
            <span>price/wk</span>
            <span>status</span>
            <span></span>
          </div>
          {myListings.map((l) => (
            <div
              key={l.id}
              className="grid grid-cols-[80px_1fr_auto] sm:grid-cols-[80px_2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-4 items-center border-b border-bone/5 hover:bg-bone/[0.02] transition"
            >
              <div
                className="aspect-[3/4] w-16 border border-bone/10"
                style={{ background: l.images[0] ?? "#1a1a1a" }}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-base tracking-wider lowercase text-bone/90 truncate">
                  {l.designer}
                </p>
                <p className="text-sm tracking-wider lowercase text-bone/50 truncate">
                  {l.title}
                </p>
              </div>
              <p className="hidden sm:block text-sm tracking-[0.2em] lowercase text-bone/60">
                {l.era} · {l.size}
              </p>
              <p className="hidden sm:block text-sm tracking-[0.2em] lowercase text-bone/80">
                ${l.pricePerWeek}
              </p>
              <div className="hidden sm:flex items-center gap-2">
                <form action={toggleAvailabilityAction.bind(null, l.id, !l.available)}>
                  <button
                    type="submit"
                    className={`text-xs tracking-[0.3em] lowercase border px-2 py-1 transition ${
                      l.available
                        ? "border-bone/30 text-bone/80 hover:bg-bone/10"
                        : "border-bone/15 text-bone/40 hover:text-bone/70"
                    }`}
                    title={l.available ? "mark as rented/unavailable" : "mark as available"}
                  >
                    {l.available ? "available" : "off-market"}
                  </button>
                </form>
              </div>
              <div className="flex items-center gap-3 justify-self-end">
                <Link
                  href={`/seller/${l.id}/edit`}
                  className="text-xs tracking-[0.3em] lowercase text-bone/60 hover:text-bone transition"
                >
                  edit
                </Link>
                <form action={deleteListingAction.bind(null, l.id)}>
                  <button
                    type="submit"
                    className="text-xs tracking-[0.3em] lowercase text-bone/30 hover:text-bone/80 transition"
                  >
                    delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <p className="text-xs tracking-[0.3em] lowercase text-bone/40">{label}</p>
      <p className="mt-2 text-2xl sm:text-3xl tracking-tight lowercase text-bone">{value}</p>
      {hint && (
        <p className="mt-1 text-xs tracking-[0.3em] lowercase text-bone/30">{hint}</p>
      )}
    </div>
  );
}
