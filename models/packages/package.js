import mongoose from "mongoose";

const Schema = mongoose.Schema;
const packageSchema = new Schema(
  {
    title_en: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: [
      {
        title_en: String,
        tital_ar: String,
      },
    ],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Package = mongoose.model("Package", packageSchema);
