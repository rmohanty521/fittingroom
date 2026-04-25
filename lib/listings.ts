export type Listing = {
  id: string;
  designer: string;
  title: string;
  era: string;
  size: string;
  condition: "mint" | "excellent" | "good" | "worn";
  pricePerWeek: number;
  retailValue: number;
  category: "outerwear" | "tops" | "bottoms" | "footwear" | "accessories";
  description: string;
  images: string[];
  seller: string;
  available: boolean;
};

// TODO: replace with Supabase query once `listings` table is provisioned (see supabase/listings.sql).
// Kept inline so the dev preview boots without DB dependency.
export const mockListings: Listing[] = [
  {
    id: "raf-riot-bomber-01",
    designer: "Raf Simons",
    title: "Riot Riot Riot bomber",
    era: "AW 2001",
    size: "48",
    condition: "good",
    pricePerWeek: 280,
    retailValue: 9500,
    category: "outerwear",
    description:
      "MA-1 silhouette in olive nylon. Patches and badges intact. From the seminal AW01 collection. Light fading at cuffs consistent with age.",
    images: ["#1a1a1a", "#2a2a2a"],
    seller: "@archive.atelier",
    available: true,
  },
  {
    id: "margiela-tabi-boot",
    designer: "Maison Margiela",
    title: "tabi ankle boot",
    era: "2019",
    size: "42",
    condition: "excellent",
    pricePerWeek: 90,
    retailValue: 1300,
    category: "footwear",
    description:
      "Black calfskin tabi with 3cm heel. Cleft toe. Very minor sole wear, leather supple.",
    images: ["#161616"],
    seller: "@archive.atelier",
    available: true,
  },
  {
    id: "helmut-lang-painter-pant",
    designer: "Helmut Lang",
    title: "painter trouser",
    era: "SS 1998",
    size: "32",
    condition: "good",
    pricePerWeek: 75,
    retailValue: 1100,
    category: "bottoms",
    description:
      "Bone cotton painter trouser, paint-effect printing throughout. Classic Lang archive piece. One small repaired hem on left leg.",
    images: ["#1f1f1f"],
    seller: "@vault.nyc",
    available: true,
  },
  {
    id: "yohji-wool-overcoat",
    designer: "Yohji Yamamoto",
    title: "asymmetric wool overcoat",
    era: "AW 2003",
    size: "M",
    condition: "excellent",
    pricePerWeek: 140,
    retailValue: 3200,
    category: "outerwear",
    description:
      "Heavy black wool, asymmetric closure, oversized lapels. Pour Homme line. No flaws.",
    images: ["#0e0e0e"],
    seller: "@vault.nyc",
    available: true,
  },
  {
    id: "cdg-paper-doll-dress",
    designer: "Comme des Garçons",
    title: "paper doll dress",
    era: "SS 2012",
    size: "S",
    condition: "mint",
    pricePerWeek: 220,
    retailValue: 4800,
    category: "tops",
    description:
      "Two-dimensional paper doll silhouette in white cotton. Runway piece. Worn once.",
    images: ["#222222"],
    seller: "@dept.archive",
    available: true,
  },
  {
    id: "rick-owens-leather-bomber",
    designer: "Rick Owens",
    title: "blistered leather bomber",
    era: "AW 2014",
    size: "50",
    condition: "excellent",
    pricePerWeek: 180,
    retailValue: 4200,
    category: "outerwear",
    description:
      "Cracked black lambskin, ribbed cuffs, asymmetric zip. Mountain collection.",
    images: ["#181818"],
    seller: "@dept.archive",
    available: true,
  },
  {
    id: "issey-pleats-please-set",
    designer: "Issey Miyake",
    title: "pleats please two-piece",
    era: "1990s",
    size: "2",
    condition: "good",
    pricePerWeek: 65,
    retailValue: 800,
    category: "tops",
    description:
      "Permanent micro-pleat top and matching trouser. Deep aubergine. Light pilling at seams.",
    images: ["#1c1c1c"],
    seller: "@kioto.archive",
    available: true,
  },
  {
    id: "junya-patchwork-jacket",
    designer: "Junya Watanabe",
    title: "patchwork denim jacket",
    era: "SS 2008",
    size: "M",
    condition: "good",
    pricePerWeek: 110,
    retailValue: 1900,
    category: "outerwear",
    description:
      "Levi's collaboration. Indigo patchwork, contrast stitching. Faded naturally at shoulders.",
    images: ["#202020"],
    seller: "@kioto.archive",
    available: true,
  },
  {
    id: "margiela-replica-bag",
    designer: "Maison Margiela",
    title: "5AC replica tote",
    era: "2020",
    size: "medium",
    condition: "mint",
    pricePerWeek: 55,
    retailValue: 1900,
    category: "accessories",
    description:
      "Black grained calfskin, four-stitch detail. Includes dust bag.",
    images: ["#171717"],
    seller: "@bag.archive",
    available: true,
  },
  {
    id: "lang-bondage-pant",
    designer: "Helmut Lang",
    title: "bondage cargo trouser",
    era: "AW 2003",
    size: "30",
    condition: "excellent",
    pricePerWeek: 95,
    retailValue: 1600,
    category: "bottoms",
    description:
      "Black cotton, side zip, bondage strap detail. Iconic late-Lang silhouette.",
    images: ["#131313"],
    seller: "@archive.atelier",
    available: false,
  },
  {
    id: "undercover-graphic-tee",
    designer: "Undercover",
    title: "scab graphic tee",
    era: "SS 2003",
    size: "M",
    condition: "worn",
    pricePerWeek: 45,
    retailValue: 700,
    category: "tops",
    description:
      "Faded black cotton with hand-drawn graphic. Honest fading and a small mended pinhole at hem.",
    images: ["#191919"],
    seller: "@bag.archive",
    available: true,
  },
  {
    id: "prada-sport-shell",
    designer: "Prada Sport",
    title: "linea rossa shell jacket",
    era: "SS 2000",
    size: "L",
    condition: "good",
    pricePerWeek: 80,
    retailValue: 1200,
    category: "outerwear",
    description:
      "Slate grey nylon shell, red Linea Rossa tab. Y2K Prada Sport era.",
    images: ["#252525"],
    seller: "@vault.nyc",
    available: true,
  },
];

