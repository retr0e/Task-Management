import express from "express";
import {
  deleteTask,
  addTask,
  editTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.route("/:id").post(addTask).patch(editTask).delete(deleteTask);

export default router;
