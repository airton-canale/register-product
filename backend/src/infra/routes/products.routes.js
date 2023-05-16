import { Router } from "express";
import * as controller from "../http/controllers/products.controller.js"
import { prisma } from "../helpers/prisma-helper.js";
import { adaptRoute } from "../adapters/express-router-adapter.js";

const productRoutes = Router();

productRoutes.get("/list", controller.findAll)

productRoutes.get("/:id", controller.findOne);

productRoutes.post("/", adaptRoute(controller.create));

productRoutes.delete("/:id", controller.remove);

productRoutes.put("/:id", controller.edit);

export { productRoutes };