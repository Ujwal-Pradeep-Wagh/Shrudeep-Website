# Content Guide

Almost everything a visitor reads is editable in **one of three places** —
you should rarely need to touch page components.

| What                                | Where                                   |
| ----------------------------------- | --------------------------------------- |
| Business name, tagline, contact info, social links, CTAs | `lib/config.ts` |
| Services (all 3, full detail)       | `lib/content/services.ts`               |
| Industries                          | `lib/content/industries.ts`             |
| FAQs                                | `lib/content/faqs.ts`                   |
| Sample/demo projects                | `lib/content/samples.ts`                |
| Blog articles ("Insights")          | `lib/content/insights.ts`               |
| Contact details (secrets-safe)      | `.env`                                  |
| Pricing philosophy & hints          | `app/(site)/pricing/page.tsx`           |
| Legal pages                         | `app/(site)/legal/*/page.tsx`           |
| Design (colors, font)               | `app/globals.css` (`@theme` block)      |

---

## Business identity — `lib/config.ts`

- `name` — the brand shown across the entire site (header, footer, metadata,
  emails, JSON-LD). **Replace the temporary name before launch.**
- `tagline`, `positioning`, `description`, `serviceArea`, `city/region/country`
- `social` — paste real profile URLs when they exist; leave empty otherwise
  (empty links are hidden automatically).
- `PRIMARY_CTA` / `SECONDARY_CTA` — the two main buttons used site-wide.

Contact channels (email/phone/WhatsApp) come from **environment variables**,
not this file, so they can differ between local and production:

```
NEXT_PUBLIC_BUSINESS_EMAIL="hello@yourdomain.com"
NEXT_PUBLIC_BUSINESS_PHONE="+91 98XXXXXXXX"
NEXT_PUBLIC_WHATSAPP_NUMBER="9198XXXXXXXX"   # digits only, with country code
```

While these are empty, the corresponding buttons simply don't render — the
site never shows a fake number.

## Services — `lib/content/services.ts`

Each service object controls its detail page completely: headline, summary,
problems solved, offerings (cards), who it's for, deliverables, process steps,
CTA text, and SEO title/description. Edit text in place; adding a fourth
service object automatically creates its page, nav entry, and sitemap entry.

## FAQs — `lib/content/faqs.ts`

One array of `{ question, answer }`. The homepage shows the first five;
`/faq` shows all and generates FAQ structured data automatically.

## Sample projects — `lib/content/samples.ts`

Each demo has `kind: "demo"`, which renders the
**"Demo concept — not a client project"** badge. When you complete a real
engagement (with the client's permission), add it with `kind: "client"` and
fill in real problem/solution/outcome — the layout is already built for it.

## Blog articles — `lib/content/insights.ts`

Add an object with a unique `slug`, `title`, `excerpt`, `date`,
`readTimeMinutes`, and `sections` (paragraphs, optional heading, optional
bullet list). The article page, index card, and sitemap entry are generated
automatically. Keep articles plain-language and honest — they exist to build
trust and organic traffic, not to keyword-stuff.

## Pricing — `app/(site)/pricing/page.tsx`

Pricing is intentionally philosophy-first (no invented numbers). When you're
ready, set the `priceHint` fields (e.g. `"Starting ₹24,999"`) — empty strings
stay hidden.

## SEO metadata

- Site-wide defaults: `app/layout.tsx` (title template, keywords)
- Per page: each `page.tsx` calls `buildMetadata({ title, description, path })`
- Structured data: `lib/seo.tsx` (LocalBusiness, Service, FAQ, Breadcrumb)

## Design tokens — `app/globals.css`

The `@theme` block defines the brand palette (`--color-brand-*`), the WhatsApp
green, and the font. Changing the brand color scale re-skins the whole site.

---

## House rules for content

1. **Never invent facts.** No client counts, years of experience, awards, or
   testimonials that don't exist. The site's credibility comes from honesty.
2. **Business language over tech language.** Visitors are owners, not
   developers — talk about their problem, cost, and time.
3. **One idea per sentence; one CTA per section.**
4. If information isn't available yet, use
   `[PLACEHOLDER — REPLACE BEFORE LAUNCH]` rather than guessing.
