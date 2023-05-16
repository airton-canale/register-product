import { PrismaProductsRepositories } from "../../database/prisma/repositories/prisma-products-repository.js";
import { created } from "../../helpers/http-helper.js";
import {
  generatePresignedUrl,
  getAssetFullPath,
} from "../../helpers/s3-helper.js";

const create = async (req, res) => {
  try {
    const { name, description, price, category, size, active } = req.body;
    const product = await PrismaProductsRepositories.create({
      name,
      description,
      price,
      category,
      size,
      active,
    });

    const productId = product.id;

    const images = files.map((img, i) => {
      const { type } = img;
      const fileKey = `product-${productId}-${i}.${type.split("/").pop()}`;

      return {
        ...img,
        originalName: img.name,
        name: fileKey,
      };
    });

    await PrismaProductsRepositories.edit(productId, { images: { create: images } });

    const imageUrls = await Promise.all(
      images.map((i) => i.name).map(generatePresignedUrl)
    );

    // return res.json({ product, imageUrls });
    return created('Produto criado com sucesso!')

  } catch (e) {
    console.log('errrrr', e)
  }
};

const edit = async (req, res) => {
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

const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await PrismaProductsRepositories.findOne(id);

    product.images = product.images?.map((i) => i.name).map(getAssetFullPath);

    return res.json(product);
  } catch (e) {
    console.log('errrrr', e)
  }
};

const findAll = async (req, res) => {
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
      images: p.images?.map((i) => i.name).map(getAssetFullPath),
    }));

    return res.json({ products: parsedProducts });
  } catch (e) {
    console.log('errrrr', e)
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await PrismaProductsRepositories.deleteProduct(id);

    return res.json({ product });
  } catch (e) {
    console.log('errrrr', e)
  }
};

export { create, edit, findOne, findAll, remove };
