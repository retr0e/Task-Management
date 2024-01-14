import {
  getAllProjectsData,
  getPeopleFromTeam,
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
  try {
    const tasks = await getProjectTasks(Number(req.params["id"]));
    const people = await getPeopleFromTeam(req.params["id"]);
    res.status(200).json({
      status: "success",
      projectTasks: tasks,
      peopleWorking: people,
    });
  } catch (err) {
    res.status(500).json("Unable to reach project value from server");
    next(err);
  }
};

export const addProject = async (req, res, next) => {
  console.log(req.body);

  const project = {
    projectName: req.body["projectName"],
    assignedTeam: req.body["team"],
    priority: req.body["priority"],
    // state: req.body["status"],
    state: 1,
    description: req.body["description"],
    startDate: req.body["startDate"],
    endDate: req.body["endDate"],
  };

  console.log(project);
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
