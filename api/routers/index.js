import express from "express";
import { router as productRoutes } from "./products/products.routes.js";
import { router as cartRoutes } from "./cart/cart.routes.js";
import { allowAccess } from "../middlewares/allowAccess.js";

export const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(allowAccess);

router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
