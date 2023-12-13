import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

let __dirname = path.dirname(fileURLToPath(import.meta.url));
__dirname = path.join(__dirname + "/..");

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getProjects(req, res, next) {
  try {
    const projects = await pool.query(`SELECT * FROM Projekty`);
    console.log(projects);
  } catch (err) {
    res.status(500).json("Unable to reach values from server");
    next(err);
  }
}
