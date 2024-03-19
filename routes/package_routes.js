import express from "express";
import { check } from "express-validator";
import {
  addSampleToCategory,
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
  uploadImages,
  uploadVideo,
} from "../controllers/package_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.get("/byId/:id", getPackageById);
router.put("/edit/:id", auth, editPackage);
router.delete("/delete/:id", auth, deletePackage);

router.get("/categories", getCategories);
router.get("/category/:id", getCategoryById);
router.put("/category/:id", auth, editCategoryInfo);
router.delete("/category/:id", auth, deleteCategory);
router.post(
  "/add/:categoryId",
  auth,
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
  auth,
  createPackageToSubCategory
);

router.post(
  "/category",
  auth,
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
router.post("/upload-imgs", uploadImages);

router.post("/:categoryId/add-sample", auth, addSampleToCategory);

export default router;
