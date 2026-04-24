-- Run this in Supabase SQL editor once per project.

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  discount_code text unique not null,
  code_used boolean default false,
  created_at timestamptz default now()
);

alter table waitlist enable row level security;

drop policy if exists "anyone can insert" on waitlist;
create policy "anyone can insert"
  on waitlist for insert
  with check (true);

drop policy if exists "authenticated can read" on waitlist;
create policy "authenticated can read"
  on waitlist for select
  using (auth.role() = 'authenticated');
