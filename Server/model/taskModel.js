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

export const insertTask = async (data) => {
  await pool.query(
    `INSERT INTO Zadania (Nazwa, Id_projektu, Id_statusu, Id_pracownika, Description) 
    VALUES (
      '${data["taskName"]}',
      ${parseInt(data["projectId"], 10)},
      1,
      ${parseInt(data["person"], 10)},
      '${data["description"]}'
    )`
  );
};

export const patchTask = async (newValues) => {
  const stateCode = await pool.query(
    `SELECT Id FROM Status WHERE Nazwa='${newValues["state"]}'`
  );

  await pool.query(
    `UPDATE Zadania SET Id_statusu=${stateCode[0][0]["Id"]} WHERE Id=${newValues["id"]}`
  );
};

export const putDescription = async (description, taskId) => {
  await pool.query(
    `UPDATE Zadania SET Description='${description}' WHERE Id='${taskId}'`
  );
};

export const patchAssignedEmployee = async (newPerson, taskId) => {
  await pool.query(
    `UPDATE Zadania SET Id_pracownika='${newPerson}' WHERE Id='${taskId}'`
  );
};
