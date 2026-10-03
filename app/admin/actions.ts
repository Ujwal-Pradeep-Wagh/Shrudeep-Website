"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  createSession,
  destroySession,
  getSession,
  verifyPassword,
} from "@/lib/auth";
import { loginSchema, noteSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { LEAD_STATUSES } from "@/lib/config";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const headerList = await headers();
  const ip = clientIp(headerList);
  const limit = rateLimit(`login:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return {
      error: `Too many login attempts. Please try again in ${Math.ceil(
        limit.retryAfterSeconds / 60
      )} minute(s).`,
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase().trim() },
  });

  const passwordOk =
    user && (await verifyPassword(parsed.data.password, user.passwordHash));

  if (!user || !passwordOk) {
    return { error: "Invalid email or password." };
  }

  await createSession({ userId: user.id, email: user.email, name: user.name });
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function updateLeadStatus(formData: FormData): Promise<void> {
  await requireSession();

  const leadId = String(formData.get("leadId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!leadId || !(LEAD_STATUSES as readonly string[]).includes(status)) {
    return;
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { status },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
}

export type NoteState = { error?: string };

export async function addLeadNote(
  _prevState: NoteState,
  formData: FormData
): Promise<NoteState> {
  const session = await requireSession();

  const leadId = String(formData.get("leadId") ?? "");
  const parsed = noteSchema.safeParse({ content: formData.get("content") });

  if (!leadId) return { error: "Missing lead." };
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid note." };
  }

  await prisma.leadNote.create({
    data: {
      leadId,
      authorId: session.userId,
      content: parsed.data.content,
    },
  });

  revalidatePath(`/admin/leads/${leadId}`);
  return {};
}

export async function deleteLead(formData: FormData): Promise<void> {
  await requireSession();

  const leadId = String(formData.get("leadId") ?? "");
  if (!leadId) return;

  await prisma.lead.delete({ where: { id: leadId } });

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}
