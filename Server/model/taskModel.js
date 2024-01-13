import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export const deleteTaskFromBase = async (taskId) => {
  await pool.query(`
  DELETE FROM Zadania WHERE Id=${taskId}
  `);
};

export const getTaskName = async (taskId) => {
  const task = await pool.query(`SELECT Nazwa FROM Zadania WHERE Id=${taskId}`);

  return task[0][0]["Nazwa"];
};

export const addTask = async (data) => {
  console.log("Przypał");
};
