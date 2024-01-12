import express from "express";

import {
  signup,
  signin,
  logout,
  checkAuthentication,
  privilegeLevel,
} from "../controllers/userControler.js";

const router = express.Router();

router.get("/logout", logout);
router.get("/check_authentication", checkAuthentication);
router.get("/privilege", privilegeLevel);
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
