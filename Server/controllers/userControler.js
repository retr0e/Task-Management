import mysql from "mysql2";
import bcrypt from "bcrypt";
import validator from "email-validator";
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

export function getLoginPage(req, res) {
  res.sendFile(`${__dirname}/Client/login.html`);
}

export async function signup(req, res) {
  const loginCorrectness = validator.validate(req.body.login);
  const duplicationCorrectness = await checkLogin(req.body.login);
  const plainPassword = req.body.password;

  // Check if the email address is valid and there is no other user with the same e-mail address
  if (loginCorrectness && duplicationCorrectness) {
    bcrypt.hash(plainPassword, 10, function (err, hash) {
      pool.query(
        "INSERT INTO Konta (Login, Haslo, Uprawnienia) VALUES (?,?,?)",
        [req.body.login, hash, 4]
      );
    });
  }

  res.redirect(`/api/v1/users`);
}

export async function getOverview(req, res) {
  const dbValues = await pool.query(
    `SELECT Login,Haslo FROM Konta WHERE login = ?`,
    [req.body.login]
  );

  if (dbValues[0].length === 0) {
    console.log("User not found!");
    res.redirect("/");
    return;
  }
  console.log("Przechodze tu!");
  console.log(dbValues);
  console.log(req.body);
  // Check the authorization
  const passwordMatch = await new Promise((resolve, reject) => {
    bcrypt.compare(
      req.body.password,
      dbValues[0][0].Haslo,
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });

  if (req.body.login == dbValues[0][0].Login && passwordMatch) {
    res.redirect("/api/v1/users/overview");
  } else {
    console.log("Login Data is incorrect!");
    res.redirect(`/api/v1/users`);
  }
}

export function mainPage(req, res) {
  res.sendFile(`${__dirname}/Client/main_page.html`);
}

// app.get("/overview", (req, res) => {
//   res.sendFile(__dirname + "/Client/main_page.html");
// });

// app.post("/signout", (req, res) => {
//   res.redirect("/");
// });
