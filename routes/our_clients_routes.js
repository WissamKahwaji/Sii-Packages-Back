import express from "express";
import { getOurClients } from "../controllers/our_clients_ctrl.js";

const router = express.Router();

router.get("/", getOurClients);

export default router;
