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

export function showMain(req, res) {
  console.log(req.params);
  let access;
  switch (req.params.acs * 1) {
    case 1:
      access = "administratora";
      break;
    case 2:
      access = "menadzera";
      break;
    case 3:
      access = "pracownika";
      break;
    default:
      access = "obserwatora";
      break;
  }

  res
    .status(200)
    .send(
      `Witaj: ${req.params.usr}, twoj poziom uprawnien jest na poziomie ${access}`
    );
  //   res.sendFile(`${__dirname}/Client/main_page.html`);
}
