import express from "express";
import {
  addClient,
  deleteOurClient,
  editClientData,
  getOurClients,
} from "../controllers/our_clients_ctrl.js";

const router = express.Router();

router.get("/", getOurClients);
router.post("/", addClient);
router.put("/:id", editClientData);
router.delete("/:id", deleteOurClient);
export default router;
