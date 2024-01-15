import express from "express";
import { addPeopleToTeam } from "./../controllers/teamController.js";

const router = express.Router();

router.post("/add_to_team", addPeopleToTeam);

export default router;
