import { z } from "zod";
import { SERVICE_OPTIONS } from "@/lib/config";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  businessName: z.string().trim().max(120).optional().or(z.literal("")),
  email: z
    .union([z.literal(""), z.email("Please enter a valid email address")])
    .optional(),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d][\d\s\-()]*$/, "Please enter a valid phone number"),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS, "Please select a service"),
  currentSystem: z.string().trim().max(200).optional().or(z.literal("")),
  requirement: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please briefly describe your requirement (min 10 characters)")
    .max(2000, "Message is too long"),
  preferredContact: z
    .enum(["whatsapp", "phone", "email"])
    .optional()
    .or(z.literal("")),
  source: z.string().trim().max(80).optional().or(z.literal("")),
  // Honeypot — must stay empty. Bots that fill it are silently dropped.
  website_url: z.string().max(0, "Honeypot field must be empty").optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export const noteSchema = z.object({
  content: z.string().trim().min(1, "Note cannot be empty").max(2000),
});
