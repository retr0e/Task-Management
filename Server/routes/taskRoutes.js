import express from "express";
import {
  deleteTask,
  addTask,
  editTask,
  changeDescription,
  reassignPerson,
} from "../controllers/taskController.js";

const router = express.Router();

router
  .route("/:id")
  .post(addTask)
  .patch(editTask)
  .put(changeDescription)
  .delete(deleteTask);

router.patch("/executor/:id", reassignPerson);

export default router;
