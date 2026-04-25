import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingForm } from "@/components/listing-form";
import { getListing } from "@/lib/listings";
import { updateListingAction } from "../../actions";

export default function EditListingPage({ params }: { params: { id: string } }) {
  const listing = getListing(params.id);
  if (!listing) notFound();

  const action = updateListingAction.bind(null, params.id);

  return (
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <Link
        href="/seller"
        className="inline-block mb-10 text-sm tracking-[0.3em] lowercase text-bone/40 hover:text-bone/80 transition"
      >
        ← inventory
      </Link>
      <div className="mb-12">
        <p className="text-sm tracking-[0.3em] lowercase text-bone/40">
          editing
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight lowercase text-bone">
          {listing.designer}
        </h1>
        <p className="mt-2 text-lg tracking-wider lowercase text-bone/60">
          {listing.title}
        </p>
      </div>
      <ListingForm action={action} listing={listing} submitLabel="save changes" />
    </div>
  );
}
