import express from "express";
import {
  changeProfileName,
  deleteUser,
  profileInfo,
  changeUserPassword,
} from "./../controllers/profileControler.js";

const router = express.Router();

router.patch("/change_name", changeProfileName);
router.delete("/delete_account", deleteUser);
router.patch("/change_password", changeUserPassword);
router.get("/profile_info", profileInfo);

export default router;
