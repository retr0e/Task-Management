import mysql from "mysql2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { getProfileInfo } from "../model/profileModel.js";

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
  const cooki = req.cookies["access_token"];

  if (cooki) {
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

// NOT TESTED!
export const deleteUser = async (req, res, next) => {
  const userId = jwt.verify(
    req.cookies["access_token"],
    process.env.JWT_SECRET
  ).id;
  const priv = jwt.verify(
    req.cookies["privilege"],
    process.env.JWT_SECRET
  ).privilege;

  // Admin can not delete himself
  if (priv == 1) {
    res.status(500).json({
      success: false,
      message: "Delete account can not be performed on admin!",
    });
    next();
  }

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

export const profileInfo = async (req, res) => {
  try {
    const userId = jwt.verify(
      req.cookies["access_token"],
      process.env.JWT_SECRET
    ).id;

    const userInfo = await getProfileInfo(userId);
    res.status(200).json({
      status: "success",
      info: userInfo,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Cannot fetch info about user",
    });
  }
};
