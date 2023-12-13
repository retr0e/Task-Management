import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

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

export const changeProfileName = async (req, res, next) => {
  const updatedName = req.body["newName"];
  const cooki = req.rawHeaders[1].split("=")[1];
  const userId = jwt.verify(cooki, process.env.JWT_SECRET).id;
  try {
    await pool.query(
      `UPDATE Konta SET Nazwa="${updatedName}" WHERE Id_konta=${userId};`
    );
    res.status(202).json("Name Changed!");
  } catch (err) {
    res.status(500).json("For some reason server can't change name");
    next(err);
  }
};
