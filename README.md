# FittedWeb

Minimal waitlist landing page + admin panel for a peer-to-peer designer archive clothing rental service. Built for demand validation — no payments, no inventory, just email capture with a discount code emailed back.

Stack: Next.js 14 (App Router) · TypeScript · Tailwind · Supabase (Postgres + Auth) · Resend · Vercel.

## Routes

- `/` — Landing page with email signup
- `/admin/login` — Admin sign-in
- `/admin` — Protected waitlist table + stats + CSV export
- `POST /api/signup` — Inserts the email, generates a unique `EARLY-XXXXXX` code, sends it via Resend

## Setup

### 1. Clone + install

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com), create a new project.
2. In **SQL Editor**, paste and run the contents of `supabase/schema.sql`. This creates the `waitlist` table and RLS policies (public insert, authenticated select).
3. In **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server-only, never expose)

### 3. Create the first admin user

Supabase has no public sign-up for admins; create the user manually:

1. Supabase Dashboard → **Authentication → Users → Add user → Create new user**.
2. Enter an email + password. Leave "Auto Confirm User" **on**.
3. That's your admin login for `/admin/login`.

Add more admins the same way. There is no self-serve registration.

### 4. Set up Resend

1. [resend.com](https://resend.com) → create an account.
2. Add and verify a sending domain (or use the Resend-provided onboarding domain while testing).
3. **API Keys** → create one → `RESEND_API_KEY`.
4. Set `RESEND_FROM_EMAIL` to a verified address, e.g. `Fitted <hello@yourdomain.com>`.

### 5. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

### 6. Run locally

```bash
npm run dev
```

Open http://localhost:3000 to see the landing page. Sign up with a real email to confirm the Resend flow. Then visit http://localhost:3000/admin/login to sign in.

## Editing copy

All user-facing strings live in `config.ts` at the repo root — hero title, subtitle, CTA, brand name, email subject, and the discount percentage. Edit there, no other files required.

## Deploy to Vercel

1. Push to a Git repo.
2. [vercel.com](https://vercel.com) → **Import Project** → select the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add all 5 env vars from `.env.local` to **Project Settings → Environment Variables**.
5. Deploy.

The middleware handles admin auth on every request to `/admin/*` so no extra Vercel config is needed.

### Supabase auth redirect URLs

In Supabase **Authentication → URL Configuration**, add your Vercel production URL (and preview URLs if you want) to **Site URL** / **Redirect URLs**. Not strictly required for email/password login, but prevents issues if you later enable magic links.

## Project layout

```
app/
  page.tsx                   landing
  api/signup/route.ts        signup endpoint
  admin/login/               admin login
  admin/page.tsx             admin dashboard (server)
  admin/dashboard.tsx        admin UI (client)
components/waitlist-form.tsx
lib/
  supabase/{client,server,middleware}.ts
  discount-code.ts
  email.ts
config.ts                    editable copy
middleware.ts                protects /admin/*
supabase/schema.sql          DB schema
```

## Notes

- The signup route uses the service role key server-side, so RLS doesn't block inserts even if policies change.
- Discount codes use a confusables-free alphabet (no `0/O/1/I`) and retry on collision.
- Duplicate emails return a generic success (`alreadyJoined: true`) and do **not** re-send the email.
- If Resend fails after the row is inserted, the row is kept — you can re-send from the admin panel (not built in this MVP; query manually for now).

## Out of scope (intentionally)

Payments, rental flow, inventory, analytics beyond count, user-facing auth. This is a waitlist.
