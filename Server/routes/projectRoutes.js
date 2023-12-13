import express from "express";
import { getProjects } from "./../controllers/projectControler.js";
const router = express.Router();

router.get("/get_projects", getProjects);

export default router;
