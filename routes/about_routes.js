import express from "express";
import {
  editAboutData,
  getAboutData,
  requestPackage,
  sendEmail,
} from "../controllers/about_ctrl.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getAboutData);
router.put("/edit", auth, editAboutData);
router.post("/send-email", sendEmail);
router.post("/request-package", requestPackage);

export default router;
