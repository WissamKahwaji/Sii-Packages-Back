import express from "express";
import { check } from "express-validator";
import {
  createPackage,
  createPackageCategoty,
  getCategories,
  getCategoryById,
} from "../controllers/package_ctrl.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/category/:id", getCategoryById);

router.post(
  "/add/:categoryId",
  [
    check("title_en")
      .trim()
      .not()
      .isEmpty()
      .withMessage("English title is required"),
    check("title_ar")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Arabic title is required"),
    check("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    check("categoryId").isMongoId().withMessage("Invalid category ID"),
  ],
  createPackage
);

router.post(
  "/category",
  [
    check("name_en")
      .trim()
      .not()
      .isEmpty()
      .withMessage("English title is required"),
    check("name_ar")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Arabic title is required"),
  ],
  createPackageCategoty
);

export default router;
