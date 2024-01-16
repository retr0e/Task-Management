import {
  deleteTaskFromBase,
  getTaskName,
  insertTask,
  patchTask,
} from "../model/taskModel.js";
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
  console.log(req.body);
  const employeeName = req.body["person"].split(" ")[3];

  const task = {
    taskName: req.body["taskName"],
    person: employeeName,
    projectId: req.body["projectId"],
    description: req.body["description"],
    startDate: req.body["startDate"],
  };

  insertTask(task);
};

export const editTask = async (req, res) => {
  try {
    const newData = {
      id: req.body["taskId"],
      state: req.body["status"],
    };

    patchTask(newData);
    res.status(200).json({
      status: "success",
      message: "Task correctly modified",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Task not modified. Server failed to perform this request",
    });
  }
};

export const changeDescription = (req, res) => {
  console.log("pomidor");
};
