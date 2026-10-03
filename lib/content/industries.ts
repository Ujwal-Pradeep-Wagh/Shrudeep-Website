// Industries — framed honestly as "examples of businesses we can help",
// not claimed specializations.

export type Industry = {
  slug: string;
  name: string;
  examples: string;
  typicalNeeds: string[];
};

export const industries: Industry[] = [
  {
    slug: "retail",
    name: "Retail",
    examples: "Shops, showrooms, and multi-counter stores",
    typicalNeeds: [
      "Fast GST billing and barcode support",
      "Stock tracking across shelves and godown",
      "Daily sales and collection reports",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    examples: "Small factories and job-work units",
    typicalNeeds: [
      "Production and material tracking",
      "Order status visibility",
      "Modernizing old shop-floor or accounts software",
    ],
  },
  {
    slug: "distribution",
    name: "Distribution & Wholesale",
    examples: "Distributors, wholesalers, and C&F businesses",
    typicalNeeds: [
      "Order and dispatch management",
      "Outstanding and credit tracking",
      "Integration between billing and inventory",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    examples: "Clinics and small practices",
    typicalNeeds: [
      "Appointment scheduling",
      "Patient records and billing",
      "Reports and follow-up reminders",
    ],
  },
  {
    slug: "education",
    name: "Education",
    examples: "Coaching classes, institutes, and training centers",
    typicalNeeds: [
      "Batch and student management",
      "Fee tracking and receipts",
      "Attendance and performance reports",
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality & Food",
    examples: "Restaurants, cafes, and catering businesses",
    typicalNeeds: [
      "Billing and order management",
      "Online presence that brings enquiries",
      "Raw material and cost tracking",
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    examples: "CA firms, consultants, agencies, and service businesses",
    typicalNeeds: [
      "Client and engagement tracking",
      "Invoicing and receivables",
      "Internal workflow tools",
    ],
  },
  {
    slug: "logistics",
    name: "Logistics",
    examples: "Transporters and courier businesses",
    typicalNeeds: [
      "Consignment tracking",
      "Vehicle and trip records",
      "Billing and payment follow-ups",
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    examples: "Brokers, builders, and property managers",
    typicalNeeds: [
      "Lead and site-visit tracking",
      "Property listings and follow-ups",
      "Booking and payment records",
    ],
  },
  {
    slug: "startups-smes",
    name: "Startups & SMEs",
    examples: "Growing companies building their first systems",
    typicalNeeds: [
      "Internal tools that replace spreadsheets",
      "MVPs and customer-facing applications",
      "Automation of manual back-office work",
    ],
  },
];