// In-memory store for dev-only seller mutations. Resets on dev server restart.
// TODO: replace with Supabase queries/mutations against the `listings` table.
const sellerOverrides = new Map<string, Listing>();
const deletedIds = new Set<string>();

export type ListingInput = Omit<Listing, "id">;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateId(designer: string, title: string): string {
  const base = [slugify(designer), slugify(title)].filter(Boolean).join("-") || "listing";
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}

function allListings(): Listing[] {
  const out: Listing[] = [];
  const seen = new Set<string>();
  for (const l of sellerOverrides.values()) {
    if (deletedIds.has(l.id)) continue;
    out.push(l);
    seen.add(l.id);
  }
  for (const l of mockListings) {
    if (deletedIds.has(l.id) || seen.has(l.id)) continue;
    out.push(l);
  }
  return out.sort((a, b) => a.designer.localeCompare(b.designer));
}

export function getListing(id: string): Listing | undefined {
  return allListings().find((l) => l.id === id);
}

export function listListings(): Listing[] {
  return allListings();
}

export function listListingsBySeller(seller: string): Listing[] {
  return allListings().filter((l) => l.seller === seller);
}

export function listSellers(): string[] {
  const set = new Set(allListings().map((l) => l.seller));
  return Array.from(set).sort();
}

export function addListing(input: ListingInput): Listing {
  const listing: Listing = { ...input, id: generateId(input.designer, input.title) };
  sellerOverrides.set(listing.id, listing);
  return listing;
}

export function updateListing(id: string, patch: Partial<ListingInput>): Listing | null {
  const current = getListing(id);
  if (!current) return null;
  const next: Listing = { ...current, ...patch, id };
  sellerOverrides.set(id, next);
  deletedIds.delete(id);
  return next;
}

export function deleteListing(id: string): boolean {
  if (!getListing(id)) return false;
  sellerOverrides.delete(id);
  deletedIds.add(id);
  return true;
}
