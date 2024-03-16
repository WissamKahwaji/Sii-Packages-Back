import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  name_en: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  },
  packages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Package",
    },
  ],
  samples: [
    {
      name: String,
      name_ar: String,
      samples: [
        {
          img: String,
          link: String,
          secondLink: String,
        },
      ],
      videos: [{ link: String }],
    },
  ],
});

const categoryPackageSchema = new Schema(
  {
    name_en: {
      type: String,
      required: true,
    },
    name_ar: {
      type: String,
      required: true,
    },
    description_ar: String,
    description_en: String,

    packages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Package",
      },
    ],
    subcategories: [subCategorySchema],
    hasSubcategories: Boolean,
    bio_en: String,
    bio_ar: String,
    samples: [
      {
        name: String,
        samples: [
          {
            img: String,
            link: String,
            secondLink: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categoryPackageSchema);
