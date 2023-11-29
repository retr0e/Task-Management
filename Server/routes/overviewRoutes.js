import express from "express";

import { showMain } from "../controllers/overviewControler.js";

const router = express.Router();

router.route("/:usr/:acs").get(showMain);

export default router;
