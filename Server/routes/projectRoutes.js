import express from "express";
import {
  getProjects,
  getProjectInformation,
  addProject,
} from "./../controllers/projectControler.js";

const router = express.Router();

router.get("/get_projects", getProjects);

router.get("/get_project/:id", getProjectInformation);

router.post("/add_project", addProject);

export default router;
