import mysql from "mysql2";
import dotenv from "dotenv";
import { getAllTeams } from "./overallModel.js";

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

export const checkPresence = async (people, teamId) => {
  const existingTeams = await getAllTeams();
  let allUnchecked = true;

  console.log(people);
  for (const obj of people) {
    if (obj["isChecked"] == true) {
      allUnchecked = false;
      break;
    }
  }

  // Below will be handle situation where nobody is toggled
  if (allUnchecked) {
    if (!existingTeams.includes(teamId)) {
      return people;
    }
  }

  for (let i = 0; i < people.length; i++) {
    const presence = await pool.query(
      `SELECT Zespoly.Nr_zespolu FROM Zespoly WHERE Czlonek='${people[i]["Id"]}' AND Nr_zespolu='${teamId}'`
    );

    // If person was already assigned to the team
    if (presence[0].length != 0) {
      if (people[i]["isChecked"]) {
        continue;
      } else {
        // If person was in the team but won't be anymore
        // Check if there is any task assigned to the person in current team
        const assignedTaskToEmployee = await pool.query(
          `SELECT * FROM Zadania JOIN Projekty ON Zadania.Id_projektu = Projekty.Id WHERE Id_pracownika='${people[i]["Id"]}' AND Id_zespolu='${teamId}';`
        );

        console.log(people[i]);
        console.log(assignedTaskToEmployee[0]);
        // Any task is assigned to person
        if (assignedTaskToEmployee[0].length != 0) {
          console.log(
            "Nie mozna usunac tego pracownika z zespolu poniewaz ma przypisane zadanie w projektach"
          );
          people[i]["isChecked"] = true;
          console.log(people[i]);
        } else {
          // No task assigned to person
          await pool.query(
            `DELETE FROM Zespoly WHERE Czlonek='${people[i]["Id"]}' AND Nr_zespolu='${teamId}'`
          );
          people[i]["isChecked"] = false;
        }
      }
    } else {
      // If person is new to the team
      if (people[i]["isChecked"]) {
        await pool.query(
          `INSERT INTO Zespoly (Nr_zespolu, Czlonek) VALUES (${teamId}, ${people[i]["Id"]} )`
        );
      }
    }
  }

  return people;
};
