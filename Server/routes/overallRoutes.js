import express from "express";
import {
  getStates,
  getPrivileges,
  debug,
} from "../controllers/overallController.js";
const router = express.Router();

router.get("/get_states", getStates);
router.get("/get_privileges", getPrivileges);
router.get("/debbug", debug);

export default router;
