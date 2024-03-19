import express from "express";
import {
  addClient,
  deleteOurClient,
  editClientData,
  getOurClients,
} from "../controllers/our_clients_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getOurClients);
router.post("/", auth, addClient);
router.put("/:id", auth, editClientData);
router.delete("/:id", auth, deleteOurClient);
export default router;
