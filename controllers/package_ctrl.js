import { validationResult } from "express-validator";
import { Category } from "../models/packages/packageCategory.js";
import { Package } from "../models/packages/package.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("packages").populate({
      path: "subcategories",
      populate: "packages",
    });
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
    const category = await Category.findById(categoryId)
      .populate("packages")
      .populate({
        path: "subcategories",
        populate: "packages",
      });
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
    const {
      name_ar,
      name_en,
      description_ar,
      description_en,
      hasSubcategories,
    } = req.body;
    const newCategory = new Category({
      name_en,
      name_ar,
      description_ar,
      description_en,
      hasSubcategories,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const editCategoryInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name_ar,
      name_en,
      description_ar,
      description_en,
      hasSubcategories,
    } = req.body;
    const category = await Category.findById(id);
    if (name_en) category.name_en = name_en;
    if (name_ar) category.name_ar = name_ar;
    if (description_ar) category.description_ar = description_ar;
    if (description_en) category.description_en = description_en;
    if (hasSubcategories) category.hasSubcategories = hasSubcategories;

    const savedData = await category.save();

    return res.status(200).json(savedData);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    return res
      .status(200)
      .json({ message: "Category data deleted successfully" });
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
    const {
      title_en,
      title_ar,
      price,
      features,
      isPopular,
      isMonthly,
      subTitle_en,
      subTitle_ar,
    } = req.body;
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
      isPopular,
      isMonthly,
      subTitle_en,
      subTitle_ar,
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

export const createPackageToSubCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }

    const { categoryId, subId } = req.params;

    const {
      title_en,
      title_ar,
      price,
      features,
      isPopular,
      isMonthly,
      subTitle_en,
      subTitle_ar,
    } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      const error = new Error("This category doesn't exist");
      error.statusCode = 422;
      throw error;
    }

    const subcategory = category.subcategories.find(
      sub => sub._id.toString() === subId
    );
    // const subcategory = "65f4092d18f52c30cf8a282e";
    if (!subcategory) {
      const error = new Error(
        "This subcategory doesn't exist in the given category"
      );
      error.statusCode = 422;
      throw error;
    }

    const newPackage = new Package({
      title_en,
      title_ar,
      price,
      features,
      categoryId,
      isPopular,
      isMonthly,
      subTitle_en,
      subTitle_ar,
    });
    await newPackage.save();

    subcategory.packages.push(newPackage._id);
    await category.save();

    res.status(201).json(newPackage);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getPackageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const packageInfo = await Package.findById(id);
    if (!packageInfo) {
      const error = new Error("This Package don`t exist");
      error.statusCode = 422;
      throw error;
    }
    res.status(200).json(packageInfo);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const editPackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title_en,
      title_ar,
      price,
      features,
      isPopular,
      isMonthly,
      subTitle_en,
      subTitle_ar,
    } = req.body;

    const itemPackage = await Package.findById(id);
    if (!itemPackage) {
      const error = new Error("This Package don`t exist");
      error.statusCode = 422;
      throw error;
    }
    if (title_en) itemPackage.title_en = title_en;
    if (title_ar) itemPackage.title_ar = title_ar;
    if (price) itemPackage.price = price;
    if (features) itemPackage.features = features;
    if (isPopular) itemPackage.isPopular = isPopular;
    if (isMonthly) itemPackage.isMonthly = isMonthly;
    if (subTitle_en != "undefined") itemPackage.subTitle_en = subTitle_en;
    if (subTitle_ar != "undefined") itemPackage.subTitle_ar = subTitle_ar;

    const savedPackage = await itemPackage.save();

    return res.status(200).json(savedPackage);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deletePackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    const category = await Category.findById(deletedPackage.categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found for the package" });
    }

    category.packages.pull(id);

    await category.save();

    return res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const uploadVideo = async (req, res, next) => {
  try {
    const videoPath =
      req.files && req.files["video"] ? req.files["video"][0].path : null;
    const videoUrl = videoPath
      ? `${process.env.BASE_URL}${videoPath.replace(/\\/g, "/")}`
      : null;
    return res.status(200).json(videoUrl);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
export const uploadImages = async (req, res, next) => {
  try {
    const inputImages = req.files["imgs"];
    const imageUrls = [];
    if (!inputImages || !Array.isArray(inputImages)) {
      return res
        .status(404)
        .json({ message: "Attached files are missing or invalid." });
    }
    for (const image of inputImages) {
      if (!image) {
        return res
          .status(404)
          .json({ message: "Attached file is not an image." });
      }

      const imageUrl =
        `${process.env.BASE_URL}` + image.path.replace(/\\/g, "/");
      imageUrls.push(imageUrl);
    }

    return res.status(200).json(imageUrls);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const addSampleToCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { sampleName, link, secondLink, subId } = req.body;
    const imgPath =
      req.files && req.files["img"] ? req.files["img"][0].path : null;
    const imgUrl = imgPath
      ? `${process.env.BASE_URL}${imgPath.replace(/\\/g, "/")}`
      : null;
    const category = await Category.findById(categoryId);
    if (!category) {
      const error = new Error("This category doesn't exist");
      error.statusCode = 422;
      throw error;
    }

    const sample = category.samples.find(sam => sam.name === sampleName);

    const newSample = {
      img: imgUrl,
    };
    if (link) newSample.link = link;
    if (secondLink) newSample.secondLink = secondLink;
    sample.samples.push(newSample);

    if (category.hasSubcategories && category.hasSubcategories == true) {
      const subSample = category.subcategories.find(
        item => item._id.toString() === subId
      );
      const sample2 = subSample.samples.find(samp => samp.name === sampleName);
      sample2.samples.push(newSample);
    }

    await category.save();

    res.status(201).json(category);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
