import { getAllProjectsData } from "./../model/projectModel.js";

export async function getProjects(req, res, next) {
  try {
    const projects = await getAllProjectsData();

    res.status(200).json({
      result: projects[0],
    });
  } catch (err) {
    res.status(500).json("Unable to reach values from server");
    next(err);
  }
}
