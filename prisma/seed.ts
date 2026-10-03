import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim();
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME?.trim() || "Site Admin";

  if (!email) {
    throw new Error("SEED_ADMIN_EMAIL is not set. Add it to .env");
  }
  if (!password || password.length < 12) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must be set in .env and be at least 12 characters long."
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name, role: "admin" },
    create: { email, name, passwordHash, role: "admin" },
  });

  console.log(`✔ Admin user ready: ${user.email} (id: ${user.id})`);
  console.log("  Sign in at /admin/login");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
