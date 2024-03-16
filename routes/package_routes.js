import express from "express";
import { check } from "express-validator";
import {
  createPackage,
  createPackageCategoty,
  createPackageToSubCategory,
  deleteCategory,
  deletePackage,
  editCategoryInfo,
  editPackage,
  getCategories,
  getCategoryById,
  getPackageById,
  uploadVideo,
} from "../controllers/package_ctrl.js";

const router = express.Router();
router.get("/byId/:id", getPackageById);
router.put("/edit/:id", editPackage);
router.delete("/delete/:id", deletePackage);

router.get("/categories", getCategories);
router.get("/category/:id", getCategoryById);
router.put("/category/:id", editCategoryInfo);
router.delete("/category/:id", deleteCategory);
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

    check("categoryId").isMongoId().withMessage("Invalid category ID"),
  ],
  createPackage
);

router.post(
  "/add-to-subcategory/:categoryId/:subId",
  createPackageToSubCategory
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

router.post("/upload-video", uploadVideo);

export default router;
