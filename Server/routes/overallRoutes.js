import express from "express";
import {
  getStates,
  getPriorities,
  debug,
  getTeams,
  getEmployeesById,
  getEmployees,
} from "../controllers/overallController.js";

const router = express.Router();

router.get("/get_states", getStates);
router.get("/get_priorities", getPriorities);
router.get("/get_teams", getTeams);
router.post("/get_employees", getEmployeesById);
router.get("/get_all_employees", getEmployees);
router.get("/debbug", debug);

export default router;
