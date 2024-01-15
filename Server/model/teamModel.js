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

export const checkPeopleInTeam = async (people, teamId) => {
  // console.log(people);

  for (let i = 0; i < people.length; i++) {
    const presence = await pool.query(
      `SELECT Zespoly.Nr_zespolu FROM Zespoly WHERE Czlonek='${people[i]["Id"]}' AND Nr_zespolu='${teamId}'`
    );

    if (presence[0].length != 0) {
      people[i]["isChecked"] = true;
    } else {
      people[i]["isChecked"] = false;
    }
  }

  return people;
};
