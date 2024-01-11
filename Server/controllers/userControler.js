import mysql from "mysql2";
import bcryptjs from "bcryptjs";
import validator from "email-validator";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
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

async function checkLogin(providedLogin) {
  const dbFetchLogin = await pool.query(`SELECT Login FROM Konta`);
  const logins = dbFetchLogin[0];

  for (const element of logins) {
    if (element.Login == providedLogin) {
      // The user with provided login is present in data base
      return false;
    }
  }

  return true;
}

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const loginCorrectness = validator.validate(email);
  const duplicationCorrectness = await checkLogin(email);

  if (loginCorrectness && duplicationCorrectness) {
    try {
      await pool.query(
        "INSERT INTO Konta (Nazwa, Login, Haslo, Uprawnienia) VALUES (?,?,?,?)",
        [username, email, hashedPassword, 4]
      );
      res.status(201).json("User created successfully!");
    } catch (err) {
      res.status(500).json("Something went wrong! In user creation!");
      next(err);
    }
  } else {
    res.status(400).json("Bad data!");
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
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
  console.log(req.cookies);
  const token = req.cookies.access_token;

  if (!token) {
    res.status(500).json({ success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      userID: decoded.id,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
