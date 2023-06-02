import { prisma } from "../../../helpers/prisma-helper.js";

class PrismaProductsRepositories {
  static async findAll({ name, description, price, category, size, active }) {
    const products = await prisma.product.findAll({
      where: {
        AND: [
          {
            name,
            price,
            category,
            size,
            active,
          },
          {
            description: {
              contains: description,
            },
          },
        ],
      },
      include: {
        images: true,
      },
    });
    return products;
  }

  static async create({
    name,
    description,
    price,
    category,
    size,
    active,
    images
  }) {
    return prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        size,
        active,
        images: 'teste',
      },
    });
  }

  static async findOne(id) {
    return prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });
  }

  static async delete(id) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
  static async edit(
    id,
    { name, description, price, category, size, active, images }
  ) {
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        category,
        size,
        active,
        images,
      },
    });
  }
}

export { PrismaProductsRepositories };
