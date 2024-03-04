import { validationResult } from "express-validator";
import { Category } from "../models/packages/packageCategory.js";
import { Package } from "../models/packages/package.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("packages");
    res.status(200).json(categories);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId).populate("packages");
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const createPackageCategoty = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }
    const { name_ar, name_en } = req.body;
    const newCategory = new Category({ name_en, name_ar });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const createPackage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }
    const { categoryId } = req.params;
    const { title_en, title_ar, price, features } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      const error = new Error("This category don`t exist");
      error.statusCode = 422;
      throw error;
    }
    const newPackage = new Package({
      title_en,
      title_ar,
      price,
      features,
      categoryId,
    });
    await newPackage.save();
    category.packages.push(newPackage._id);
    await category.save();
    res.status(201).json(newPackage);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
