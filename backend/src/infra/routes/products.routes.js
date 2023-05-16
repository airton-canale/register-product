import { Router } from "express";
import * as controller from "../http/controllers/products.controller.js"
import { adaptRoute } from "../adapters/express-router-adapter.js";

const productRoutes = Router();

productRoutes.get("/list", adaptRoute(controller.findAll))

productRoutes.get("/:id", adaptRoute(controller.findOne));

productRoutes.post("/", adaptRoute(controller.create));

productRoutes.delete("/:id", adaptRoute(controller.remove));

productRoutes.put("/:id", adaptRoute(controller.edit));

export { productRoutes };