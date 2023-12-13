import express from "express";
import {
  changeProfileName,
  deleteUser,
} from "./../controllers/profileControler.js";

const router = express.Router();

router.patch("/change_name", changeProfileName);
router.delete("/delete_account", deleteUser);

export default router;
