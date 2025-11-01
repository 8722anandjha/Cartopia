import express from "express";
import { bestSeller, creatProducts, deleteProduct, filterProducts, findProductByID, newArrivals, similarProducts, updateProducts } from "../controllers/product.controller.js";
import protect, { admin } from "../middleware/auth.middleware.js";
const router = express.Router();

//@route POST /api/products
router.post("/", protect, admin, creatProducts);

// @route PUT/api/products/:id
router.put("/:id", protect, admin, updateProducts);

// @route DELETE/api/products/:id
router.delete("/:id", protect, admin, deleteProduct);

// @router Get /api/products
router.get("/", filterProducts);

// @route GET /api/products/new-arrivals
router.get("/new-arrivals", newArrivals);

// @route Get /api/products/best-seller

router.get("/best-seller",bestSeller);

// @route Get /api/product/:id
router.get("/:id",findProductByID);

// @route Get/api/products/similar/:id
router.get("/similar/:id",similarProducts);

export default router;
