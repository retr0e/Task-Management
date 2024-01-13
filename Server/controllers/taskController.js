import { deleteTaskFromBase, getTaskName } from "../model/taskModel.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

export const deleteTask = async (req, res) => {
  actionLog(
    jwt.verify(req.cookies["access_token"], process.env.JWT_SECRET),
    `Usuniecie zadania ${getTaskName(req.params["id"])}`
  );

  deleteTaskFromBase(req.params["id"]);
  res.status(200);
};

export const addTask = async (req, res) => {
  console.log("Dodawanie zadania");
};

export const editTask = async (req, res) => {
  console.log("Edytowanie zadania");
};
