import express from "express";
import {
  changeProfileName,
  deleteUser,
  profileInfo,
  changeUserPassword,
  checkActive,
} from "./../controllers/profileControler.js";

const router = express.Router();

router.patch("/change_name", changeProfileName);
router.route("/delete_account").post(checkActive).patch(deleteUser);
router.patch("/change_password", changeUserPassword);
router.get("/profile_info", profileInfo);

export default router;
