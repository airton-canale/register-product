import { Router } from "express";
import { productRoutes } from "./product.routes.js";

const router = Router();

router.use("/product", productRoutes);

export { router };