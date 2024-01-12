import {
  getAllProjectsData,
  getProjectTasks,
  insertProject,
} from "./../model/projectModel.js";
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
  console.log('req.params');
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
  // Calculating current date
  const date = new Date();
  let currentTime =
    date.getMonth() + 1 < 10
      ? `${date.getFullYear()}-0${date.getMonth() + 1}-`
      : `${date.getFullYear()}-${date.getMonth() + 1}-`;
  currentTime =
    date.getDate() < 10
      ? currentTime + `0${date.getDate()}`
      : currentTime + `${date.getDate()}`;
  console.log(currentTime);

  const endTimeDay =
    date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  let endTimeMonth = date.getMonth();

  // const endTime;

  const project = {
    projectName: req.body["projectName"],
    assignedTeam: req.body["assignedTeam"],
    priority: req.body["projectPriority"],
    state: 1,
    startDate: currentTime,
    endDate: endTime,
  };

  if (insertProject(project)) {
    res.status(200).json({
      status: "success",
      message: "Project succesfuly inserted",
      object: project,
    });
  } else {
    res.status(500).json({
      status: "failed",
      message: "Unable to add a project",
    });
  }
};
