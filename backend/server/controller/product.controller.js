const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  return products;
};

const createProduct = async (product) => {
  const { name, price, stock, categoryId } = product;

  const newProduct = await prisma.product.create({
    data: {
      name: name,
      price: Number(price),
      stock: Number(stock),
      categoryId: categoryId,
    },
  });
  return newProduct;
};

const updateProduct = async (data) => {
  const { id, name, price, stock, categoryId } = data;
  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(categoryId),
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  const productDelete = await prisma.product.delete({ where: { id } });
  return productDelete;
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
