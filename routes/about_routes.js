import express from "express";
import {
  getAboutData,
  requestPackage,
  sendEmail,
} from "../controllers/about_ctrl.js";

const router = express.Router();

router.get("/", getAboutData);
router.post("/send-email", sendEmail);
router.post("/request-package", requestPackage);

export default router;
