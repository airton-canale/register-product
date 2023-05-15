import { Router } from "express";
import * as controller from "../http/controllers/products.controller.js"
import { prisma } from "../helpers/prisma-helper.js";

const productRoutes = Router();

productRoutes.get("/list", controller.findAll)

productRoutes.get("/:id", controller.findOne);

productRoutes.post("/", controller.create);

productRoutes.delete("/:id", controller.remove);

productRoutes.put("/:id", controller.edit);

export { productRoutes };