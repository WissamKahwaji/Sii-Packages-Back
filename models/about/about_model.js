import mongoose from "mongoose";

const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  ourVision: String,
  ourMission: String,
  ourValues: String,
  ourVision_ar: String,
  ourMission_ar: String,
  ourValues_ar: String,
});

export const AboutModel = mongoose.model("about", aboutSchema);
