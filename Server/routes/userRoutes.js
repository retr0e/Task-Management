import express from "express";

import {
  getLoginPage,
  signup,
  getOverview,
  mainPage,
} from "../controllers/userControler.js";

const router = express.Router();

router.route("/").get(getLoginPage).post(signup);
router.route("/login").post(getOverview);

router.route("/overview").get(mainPage);

export default router;
