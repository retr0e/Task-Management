import express from "express";

import {
  getLoginPage,
  signup,
  getOverview,
} from "../controllers/userControler.js";

const router = express.Router();

router.route("/").get(getLoginPage).post(signup);
router.route("/login").post(getOverview);

export default router;
