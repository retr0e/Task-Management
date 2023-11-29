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

  res.sendFile(`${__dirname}/Client/main_page.html`);
}
