-- Listings schema for the rental catalog. Run after schema.sql.
-- Sellers are auth.users created via admin invite (Instagram partner sellers).

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  seller_id uuid references auth.users(id) on delete cascade,
  designer text not null,
  title text not null,
  era text,
  size text,
  condition text check (condition in ('mint', 'excellent', 'good', 'worn')),
  category text check (category in ('outerwear', 'tops', 'bottoms', 'footwear', 'accessories')),
  description text,
  price_per_week_cents integer not null check (price_per_week_cents >= 0),
  retail_value_cents integer check (retail_value_cents >= 0),
  images text[] default '{}',
  available boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists listings_seller_idx on listings(seller_id);
create index if not exists listings_available_idx on listings(available) where available = true;

alter table listings enable row level security;

drop policy if exists "public can read available" on listings;
create policy "public can read available"
  on listings for select
  using (available = true);

drop policy if exists "sellers manage own listings" on listings;
create policy "sellers manage own listings"
  on listings for all
  using (auth.uid() = seller_id)
  with check (auth.uid() = seller_id);
