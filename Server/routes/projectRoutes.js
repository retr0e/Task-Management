import express from "express";
import {
  getProjects,
  getProjectInformation,
  addProject,
  changeProjectStatePriority,
  changeDescription,
} from "./../controllers/projectControler.js";

const router = express.Router();

router.get("/get_projects", getProjects);

router
  .route("/get_project/:id")
  .get(getProjectInformation)
  .patch(changeProjectStatePriority);

router.patch("/:id", changeDescription);

router.post("/add_project", addProject);

export default router;
