# Deployment Guide

This guide takes the site from this repository to a live, production URL.

---

## Option A — Vercel (recommended, simplest)

Best fit: the app is a Next.js monolith; Vercel hosts it with zero server
management. Pair it with a managed Postgres (Neon, Supabase, or Vercel
Postgres).

### 1. Prepare the database

1. Create a Postgres database with your provider of choice.
2. Copy the connection string, e.g.
   `postgresql://user:pass@host:5432/dbname?sslmode=require`
3. In `prisma/schema.prisma`, change the datasource provider:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Commit this change.

### 2. Push the code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
# create a repo on GitHub, then:
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### 3. Import into Vercel

1. Vercel → **Add New → Project** → import the repository.
2. Framework is auto-detected (Next.js). Build command `next build` works as-is;
   `postinstall` runs `prisma generate` automatically.
3. Add environment variables (from `.env.example`):
   - `DATABASE_URL` — your Postgres string
   - `NEXT_PUBLIC_SITE_URL` — `https://yourdomain.com`
   - `SESSION_SECRET` — generate with `openssl rand -base64 32`
   - `NEXT_PUBLIC_BUSINESS_EMAIL`, `NEXT_PUBLIC_BUSINESS_PHONE`,
     `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`,
     `LEAD_NOTIFY_EMAIL`, `EMAIL_FROM`
   - `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` (used once, in step 4)
4. Deploy.

### 4. Create tables and the admin user

From your machine, against the production database:

```bash
# temporary local .env pointing at production Postgres
DATABASE_URL="postgresql://..." npx prisma db push
DATABASE_URL="postgresql://..." SEED_ADMIN_EMAIL="you@business.com" \
  SEED_ADMIN_PASSWORD="a-long-random-password" npx tsx prisma/seed.ts
```

Or run the same commands from any environment that can reach the database.

### 5. Point your domain

Vercel → Project → **Domains** → add your domain and update DNS as instructed.
After DNS propagates, confirm `NEXT_PUBLIC_SITE_URL` matches the final URL.

---

## Option B — Railway / Render (Node host + managed Postgres)

1. Create a Postgres service; note its `DATABASE_URL`.
2. Create a web service from your repo:
   - **Build:** `npm install && npm run build`
   - **Start:** `npm run start`
3. Set the same environment variables as above.
4. Switch `provider` to `postgresql` (as in Option A), then run
   `prisma db push` + the seed script from your machine.

---

## Option C — VPS (Ubuntu, full control)

```bash
# on the server
sudo apt update && sudo apt install -y nodejs npm nginx
git clone <your-repo> && cd <repo>
npm install
cp .env.example .env          # fill in production values
# use PostgreSQL locally or a managed URL; then:
npx prisma db push
npm run db:seed
npm run build

# run with a process manager
npm install -g pm2
pm2 start npm --name "business-site" -- run start
pm2 save && pm2 startup

# nginx reverse proxy on :80/:443 → localhost:3000
# then obtain TLS with certbot:
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Post-launch checklist

- [ ] `https://yourdomain.com` loads; every nav link works
- [ ] Submit a real enquiry → it appears in `/admin/leads`
- [ ] Owner notification email arrives (check spam once)
- [ ] Customer confirmation email arrives when an email is provided
- [ ] `/admin` is unreachable without login; login works; sign-out works
- [ ] `sitemap.xml` and `robots.txt` load on the real domain
- [ ] Submit the sitemap in Google Search Console
- [ ] Create/verify the Google Business Profile and keep the same NAP
      (name–address–phone) as the website footer
- [ ] Old seed admin password replaced by your real one (re-run seed with
      a strong password — it updates the existing user)

## Rate-limiting note

The built-in rate limiter is per-process (in-memory) — correct for a single
instance on any platform above. If you later scale to multiple instances,
swap `lib/rate-limit.ts` for a shared store (e.g. Upstash Redis); the call
sites don't change.
