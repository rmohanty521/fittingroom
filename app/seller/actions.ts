"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addListing,
  deleteListing,
  updateListing,
  type Listing,
  type ListingInput,
} from "@/lib/listings";
import { getCurrentSeller, setCurrentSellerCookie } from "@/lib/seller-context";

const CONDITIONS: Listing["condition"][] = ["mint", "excellent", "good", "worn"];
const CATEGORIES: Listing["category"][] = [
  "outerwear",
  "tops",
  "bottoms",
  "footwear",
  "accessories",
];

function parseInput(form: FormData, seller: string): ListingInput {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const designer = get("designer");
  const title = get("title");
  const era = get("era");
  const size = get("size");
  const condition = get("condition") as Listing["condition"];
  const category = get("category") as Listing["category"];
  const description = get("description");
  const pricePerWeek = Number(get("pricePerWeek"));
  const retailValue = Number(get("retailValue"));
  const image = get("image") || "#1a1a1a";
  const available = form.get("available") === "on";

  if (!designer) throw new Error("designer is required");
  if (!title) throw new Error("title is required");
  if (!CONDITIONS.includes(condition)) throw new Error("invalid condition");
  if (!CATEGORIES.includes(category)) throw new Error("invalid category");
  if (!Number.isFinite(pricePerWeek) || pricePerWeek <= 0)
    throw new Error("price must be a positive number");
  if (!Number.isFinite(retailValue) || retailValue < 0)
    throw new Error("retail value must be a non-negative number");

  return {
    designer,
    title,
    era,
    size,
    condition,
    category,
    description,
    pricePerWeek,
    retailValue,
    images: [image],
    seller,
    available,
  };
}

export async function createListingAction(form: FormData) {
  const seller = getCurrentSeller();
  const input = parseInput(form, seller);
  addListing(input);
  revalidatePath("/seller");
  revalidatePath("/shop");
  redirect("/seller");
}

export async function updateListingAction(id: string, form: FormData) {
  const seller = getCurrentSeller();
  const input = parseInput(form, seller);
  updateListing(id, input);
  revalidatePath("/seller");
  revalidatePath("/shop");
  revalidatePath(`/shop/${id}`);
  redirect("/seller");
}

export async function deleteListingAction(id: string) {
  deleteListing(id);
  revalidatePath("/seller");
  revalidatePath("/shop");
}

export async function toggleAvailabilityAction(id: string, available: boolean) {
  updateListing(id, { available });
  revalidatePath("/seller");
  revalidatePath("/shop");
  revalidatePath(`/shop/${id}`);
}

export async function switchSellerAction(form: FormData) {
  const seller = String(form.get("seller") ?? "").trim();
  if (seller) {
    setCurrentSellerCookie(seller);
    revalidatePath("/seller");
  }
}
