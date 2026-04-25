import Link from "next/link";
import { ListingForm } from "@/components/listing-form";
import { getCurrentSeller } from "@/lib/seller-context";
import { createListingAction } from "../actions";

export default function NewListingPage() {
  const seller = getCurrentSeller();

  return (
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <Link
        href="/seller"
        className="inline-block mb-10 text-sm tracking-[0.3em] lowercase text-bone/40 hover:text-bone/80 transition"
      >
        ← inventory
      </Link>
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl tracking-tight lowercase text-bone">
          new listing
        </h1>
        <p className="mt-2 text-sm tracking-[0.3em] lowercase text-bone/40">
          uploading as {seller}
        </p>
      </div>
      <ListingForm action={createListingAction} submitLabel="publish to catalog" />
    </div>
  );
}
