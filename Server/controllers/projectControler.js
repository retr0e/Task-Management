import {
  getAllProjectsData,
  getProjectTasks,
  insertProject,
} from "./../model/projectModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

export async function getProjects(req, res, next) {
  try {
    const projects = await getAllProjectsData();

    res.status(200).json({
      result: projects,
    });
  } catch (err) {
    res.status(500).json("Unable to reach projects values from server");
    next(err);
  }
}

export const getProjectInformation = async (req, res, next) => {
  try {
    const tasks = await getProjectTasks(Number(req.params["id"]));

    res.status(200).json({
      status: "success",
      projectTasks: tasks,
    });
  } catch (err) {
    res.status(500).json("Unable to reach project value from server");
    next(err);
  }
};

export const addProject = async (req, res, next) => {
  let today = new Date();
  let dd = today.getDate();

  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;

  const project = {
    name: "Nazwa projektu",
    assignedTeam: 1,
    priority: 2,
    state: 1,
    startDate: today,
    endDate: today,
  };

  insertProject(project);

  res.status(200).json({
    status: "success",
    message: "Project succesfuly inserted",
    object: project,
  });
};
