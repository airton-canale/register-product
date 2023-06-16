import { PrismaProductsRepositories } from "../../database/prisma/repositories/prisma-products-repository.js";
import { badRequest, created, serverError } from "../../helpers/http-helper.js";

export const create = async (req, res) => {
  try {
    const { name, description, price, category, size, images } = req.body;
    const activeValue = req.body.active || false;
    const product = await PrismaProductsRepositories.create({
      name,
      description,
      price,
      category,
      size,
      active: activeValue,
      images
    });

    const productId = product.id;
    // const images = files.map((img, i) => {
      // const { type } = img;
      // const fileKey = `product-${productId}-${i}.${type.split("/").pop()}`;

    //   return {
    //     ...img,
    //     originalName: img.name,
    //     name: fileKey,
    //   };
    // });

    // await PrismaProductsRepositories.edit(productId, { images: { create: images } });

    // return res.json({ product, imageUrls });
    // return res.status(200).json({ mensagem: 'Sucesso' })
    return created('product created')

  } catch (e) {
    console.log(e)
    return serverError()
  }
};

export const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, size, active } = req.body;


    const products = await PrismaProductsRepositories.edit(id, {
      name,
      description,
      price,
      category,
      size,
      active,
    });

    return res.json({ products });
  } catch (e) {
    console.log('errrrr', e)
  }
};

export const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await PrismaProductsRepositories.findOne(id);


    return res.json(product);
  } catch (e) {
    console.log('errrrr', e)
  }
};

export const findAll = async (req, res) => {
  try {
    const { name, description, price, category, size, active } = req.query;

    const products = await PrismaProductsRepositories.findAll({
      name,
      description,
      price,
      category,
      size,
      active,
    });

    const parsedProducts = products.map((p) => ({
      ...p,
      images: p.images?.map((i) => i.name),
    }));

    return res.json({ products: parsedProducts });
  } catch (e) {
    console.log('errrrr', e)
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await PrismaProductsRepositories.deleteProduct(id);

    return res.json({ product });
  } catch (e) {
    console.log('errrrr', e)
  }
};

