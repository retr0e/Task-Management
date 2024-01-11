import express from "express";
import {
  getProjects,
  getProjectInformation,
} from "./../controllers/projectControler.js";

const router = express.Router();

router.get("/get_projects", getProjects);

router.get("/get_project/:id", getProjectInformation);

export default router;
