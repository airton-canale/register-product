import { Router } from "express";
import { create, edit, findAll, findOne, remove } from "../http/controllers/products.controller.js"
import { adaptRoute } from "../adapters/express-router-adapter.js";

const productRoutes = Router();

productRoutes.get("/list", adaptRoute(findAll))

productRoutes.get("/:id", adaptRoute(findOne));

productRoutes.post("/", adaptRoute(create));

productRoutes.delete("/:id", adaptRoute(remove));

productRoutes.put("/:id", adaptRoute(edit));

export { productRoutes };