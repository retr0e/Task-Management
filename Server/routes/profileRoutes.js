import express from "express";
import { changeProfileName } from "./../controllers/profileControler.js";

const router = express.Router();

router.patch("/change_name", changeProfileName);

export default router;
