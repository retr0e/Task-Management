import mysql from "mysql2";
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

export const actionLog = async (performer, performedAction) => {
  const date = new Date();
  let currentTime =
    date.getMonth() + 1 < 10
      ? `${date.getFullYear()}-0${date.getMonth() + 1}-`
      : `${date.getFullYear()}-${date.getMonth() + 1}-`;
  currentTime =
    date.getDate() < 10
      ? currentTime + `0${date.getDate()}`
      : currentTime + `${date.getDate()}`;
  currentTime =
    currentTime +
    ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  await pool.query(`
    INSERT INTO
        Historia_Aktywnosci (Data, Dzialanie, Id_pracownika)
    VALUES (
        '${currentTime}',
        '${performedAction}',
        ${parseInt(performer)}
    )
     `);
};
