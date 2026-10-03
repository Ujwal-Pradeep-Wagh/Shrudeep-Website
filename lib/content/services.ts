// Service definitions — edit copy here; all pages/components read from this file.

export type ServiceDetail = {
  slug: string;
  name: string;
  shortName: string;
  headline: string;
  summary: string;
  cta: string;
  problems: string[];
  offerings: Array<{ title: string; description: string }>;
  whoNeedsIt: string[];
  deliverables: string[];
  process: Array<{ step: string; description: string }>;
  seoTitle: string;
  seoDescription: string;
};

export const services: ServiceDetail[] = [
  {
    slug: "software-modernization",
    name: "Software Modernization",
    shortName: "Modernize",
    headline: "Modernize Your Existing Software",
    summary:
      "Your software still runs the business — but it's slow, hard to change, and depends on people or technology that may not be around tomorrow. We upgrade existing systems so they stay reliable, secure, and ready for how your business works today.",
    cta: "Get Your Existing Software Assessed",
    problems: [
      "Our software is old and the developer who built it is no longer available.",
      "The system is slow, especially during billing hours or month-end.",
      "We cannot add new features without breaking something else.",
      "Our software doesn't connect with the other tools we use.",
      "We depend too much on manual Excel work alongside the software.",
      "The software was built for how the business worked years ago — not today.",
      "We're worried about data safety, backups, and security.",
    ],
    offerings: [
      {
        title: "Modernization assessment",
        description:
          "A structured review of your current system — technology, data, performance, security, and maintainability — with a clear written recommendation on what to improve, migrate, or replace.",
      },
      {
        title: "Technology migration",
        description:
          "Move old desktop or legacy applications to modern, supported platforms — without losing your data or stopping daily operations.",
      },
      {
        title: "Database modernization",
        description:
          "Clean up, restructure, and migrate databases so reports are faster and data stays consistent and safe.",
      },
      {
        title: "UI modernization",
        description:
          "Rebuild outdated screens into clean, easy-to-use interfaces your staff can learn quickly — including on tablets and phones.",
      },
      {
        title: "Performance optimization",
        description:
          "Find and fix the real causes of slow screens, slow bills, and slow reports.",
      },
      {
        title: "API & system integration",
        description:
          "Connect your software with payment gateways, accounting tools, WhatsApp, SMS, e-commerce platforms, and other systems you already use.",
      },
      {
        title: "Cloud migration",
        description:
          "Move on-premise software and data to reliable cloud hosting so you can access it securely from anywhere.",
      },
      {
        title: "Automation",
        description:
          "Replace repetitive manual steps — data entry, report preparation, follow-ups — with software that does them for you.",
      },
      {
        title: "Security improvements",
        description:
          "Fix common vulnerabilities, add proper user access control, and set up dependable backup practices.",
      },
      {
        title: "Reporting & dashboard modernization",
        description:
          "Turn raw data into clear dashboards and reports that help you make decisions without digging through registers or spreadsheets.",
      },
    ],
    whoNeedsIt: [
      "Businesses running billing, inventory, or ERP software that is 5+ years old",
      "Companies whose original developer or vendor is no longer responsive",
      "Teams doing double data entry between software and Excel",
      "Businesses that need their old system to talk to new tools",
    ],
    deliverables: [
      "Written assessment report with prioritized recommendations",
      "Migration or upgrade plan with clear phases",
      "Modernized application with your existing data preserved",
      "Data backup and rollback safety during migration",
      "Documentation and staff handover session",
    ],
    process: [
      {
        step: "Assessment",
        description:
          "We study your current system, data, and how your team actually uses it.",
      },
      {
        step: "Recommendation",
        description:
          "You get a plain-language report: what to keep, what to fix, what to replace, and what it will cost.",
      },
      {
        step: "Phased modernization",
        description:
          "Work happens in stages so daily business is never interrupted.",
      },
      {
        step: "Data migration & verification",
        description:
          "Your existing data is moved carefully and verified with you before go-live.",
      },
      {
        step: "Support",
        description:
          "After go-live, we stay available for fixes, training, and improvements.",
      },
    ],
    seoTitle: "Legacy Software Modernization in Pune",
    seoDescription:
      "Modernize old billing, inventory, ERP, and desktop software. Assessment, migration, performance, integration, and cloud services for businesses in Pune and across India.",
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    shortName: "Build",
    headline: "Build the Software Your Business Actually Needs",
    summary:
      "Off-the-shelf software forces your business to adjust to it. We build websites, business applications, and internal tools around the way your business already works — so your team adopts them quickly and they keep fitting as you grow.",
    cta: "Discuss Your Software Requirement",
    problems: [
      "Ready-made software does 80% of what we need — and the missing 20% is exactly what matters.",
      "We pay monthly fees for features we never use.",
      "Our work runs on Excel, WhatsApp, and paper — nothing is connected.",
      "We tried an ERP and it was too complicated for our team.",
      "We need a simple system built around our own process.",
      "We want a professional website that actually brings enquiries.",
    ],
    offerings: [
      {
        title: "Website development",
        description:
          "Business, corporate, service, and portfolio websites that load fast, look credible, and turn visitors into enquiries — built with SEO basics in place from day one.",
      },
      {
        title: "Custom web applications",
        description:
          "Browser-based systems your team can use from anywhere — no installation, no dependency on one computer.",
      },
      {
        title: "Small ERP systems",
        description:
          "Right-sized systems covering orders, inventory, billing, customers, and reports — without enterprise complexity or enterprise pricing.",
      },
      {
        title: "Billing software",
        description:
          "Fast, GST-ready billing with your invoice format, your taxes, your discounts, and your reports.",
      },
      {
        title: "Inventory management",
        description:
          "Know what's in stock, what's moving, and what's stuck — across godowns, shops, or branches.",
      },
      {
        title: "CRM & customer management",
        description:
          "Keep every customer conversation, follow-up, and order in one place instead of scattered across phones and notebooks.",
      },
      {
        title: "Business dashboards",
        description:
          "See sales, collections, stock, and pending work at a glance — updated in real time.",
      },
      {
        title: "Workflow automation",
        description:
          "Automate approvals, reminders, follow-ups, and data movement between tools you already use.",
      },
      {
        title: "Internal business tools",
        description:
          "Admin panels, staff management, appointment and order systems — built for your exact internal process.",
      },
      {
        title: "API & third-party integration",
        description:
          "Connect your software with payment gateways, WhatsApp, SMS, accounting software, and e-commerce platforms.",
      },
      {
        title: "Database-driven applications",
        description:
          "Reliable systems with proper data structure, access control, and backups from the start.",
      },
    ],
    whoNeedsIt: [
      "Businesses outgrowing Excel and manual registers",
      "Companies paying for software that doesn't match their process",
      "Owners who want systems their staff will actually use",
      "Startups building their first internal tool or customer-facing product",
    ],
    deliverables: [
      "Requirement document in plain language",
      "Working software delivered in reviewable stages",
      "Admin access and user roles as needed",
      "Data import from Excel or old systems where required",
      "Training session and user documentation",
      "Source code handover",
    ],
    process: [
      {
        step: "Understand",
        description:
          "We map your current workflow — on a call or at your premises — before talking about technology.",
      },
      {
        step: "Scope & proposal",
        description:
          "A written proposal with scope, timeline, deliverables, and price. No vague estimates.",
      },
      {
        step: "Build in stages",
        description:
          "You see working software early and often, and give feedback before we go further.",
      },
      {
        step: "Test with your data",
        description:
          "We test with real scenarios from your business before go-live.",
      },
      {
        step: "Launch & support",
        description:
          "Deployment, staff training, and ongoing support after launch.",
      },
    ],
    seoTitle: "Custom Software Development in Pune",
    seoDescription:
      "Custom business software built around your workflow: billing software, small ERP, inventory, CRM, dashboards, and business websites for companies in Pune and across India.",
  },
  {
    slug: "software-maintenance-support",
    name: "Software Maintenance & Support",
    shortName: "Maintain",
    headline: "Keep Your Software Running Reliably",
    summary:
      "Software is not a one-time purchase — it needs care. We take over the ongoing maintenance of business software so problems get fixed quickly, data stays safe, and the system keeps improving as your business changes.",
    cta: "Get Software Support",
    problems: [
      "Something breaks and there's nobody to call.",
      "Our software vendor responds slowly — or has shut down.",
      "Small bugs keep annoying our staff every day.",
      "We're not sure our data is being backed up properly.",
      "We want small improvements but don't need a full rebuild.",
      "We worry about security updates we might be missing.",
    ],
    offerings: [
      {
        title: "Monthly support plans",
        description:
          "A fixed number of support hours every month for fixes, small changes, and questions — with a defined response time.",
      },
      {
        title: "Annual maintenance contracts (AMC)",
        description:
          "Year-round coverage for updates, monitoring, backups, and priority support at a predictable annual cost.",
      },
      {
        title: "Bug fixing",
        description:
          "Diagnose and fix issues in existing software — even if it was built by someone else.",
      },
      {
        title: "Security updates",
        description:
          "Keep frameworks, servers, and dependencies patched against known vulnerabilities.",
      },
      {
        title: "Performance monitoring & optimization",
        description:
          "Watch for slowdowns and errors, and fix them before your team or customers complain.",
      },
      {
        title: "Backup management",
        description:
          "Automated, regularly tested backups — so a hardware failure never becomes a business failure.",
      },
      {
        title: "Feature enhancements",
        description:
          "Small, steady improvements to existing software without the cost of a rebuild.",
      },
      {
        title: "Server & cloud maintenance",
        description:
          "Hosting upkeep, renewals, monitoring, and troubleshooting so you never have to think about it.",
      },
      {
        title: "Emergency support",
        description:
          "When a critical system goes down during business hours, you have someone accountable to call.",
      },
    ],
    whoNeedsIt: [
      "Businesses whose software vendor has become unresponsive",
      "Companies with software built by a freelancer who moved on",
      "Teams that want one accountable person for all software issues",
      "Owners who want predictable monthly costs instead of surprise bills",
    ],
    deliverables: [
      "Documented support plan with response times",
      "Monthly summary of work done and system health",
      "Backup verification reports",
      "Priority channel for urgent issues",
      "Improvement recommendations as your business evolves",
    ],
    process: [
      {
        step: "System review",
        description:
          "We review your software, hosting, and backup setup — and flag immediate risks.",
      },
      {
        step: "Support plan",
        description:
          "You choose a monthly or annual plan that fits the criticality of your system.",
      },
      {
        step: "Onboarding",
        description:
          "We take over credentials securely, document the system, and set up monitoring and backups.",
      },
      {
        step: "Ongoing care",
        description:
          "Issues get fixed within agreed response times; you get a simple monthly report.",
      },
    ],
    seoTitle: "Software Maintenance & Support in Pune",
    seoDescription:
      "Monthly and annual software maintenance for business software: bug fixing, security updates, backups, monitoring, and emergency support for businesses in Pune and across India.",
  },
];

export function getService(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}
