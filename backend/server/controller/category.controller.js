const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

module.exports = {
  getCategories,
};
