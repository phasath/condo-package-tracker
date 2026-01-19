const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const { block, apartment, date, time, code } = req.body;
  const pkg = await prisma.package.create({
    data: {
      block, apartment, date, time, code,
      photo: req.file?.filename,
      userId: req.user.id
    }
  });
  res.json(pkg);
};

exports.list = async (req, res) => {
  const { status, block, apartment, name } = req.query;
  const items = await prisma.package.findMany({
    where: {
      status,
      block: block || undefined,
      apartment: apartment || undefined,
      receivedName: name ? { contains: name, mode: "insensitive" } : undefined
    },
    orderBy: { createdAt: "desc" }
  });
  res.json(items);
};

exports.deliver = async (req, res) => {
  const { name, signature } = req.body;
  const pkg = await prisma.package.update({
    where: { id: Number(req.params.id) },
    data: {
      status: "DELIVERED",
      receivedName: name,
      receivedAt: new Date(),
      signature
    }
  });
  res.json(pkg);
};
