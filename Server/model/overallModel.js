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

export const getAllStates = async () => {
  const states = await pool.query(`SELECT Nazwa FROM Status`);
  let result = [];

  for (const obj of states[0]) {
    result.push(obj["Nazwa"]);
  }

  return result;
};

export const getAllPriorities = async () => {
  const priorities = await pool.query(`SELECT Priorytety FROM Priorytety`);
  let result = [];

  for (const obj of priorities[0]) {
    result.push(obj["Priorytety"]);
  }

  return result;
};

export const getAllTeams = async () => {
  const teams = await pool.query(`SELECT DISTINCT Nr_zespolu FROM Zespoly`);
  let result = [];

  for (const obj of teams[0]) {
    result.push(obj["Nr_zespolu"]);
  }

  return result;
};

export const getAllPersons = async (projectId) => {
  const employees = await pool.query(`SELECT Pracownicy.*, Zespoly.Nr_zespolu
  FROM Pracownicy
  LEFT JOIN Zespoly ON Pracownicy.Id = Zespoly.Czlonek
  WHERE Nr_zespolu='${projectId}';
  `);

  let result = [];

  for (const obj of employees[0]) {
    result.push(
      obj["Imie"] +
        " " +
        obj["Nazwisko"] +
        " " +
        obj["Stanowisko"] +
        " " +
        obj["Id"]
    );
  }

  return result;
};
