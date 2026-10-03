# Admin Guide

The admin dashboard is where enquiries become clients. It lives at
`/admin` and is not linked from the public website.

---

## Signing in

1. Go to `/admin/login`.
2. Use the credentials created by `npm run db:seed`
   (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in `.env`).
3. Sessions last 8 hours; use **Sign out** (top right) on shared computers.
4. After 5 failed attempts from one network, login is paused for 10 minutes.

**Change your password:** update `SEED_ADMIN_PASSWORD` in `.env` and re-run
`npm run db:seed` — the seed updates the existing user's password.

---

## Dashboard (`/admin`)

- **Totals at a glance** — total leads, new, won, and everything currently in
  the pipeline, plus a 7-day enquiry count.
- **Pipeline by status** — a bar view of how many leads sit at each stage.
- **Recent enquiries** — the 8 newest leads; click any row to open it.

---

## Leads (`/admin/leads`)

- **Search** matches name, business name, phone, email, and city.
- **Status filter** narrows to one pipeline stage; combine both freely.
- Results are newest-first, 15 per page.

## Lead detail (`/admin/leads/<id>`)

Everything the prospect submitted, plus:

- **Quick actions** — WhatsApp (number auto-formatted), call, email.
- **Status updates** — change the stage as the conversation progresses:
  - **New** — just arrived; nobody has responded yet
  - **Contacted** — you've reached out
  - **Qualified** — real need, real budget conversation
  - **Proposal Sent** — written proposal delivered
  - **Negotiation** — scope/price under discussion
  - **Won** / **Lost** — closed
  - **Follow-up** — waiting on the client; don't lose track of these
- **Notes** — timestamped internal history: call outcomes, requirements,
  promised follow-ups. Notes are never visible to the public.
- **Delete** — permanently removes the lead and its notes (there is no undo).

---

## Daily routine that works

1. **Morning:** open the dashboard; anything in **New** gets a response —
   WhatsApp is fastest for local businesses.
2. After each conversation: update the status and add a note while it's fresh.
3. **Weekly:** scan **Follow-up** and **Proposal Sent** — these are the
   leads most often lost to silence.

## What the admin is deliberately NOT

It's a lightweight lead pipeline, not a full CRM. If you later need more
(reminders, email threads, invoicing), the `leads` + `lead_notes` schema is
designed to grow — or export data to a dedicated CRM when the time comes.
