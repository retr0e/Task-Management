import express from "express";
import {
  addPeopleToTeam,
  selectTeamForPeople,
} from "./../controllers/teamController.js";

const router = express.Router();

router.post("/add_to_team", addPeopleToTeam);
router.post("/check_presence", selectTeamForPeople);

export default router;
