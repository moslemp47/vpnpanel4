const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const basic = await prisma.plan.upsert({
    where: { name: "Basic" },
    update: {},
    create: {
      name: "Basic",
      description: "Suitable for personal use",
      priceCents: 500,
      interval: "month",
    },
  });

  const pro = await prisma.plan.upsert({
    where: { name: "Pro" },
    update: {},
    create: {
      name: "Pro",
      description: "For power users and small teams",
      priceCents: 1500,
      interval: "month",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { role: "ADMIN" },
    create: {
      email: "admin@example.com",
      password: null,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log("Seed completed");
}

main().then(() => prisma.$disconnect()).catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
