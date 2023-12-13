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
    res.status(202).json({
      success: true,
      message: "Update succesful",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Update can not be performed!",
    });
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const cooki = req.rawHeaders[3].split("=")[1];
  const userId = jwt.verify(cooki, process.env.JWT_SECRET).id;
  console.log(userId);
  try {
    await pool.query(`DELETE FROM Konta WHERE Id_konta=${userId};`);
    res.clearCookie("access_token");
    res.status(204).json({
      success: true,
      message: "Update succesful",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete account can not be performed!",
    });
    next(err);
  }
};
