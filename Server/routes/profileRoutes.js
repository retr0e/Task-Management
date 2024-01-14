import express from "express";
import {
  changeProfileName,
  deleteUser,
  profileInfo,
} from "./../controllers/profileControler.js";

const router = express.Router();

router.patch("/change_name", changeProfileName);
router.delete("/delete_account", deleteUser);
router.get("/profile_info", profileInfo);

export default router;
