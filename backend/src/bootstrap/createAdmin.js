const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createAdminIfNotExists() {
  const usersCount = await prisma.user.count();

  if (usersCount > 0) {
    console.log("Admin já existe, pulando criação");
    return;
  }

  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    10
  );

  await prisma.user.create({
    data: {
      name: "Administrador",
      email: process.env.ADMIN_EMAIL,
      password: passwordHash,
      role: "ADMIN"
    }
  });

  console.log("Admin criado com sucesso");
}

module.exports = createAdminIfNotExists;
