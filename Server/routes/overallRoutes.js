import express from "express";
import {
  getStates,
  getPriorities,
  debug,
  getTeams,
} from "../controllers/overallController.js";
const router = express.Router();

router.get("/get_states", getStates);
router.get("/get_priorities", getPriorities);
router.get("/get_teams", getTeams);
router.get("/debbug", debug);

export default router;
