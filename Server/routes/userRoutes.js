import express from "express";

import {
  signup,
  signin,
  logout,
  checkAuthentication,
  privilegeLevel,
  getUserTeams,
} from "../controllers/userControler.js";

const router = express.Router();

router.get("/logout", logout);
router.get("/check_authentication", checkAuthentication);
router.get("/privilege", privilegeLevel);
router.post("/signup", signup);
router.post("/signin", signin);

router.get("/team", getUserTeams);

export default router;
