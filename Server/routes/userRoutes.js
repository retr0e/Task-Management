import express from "express";

import {
  signup,
  signin,
  logout,
  checkAuthentication,
} from "../controllers/userControler.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);
router.get("/check_authentication", checkAuthentication);

export default router;
