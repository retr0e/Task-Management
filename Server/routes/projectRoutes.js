import express from "express";
import {
  getProjects,
  getProjectInformation,
  addProject,
  deleteProject,
} from "./../controllers/projectControler.js";

const router = express.Router();

router.get("/get_projects", getProjects);

router
  .route("/get_project/:id")
  .get(getProjectInformation)
  .delete(deleteProject);

router.post("/add_project", addProject);

export default router;
