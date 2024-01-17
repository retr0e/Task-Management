import mysql from "mysql2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bcryptjs from "bcryptjs";
import {
  getProfileInfo,
  changePassword,
  fetchActiveAccounts,
  deactivateAccount,
} from "../model/profileModel.js";

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

export const changeUserPassword = (req, res) => {
  try {
    const userId = jwt.verify(
      req.cookies["access_token"],
      process.env.JWT_SECRET
    ).id;

    if (req.body["password"] == req.body["passwordConfirmation"]) {
      changePassword(bcryptjs.hashSync(req.body["password"], 10), userId);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Cannot perform a user password modification",
    });
  }
};

export const checkActive = async (req, res) => {
  try {
    const people = await fetchActiveAccounts(req.body["persons"]);
    res.status(200).json({
      status: "success",
      people: people,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Cannot check accounts due to server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const people = await deactivateAccount(req.body["persons"]);
    res.status(200).json({
      status: "success",
      people: people,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Cannot update accounts due to server error",
    });
  }
};
