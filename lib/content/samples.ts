// Sample / demonstration projects.
// IMPORTANT: These are concept demos, NOT client projects. They are labelled
// as such wherever shown. Real client case studies can be added to this list
// later with `kind: "client"` once they exist.

export type SampleProject = {
  slug: string;
  title: string;
  kind: "demo" | "client";
  industry: string;
  problem: string;
  solution: string;
  features: string[];
  technology: string[];
  outcome: string;
};

export const sampleProjects: SampleProject[] = [
  {
    slug: "retail-billing-inventory",
    title: "Retail Billing & Inventory System",
    kind: "demo",
    industry: "Retail",
    problem:
      "A typical retail shop bills manually or on outdated desktop software — billing is slow at peak hours, stock counts are guesswork, and the owner only learns the day's numbers after closing.",
    solution:
      "A web-based billing and inventory system with fast counter billing, live stock updates, and an owner dashboard accessible from a phone.",
    features: [
      "GST-ready billing with barcode support",
      "Live inventory with low-stock alerts",
      "Customer records and outstanding tracking",
      "Daily sales, profit, and item-wise reports",
      "Owner dashboard on mobile",
    ],
    technology: ["Web application", "Relational database", "Role-based access", "Cloud hosting"],
    outcome:
      "Demonstrates how counter billing, stock, and reporting can run in one connected system instead of separate registers and spreadsheets.",
  },
  {
    slug: "clinic-appointment-system",
    title: "Clinic Appointment & Records System",
    kind: "demo",
    industry: "Healthcare",
    problem:
      "A clinic manages appointments on paper and phone calls — double bookings happen, patient history is hard to find, and follow-ups depend on memory.",
    solution:
      "An appointment and patient-records system with a day view for the front desk, visit history for the doctor, and automatic reminders.",
    features: [
      "Appointment calendar with conflict prevention",
      "Patient records and visit history",
      "WhatsApp/SMS appointment reminders",
      "Consultation and billing records",
      "Daily schedule and revenue reports",
    ],
    technology: ["Web application", "Relational database", "Notification integration"],
    outcome:
      "Demonstrates how front-desk work, doctor records, and patient communication can be organized in one place.",
  },
  {
    slug: "coaching-institute-management",
    title: "Coaching Institute Management System",
    kind: "demo",
    industry: "Education",
    problem:
      "A coaching class tracks admissions, fees, and attendance in separate Excel files — fee follow-ups are manual and parents have no visibility.",
    solution:
      "An institute management system covering batches, students, fees, and attendance with automatic fee reminders.",
    features: [
      "Batch and course management",
      "Student admission records",
      "Fee tracking with pending-fee reminders",
      "Attendance marking and reports",
      "Performance and progress notes",
    ],
    technology: ["Web application", "Relational database", "Report exports"],
    outcome:
      "Demonstrates how admissions, fees, and attendance can replace scattered spreadsheets with one system.",
  },
  {
    slug: "distributor-management",
    title: "Distributor Order & Dispatch System",
    kind: "demo",
    industry: "Distribution",
    problem:
      "A distributor takes orders on phone and WhatsApp, writes them in a register, and loses track of what was dispatched, billed, and paid.",
    solution:
      "An order-to-dispatch system connecting orders, stock, billing, and outstanding payments in a single flow.",
    features: [
      "Order booking with retailer-wise pricing",
      "Dispatch and delivery tracking",
      "Automatic billing on dispatch",
      "Credit limit and outstanding alerts",
      "Retailer-wise sales reports",
    ],
    technology: ["Web application", "Relational database", "Role-based access"],
    outcome:
      "Demonstrates how orders, stock, and collections stay connected instead of living in separate registers.",
  },
  {
    slug: "small-erp-dashboard",
    title: "Small Business ERP Dashboard",
    kind: "demo",
    industry: "Manufacturing",
    problem:
      "A small manufacturing unit has data in accounting software, Excel production sheets, and the owner's head — getting a simple business overview takes hours of manual work.",
    solution:
      "A consolidated dashboard that pulls key numbers — orders, production, stock, receivables — into one daily view.",
    features: [
      "Sales and order pipeline view",
      "Production and material status",
      "Receivables and payables snapshot",
      "Stock position with alerts",
      "Exportable management reports",
    ],
    technology: ["Dashboard application", "Data integration", "Scheduled reports"],
    outcome:
      "Demonstrates how owners can see the state of the business each morning without calling three people.",
  },
  {
    slug: "service-business-management",
    title: "Service Business Management System",
    kind: "demo",
    industry: "Professional Services",
    problem:
      "A service business manages clients, jobs, staff, and invoices across WhatsApp chats and notebooks — nothing falls into place at month-end.",
    solution:
      "A job management system tracking each client engagement from enquiry to invoice, with staff assignment and status visibility.",
    features: [
      "Client and job tracking",
      "Staff assignment and schedules",
      "Quotation and invoice generation",
      "Payment status tracking",
      "Monthly performance reports",
    ],
    technology: ["Web application", "Relational database", "Document generation"],
    outcome:
      "Demonstrates how a service business can run its full enquiry-to-invoice cycle in one system.",
  },
];
