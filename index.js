import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import packageRouter from "./routes/package_routes.js";
import aboutRouter from "./routes/about_routes.js";
import clientsRouter from "./routes/our_clients_routes.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    const filename = `${file.originalname.split(".")[0]}-${Date.now()}${ext}`;

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: "img", maxCount: 10 },
  ])
);

app.use("/package", packageRouter);
app.use("/about", aboutRouter);
app.use("/our-clients", clientsRouter);

app.get("/", (req, res) => res.send("Server is Ready"));

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on ${PORT}`);
    })
  )
  .catch(error => console.log(error.message));

mongoose.set("strictQuery", true);
