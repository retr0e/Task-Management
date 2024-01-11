import {
  getAllProjectsData,
  getProjectTasks,
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
    res.status(500).json("Unable to reach project values from server");
    next(err);
  }
}

export const getProjectInformation = async (req, res, next) => {
  console.log(req.params);
  const tasks = await getProjectTasks(Number(req.params["id"]));
  console.log(tasks);

  res.status(200).json({
    status: "success",
    message: "You hit correct route!",
    id: `The id is ${req.params.id}`,
  });
};
