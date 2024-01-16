import mysql from "mysql2";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { actionLog } from "../model/logModel.js";
import dotenv from "dotenv";
import { addAccountAndEmployee, getTeams } from "../model/userModel.js";

dotenv.config({ path: "./config.env" });

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export const signup = async (req, res, next) => {
  try {
    addAccountAndEmployee(req.body);

    // actionLog(
    //   jwt.verify(req.cookies["access_token"], process.env.JWT_SECRET),
    //   `Dodanie uzytkownika: ${req.body["username"]}`
    // );
    res.status(201).json("User created successfully!");
  } catch (err) {
    res.status(500).json("Something went wrong! In user creation!");
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUserData = await pool.query(
      `SELECT Id_konta,Login,Haslo,Uprawnienia FROM Konta WHERE login = ?`,
      [email]
    );
    const validUser = validUserData[0][0];

    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.Haslo);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials! "));

    // Creating necesarry cookies
    // Login token
    const token = jwt.sign(
      {
        id: validUser.Id_konta,
        iss: "task-manager-app",
        aud: "task-manager-users",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Privilege token
    const privilegeCookie = jwt.sign(
      {
        privilege: validUser.Uprawnienia,
        iss: "task-manager-app",
        aud: "task-manager-users",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { Haslo: pass, ...rest } = validUser;
    actionLog(
      validUser.Id_konta,
      `Uzytkownik: ${validUserData[0][0]["Login"]}, zalogowal sie do systemu`
    );
    res
      .cookie("access_token", token, { httpOnly: true })
      .cookie("privilege", privilegeCookie, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({
    success: true,
    isAuthenticated: false,
    message: "Logout successful",
  });
};

export const checkAuthentication = (req, res) => {
  try {
    const token = req.cookies["access_token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      userID: decoded.id,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const privilegeLevel = (req, res) => {
  try {
    const levelOfPrivilege = jwt.verify(
      req.cookies["privilege"],
      process.env.JWT_SECRET
    );
    res.status(200).json({
      success: true,
      userPrivilege: levelOfPrivilege,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const getUserTeams = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.cookies["access_token"],
      process.env.JWT_SECRET
    );
    console.log(decoded);
    const teams = await getTeams(decoded["id"]);

    res.status(200).json({
      status: "success",
      teams: teams,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
};
