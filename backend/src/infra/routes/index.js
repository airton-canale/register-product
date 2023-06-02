import { Router } from "express";
import { productRoutes } from "./products.routes.js";

const router = Router();

router.use("/product", productRoutes);

export { router };   