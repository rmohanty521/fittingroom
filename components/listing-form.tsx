import type { Listing } from "@/lib/listings";

const CONDITIONS: Listing["condition"][] = ["mint", "excellent", "good", "worn"];
const CATEGORIES: Listing["category"][] = [
  "outerwear",
  "tops",
  "bottoms",
  "footwear",
  "accessories",
];

const inputClass =
  "w-full bg-transparent border-b border-bone/20 py-3 text-base tracking-wider lowercase text-bone placeholder:text-bone/30 focus:border-bone/60 focus:outline-none transition";
const labelClass = "block text-xs tracking-[0.3em] lowercase text-bone/50";

export function ListingForm({
  action,
  listing,
  submitLabel,
}: {
  action: (form: FormData) => void | Promise<void>;
  listing?: Listing;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-10 max-w-2xl">
      <fieldset className="space-y-6">
        <legend className="mb-4 text-sm tracking-[0.3em] lowercase text-bone/60">
          identity
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="space-y-2">
            <span className={labelClass}>designer</span>
            <input
              name="designer"
              type="text"
              required
              defaultValue={listing?.designer}
              placeholder="Helmut Lang"
              className={inputClass}
            />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>era</span>
            <input
              name="era"
              type="text"
              defaultValue={listing?.era}
              placeholder="AW 2003"
              className={inputClass}
            />
          </label>
          <label className="space-y-2 sm:col-span-2">
            <span className={labelClass}>title</span>
            <input
              name="title"
              type="text"
              required
              defaultValue={listing?.title}
              placeholder="bondage cargo trouser"
              className={inputClass}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-4 text-sm tracking-[0.3em] lowercase text-bone/60">
          specs
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <label className="space-y-2">
            <span className={labelClass}>size</span>
            <input
              name="size"
              type="text"
              defaultValue={listing?.size}
              placeholder="48 / M / 32"
              className={inputClass}
            />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>category</span>
            <select
              name="category"
              required
              defaultValue={listing?.category ?? "outerwear"}
              className={`${inputClass} cursor-pointer`}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-void">
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className={labelClass}>condition</span>
            <select
              name="condition"
              required
              defaultValue={listing?.condition ?? "good"}
              className={`${inputClass} cursor-pointer`}
            >
              {CONDITIONS.map((c) => (
                <option key={c} value={c} className="bg-void">
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-4 text-sm tracking-[0.3em] lowercase text-bone/60">
          pricing
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="space-y-2">
            <span className={labelClass}>price per week (usd)</span>
            <input
              name="pricePerWeek"
              type="number"
              min="1"
              step="1"
              required
              defaultValue={listing?.pricePerWeek}
              placeholder="120"
              className={inputClass}
            />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>retail value (usd)</span>
            <input
              name="retailValue"
              type="number"
              min="0"
              step="1"
              required
              defaultValue={listing?.retailValue}
              placeholder="2000"
              className={inputClass}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-4 text-sm tracking-[0.3em] lowercase text-bone/60">
          description
        </legend>
        <label className="space-y-2 block">
          <span className={labelClass}>condition notes &amp; provenance</span>
          <textarea
            name="description"
            rows={4}
            defaultValue={listing?.description}
            placeholder="brief notes on condition, fit, era, anything a renter should know."
            className={`${inputClass} resize-y`}
          />
        </label>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-4 text-sm tracking-[0.3em] lowercase text-bone/60">
          image
        </legend>
        <label className="space-y-2 block">
          <span className={labelClass}>placeholder shade (hex)</span>
          <input
            name="image"
            type="text"
            defaultValue={listing?.images[0] ?? "#1a1a1a"}
            placeholder="#1a1a1a"
            className={inputClass}
          />
          <span className="block text-xs tracking-[0.3em] lowercase text-bone/30 mt-2">
            real photo upload coming soon — pick a placeholder shade for now.
          </span>
        </label>
      </fieldset>

      <fieldset>
        <label className="inline-flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="available"
            defaultChecked={listing?.available ?? true}
            className="h-4 w-4 accent-bone"
          />
          <span className="text-sm tracking-[0.3em] lowercase text-bone/60">
            available to rent
          </span>
        </label>
      </fieldset>

      <div className="pt-6 border-t border-bone/10">
        <button
          type="submit"
          className="border border-bone/30 px-8 py-4 text-sm tracking-[0.3em] lowercase text-bone hover:bg-bone hover:text-void transition"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
