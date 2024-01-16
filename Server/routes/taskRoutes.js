import express from "express";
import {
  deleteTask,
  addTask,
  editTask,
  changeDescription,
} from "../controllers/taskController.js";

const router = express.Router();

router
  .route("/:id")
  .post(addTask)
  .patch(editTask)
  .put(changeDescription)
  .delete(deleteTask);

export default router;
