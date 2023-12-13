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
    const projects = await pool.query(`
    SELECT
      p.ID,
      p.Nazwa AS Nazwa_Projektu,
      z.Nr_zespolu,
      pr.Priorytety AS Priorytet,
      s.Nazwa AS Status,
      DATE_FORMAT(p.Data_start, '%Y-%m-%d') AS Data_start,
      DATE_FORMAT(p.Data_koniec, '%Y-%m-%d') AS Data_koniec
    FROM
      Projekty p
    JOIN Priorytety pr ON p.Id_priorytetu = pr.Id
    JOIN Zespoly z ON p.Id_zespolu = z.Id
    JOIN Status s ON p.Id_statusu = s.Id;`);
    // console.log(projects);
    res.status(200).json({
      result: projects[0],
    });
  } catch (err) {
    res.status(500).json("Unable to reach values from server");
    next(err);
  }
}
