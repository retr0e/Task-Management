import {
  getAllProjectsData,
  getPeopleFromTeam,
  getProjectTasks,
  insertProject,
  getStatusAndPriorities,
  getProjectInfo,
  patchProject,
} from "./../model/projectModel.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

export async function getProjects(req, res, next) {
  try {
    const projectData = await getStatusAndPriorities();

    res.status(200).json({
      result: projectData["data"],
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
    const projectInfo = await getProjectInfo(req.params["id"]);

    res.status(200).json({
      status: "success",
      projectTasks: tasks,
      peopleWorking: people,
      info: projectInfo,
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

export const changeProjectStatePriority = (req, res) => {
  try {
    const newData = {
      id: req.body["projectId"],
      state: req.body["status"],
      priority: req.body["priorytet"],
    };

    patchProject(newData);
    res.status(200).json({
      status: "success",
      message: "Project data correctly changed",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Unable to update project data due to server error",
    });
  }
};
