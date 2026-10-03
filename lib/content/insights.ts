// Insights — a deliberately simple, file-based content system.
// Add a new entry to this array to publish a new article; no CMS required.
// Dates are ISO strings. Content is structured for straightforward rendering.

export type InsightSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTimeMinutes: number;
  sections: InsightSection[];
};

export const insights: Insight[] = [
  {
    slug: "how-to-modernize-old-business-software",
    title: "How to Modernize Old Business Software Without Stopping Your Business",
    excerpt:
      "Your billing or inventory software is ten years old, slow, and nobody wants to touch it. Here's a practical path to modernizing it — without losing data or stopping daily operations.",
    date: "2026-09-15",
    readTimeMinutes: 5,
    sections: [
      {
        paragraphs: [
          "Most small businesses don't run on bad software — they run on old software. It was right for the business when it was installed, but the business has grown and the software hasn't. Billing is slow at peak hours, new features are impossible, and the person who built it is no longer reachable.",
          "The instinct is often to replace everything at once. That's usually the riskiest and most expensive option. A better path is staged modernization.",
        ],
      },
      {
        heading: "Step 1: Assess before you spend",
        paragraphs: [
          "Before changing anything, understand what you actually have: what technology the system uses, what condition the database is in, which parts your team relies on daily, and which parts nobody uses. A proper assessment tells you whether you need targeted fixes, a gradual migration, or a rebuild — these have very different costs.",
        ],
      },
      {
        heading: "Step 2: Protect the data first",
        paragraphs: [
          "Your data is usually worth more than the software itself. Before any modernization work, make sure there is a complete, verified backup, and that the data can be exported in a usable format. Any professional you work with should do this as a first step, not an afterthought.",
        ],
      },
      {
        heading: "Step 3: Modernize in phases",
        paragraphs: [
          "Fix what's painful first — usually performance and the screens your staff use all day. Then address integrations, reporting, and finally larger platform changes. Phased work means your business never stops, and you see value at every stage rather than waiting months for a big-bang replacement.",
        ],
      },
      {
        heading: "When a rebuild IS the right answer",
        paragraphs: [
          "Sometimes the honest recommendation is to rebuild: when the technology is unsupported, when the database structure can't support what the business needs now, or when every small change breaks something else. Even then, the migration should be staged and your old system should run in parallel until the new one proves itself with real data.",
        ],
      },
      {
        paragraphs: [
          "If your business depends on software that's showing its age, the worst option is waiting until it fails. A short assessment now tells you where you stand and what your options cost.",
        ],
      },
    ],
  },
  {
    slug: "custom-software-vs-off-the-shelf",
    title: "Custom Software vs Off-the-Shelf: An Honest Comparison for Small Businesses",
    excerpt:
      "Ready-made software is cheaper to start. Custom software fits better. Here's how to think through which one your business actually needs.",
    date: "2026-09-28",
    readTimeMinutes: 4,
    sections: [
      {
        paragraphs: [
          "This isn't a sales pitch for custom software — for many businesses, off-the-shelf is the right choice. The goal is to match the tool to how your business actually works.",
        ],
      },
      {
        heading: "When off-the-shelf wins",
        paragraphs: [
          "If your process is standard — basic accounting, simple invoicing, common workflows — a good ready-made product will be cheaper, faster to start, and well supported. Never build custom what a ₹500/month tool already does well.",
        ],
      },
      {
        heading: "When custom software wins",
        paragraphs: [],
        list: [
          "Your process is genuinely different — you've adjusted your business around software limitations for years.",
          "You pay for three tools that almost connect, plus someone doing manual work between them.",
          "The missing 20% of features is exactly the part that makes you competitive.",
          "Per-user monthly fees have quietly grown into a large annual cost.",
          "You need the software to work in your language, your invoice format, your workflow.",
        ],
      },
      {
        heading: "The hidden cost of 'almost fits'",
        paragraphs: [
          "The real cost of software that almost fits isn't the subscription — it's the daily manual workarounds, the double data entry, the reports you can't get, and the decisions you make without proper numbers. Add up the staff hours spent on workarounds each month; that number usually settles the build-vs-buy question quickly.",
        ],
      },
      {
        paragraphs: [
          "A good technology partner will tell you honestly which side of the line your requirement falls on — including when the answer is 'don't build, buy'.",
        ],
      },
    ],
  },
  {
    slug: "signs-your-billing-software-needs-modernization",
    title: "7 Signs Your Billing Software Needs Modernization",
    excerpt:
      "Slow billing at peak hours, month-end hangs, and no way to check numbers from your phone are not 'normal'. They're signs the software needs attention.",
    date: "2026-10-01",
    readTimeMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Billing is the one piece of software almost every business depends on daily. It's also the one most often left untouched for a decade. Here are the signs that yours needs attention — roughly in the order businesses notice them.",
        ],
      },
      {
        heading: "The warning signs",
        paragraphs: [],
        list: [
          "Billing slows down exactly when you're busiest — peak hours, month-end, festival season.",
          "New staff take weeks to learn the software because the screens are from another era.",
          "You can't add something simple — a new tax rule, a payment mode, UPI — without a workaround.",
          "The software doesn't talk to anything else: your accounting tool, your stock records, your phone.",
          "Reports you actually need don't exist, so someone rebuilds them in Excel every evening.",
          "Backups are 'someone copies a folder sometimes' — and you've never tested a restore.",
          "The company or person who made it no longer responds.",
        ],
      },
      {
        heading: "What modernization actually looks like",
        paragraphs: [
          "It rarely means throwing everything away. Often it's faster database queries, cleaner billing screens, proper GST and payment-mode support, integration with your other tools, automatic tested backups, and an owner dashboard on your phone. Your data moves with you, and your team keeps working through the transition.",
        ],
      },
      {
        paragraphs: [
          "If three or more of these signs sound familiar, an assessment costs little and tells you exactly where you stand — before the software decides the timing for you.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((p) => p.slug === slug);
}
