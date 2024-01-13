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
  const states = await pool.query(`SELECT * FROM Status`);

  return states[0];
};

export const getAllPrivileges = async () => {
  const privileges = await pool.query(`SELECT * FROM Priorytety`);

  return privileges[0];
};
