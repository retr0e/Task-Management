import mysql from "mysql2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./config.env" });

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
  const cooki = req.cookies["access_toke"];

  if (!cooki) {
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
  } else {
    res.status(500).json({
      success: false,
      message: "The authentication rejected the update",
    });
  }
};

export const deleteUser = async (req, res, next) => {
  const cooki = req.cookies["access_token"];
  const userId = jwt.verify(cooki, process.env.JWT_SECRET).id;
  try {
    await pool.query(`DELETE FROM Konta WHERE Id_konta=${userId};`);
    res.clearCookie("access_token");
    res.status(204).json({
      success: true,
      message: "Deletion succesful",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete account can not be performed!",
    });
    next(err);
  }
};
