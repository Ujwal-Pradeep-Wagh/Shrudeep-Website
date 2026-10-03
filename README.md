# Vertex Digital — Digital Services Business Website

A production-ready, full-stack business website for a digital services sole
proprietorship based in Pune, India. Built to do one job well: **generate
qualified leads** for software modernization, custom software development, and
maintenance & support services.

> **Before launch:** read
> [What to replace before launch](#-what-to-replace-before-launch) — the site
> ships with a temporary brand name and clearly-marked placeholders, never
> invented business facts.

---

## What's inside

**Public website**
- Home, Services (overview + 3 detail pages), Industries, How It Works,
  Work & Demos, About, Pricing (philosophy), FAQ, Insights (blog), Contact
- Legal templates: Privacy Policy, Terms & Conditions, Disclaimer
- Local-SEO ready: per-page metadata, Open Graph, canonical URLs,
  `LocalBusiness` / `Service` / `FAQPage` / `BreadcrumbList` JSON-LD,
  `sitemap.xml`, `robots.txt`
- Conversion system: service-aware enquiry form, WhatsApp/phone/email CTAs
  (auto-hidden until configured), sticky mobile CTA, tracked CTA clicks

**Lead backend**
- Enquiry API with server-side validation (zod), honeypot spam trap,
  IP rate limiting
- Leads stored in a database with statuses: New → Contacted → Qualified →
  Proposal Sent → Negotiation → Won/Lost (+ Follow-up)
- Email notifications to the owner and confirmations to the customer
  (SMTP; skipped gracefully when unconfigured)

**Admin dashboard** (`/admin`)
- Secure login (bcrypt password hashing, signed JWT session cookie, 8-hour
  expiry, login rate limiting)
- Dashboard: totals, pipeline-by-status chart, recent enquiries
- Leads: search, status filter, pagination
- Lead detail: full enquiry, status updates, internal notes, quick
  WhatsApp/call/email actions, delete

**Analytics (privacy-conscious, first-party)**
- Page views, form starts/submissions, WhatsApp/phone/email/CTA clicks —
  stored in your own database, no third-party trackers. Can be disabled with
  one env var.

---

## Tech stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | Next.js 15 (App Router), React 19, TypeScript      |
| Styling    | Tailwind CSS v4                                    |
| Database   | SQLite locally · PostgreSQL for production (Prisma)|
| ORM        | Prisma 6                                           |
| Auth       | jose (JWT) + bcryptjs, httpOnly cookie sessions    |
| Validation | zod                                                |
| Email      | nodemailer (any SMTP)                              |

Architecture: a single modular monolith — deliberately no microservices.

---

## Quick start (local)

Prerequisites: **Node.js 20+** and npm.

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env          # Windows: copy .env.example .env

# 3. Create the database (SQLite — no server needed)
npm run db:push

# 4. Create your admin login (edit SEED_ADMIN_* in .env first!)
npm run db:seed

# 5. Run
npm run dev
```

Open http://localhost:3000 — and http://localhost:3000/admin/login for the
dashboard (default seed credentials are in `.env`; change them).

Useful scripts:

| Command            | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Dev server (Turbopack)                   |
| `npm run build`    | Production build                         |
| `npm run start`    | Serve the production build               |
| `npm run db:push`  | Sync database schema                     |
| `npm run db:seed`  | Create/update the admin user             |
| `npm run db:studio`| Prisma Studio (browse data)              |

---

## Environment variables

All configuration lives in `.env` (never commit it — it's git-ignored).
See **`.env.example`** for the annotated list. Key groups:

- `DATABASE_URL` — SQLite (`file:./dev.db`) locally; PostgreSQL URL in production
- `SESSION_SECRET` — 32+ random chars (`openssl rand -base64 32`)
- `SEED_ADMIN_*` — used only by `npm run db:seed`
- `NEXT_PUBLIC_BUSINESS_EMAIL / _PHONE / _WHATSAPP_NUMBER` — public contact
  channels; CTAs are hidden while these are empty
- `SMTP_*`, `LEAD_NOTIFY_EMAIL`, `EMAIL_FROM` — email notifications
- `NEXT_PUBLIC_SITE_URL` — canonical URL used by SEO/sitemap/emails
- `NEXT_PUBLIC_ANALYTICS_ENABLED` — `false` disables first-party tracking

---

## Switching to PostgreSQL (recommended for production)

1. In `prisma/schema.prisma`, change `provider = "sqlite"` →
   `provider = "postgresql"`.
2. Set `DATABASE_URL` to your Postgres connection string
   (Supabase / Neon / Railway / RDS all work).
3. Run `npx prisma db push` (or `prisma migrate deploy` if you adopt
   migrations).

The schema deliberately avoids database-specific features, so no other code
changes are needed.

---

## Project structure

```
app/
  (site)/                 # public pages (share header/footer layout)
    page.tsx              # home
    services/             # overview + [slug] detail (3 services from data)
    industries/ how-it-works/ work/ about/ pricing/ faq/ contact/
    insights/             # blog index + [slug] articles
    legal/                # privacy, terms, disclaimer templates
  admin/
    login/                # public login page
    (dashboard)/          # guarded: layout enforces session
      page.tsx            # stats dashboard
      leads/              # list + [id] detail (status, notes, delete)
    actions.ts            # server actions (auth-guarded)
  api/leads/              # POST: public enquiry endpoint
  api/track/              # POST: first-party analytics events
  sitemap.ts robots.ts    # SEO infrastructure
components/
  layout/  ui/  forms/  cta/  admin/  analytics/  legal/
lib/
  config.ts               # ★ central business configuration
  content/                # ★ all editable copy: services, industries,
                          #   FAQs, sample projects, blog articles
  db.ts auth.ts email.ts validation.ts rate-limit.ts analytics.ts seo.tsx
prisma/
  schema.prisma seed.ts
docs/
  DEPLOYMENT.md  ADMIN-GUIDE.md  CONTENT-GUIDE.md
```

---

## ⚠ What to replace before launch

Everything below is a clearly-marked placeholder, never an invented fact:

1. **Brand name** — `Vertex Digital` is temporary. Change `name` in
   `lib/config.ts` (one place, updates the whole site).
2. **Contact channels** — set `NEXT_PUBLIC_BUSINESS_EMAIL`, `_PHONE`,
   `_WHATSAPP_NUMBER`. WhatsApp/phone/email CTAs stay hidden until then.
3. **`NEXT_PUBLIC_SITE_URL`** — your real domain (drives canonicals, sitemap).
4. **Legal pages** — templates in `app/(site)/legal/` are marked for review
   by a legal professional; set the "Last updated" date.
5. **Legal entity details** — add your proprietorship/GST details to the
   footer/config if you want them displayed (not included by default).
6. **Social links** — `site.social` in `lib/config.ts` (empty = hidden).
7. **Secrets** — `SESSION_SECRET`, seed admin credentials, SMTP credentials.
8. **Pricing hints** — optional starting prices in `app/(site)/pricing/page.tsx`.

See **docs/CONTENT-GUIDE.md** for exactly where each piece of copy lives.

## Guides

- **docs/DEPLOYMENT.md** — step-by-step deployment (Vercel / Railway / VPS)
- **docs/ADMIN-GUIDE.md** — using the dashboard and managing leads
- **docs/CONTENT-GUIDE.md** — editing copy, services, FAQs, articles, pricing
