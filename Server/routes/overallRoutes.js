import express from "express";
import { getStates, getPrivileges } from "../controllers/overallController.js";
const router = express.Router();

router.get("/get_states", getStates);
router.get("/get_privileges", getPrivileges);

export default router;
