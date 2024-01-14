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

export const getAllProjectsData = async () => {
  const projects = await pool.query(`
    SELECT
      p.ID,
      p.Nazwa AS Nazwa_Projektu,
      z.Nr_zespolu,
      p.Id_priorytetu,
      pr.Priorytety AS Priorytet,
      p.Id_statusu,
      s.Nazwa AS Status,
      DATE_FORMAT(p.Data_start, '%Y-%m-%d') AS Data_start,
      DATE_FORMAT(p.Data_koniec, '%Y-%m-%d') AS Data_koniec
    FROM
      Projekty p
    JOIN Priorytety pr ON p.Id_priorytetu = pr.Id
    JOIN Zespoly z ON p.Id_zespolu = z.Id
    JOIN Status s ON p.Id_statusu = s.Id;`);

  return projects[0];
};

export const getProjectTasks = async (projectId) => {
  const project = await pool.query(`
  SELECT
    zad.ID,
    zad.Nazwa AS Opis_Zadania,
    s.Nazwa AS Status,
    p.Imie,
    p.Nazwisko
  FROM
    Zadania zad
  JOIN Status s ON zad.Id_statusu = s.Id
  JOIN Pracownicy p ON zad.Id_pracownika = p.Id
  WHERE
    Id_projektu=${projectId}
  `);

  return project[0];
};

export const getPeopleFromTeam = async (projectId) => {
  const teamIdquery = await pool.query(`
  SELECT
    Projekty.Id_zespolu
  FROM
    Projekty
  WHERE
    ID=${projectId}`);
  const teamId = teamIdquery[0][0]["Id_zespolu"];

  const peopleInTeam = await pool.query(`
  SELECT 
    zespoly.Id, 
    zespoly.Nr_zespolu,
    pracownicy.Imie,
    pracownicy.Nazwisko 
  FROM 
    zespoly 
  INNER JOIN pracownicy ON pracownicy.Id = zespoly.Czlonek 
  WHERE zespoly.Nr_zespolu = ${teamId};
  `);

  return peopleInTeam[0];
};

export const insertProject = async (project) => {
  // const state = await pool.query(
  //   `SELECT Id FROM Status WHERE Nazwa='${project.state}'`
  // );
  // const stateId = state[0][0]["Id"];

  const priority = await pool.query(
    `SELECT Id FROM Priorytety WHERE Priorytety.Priorytety='${project["priority"]}'`
  );
  const priorityId = priority[0][0]["Id"];

  const projectCheckPresence = await pool.query(
    `SELECT * FROM Projekty WHERE Nazwa='${project["projectName"]}'`
  );
  // console.log(projectCheckPresence);
  // Using object convertion checking if the project exist
  // if (projectCheckPresence.length > 0 && projectCheckPresence[0]['Data_koniec'].length ) {
  //   return false;
  // } else {
  await pool.query(`
    INSERT INTO
      Projekty
      (Nazwa, Id_zespolu, Id_priorytetu, Id_statusu, Opis, Data_start, Data_koniec)
    VALUES
    (
      '${project["projectName"]}',
      ${parseInt(project["assignedTeam"], 10)},
      ${parseInt(priorityId, 10)},
      ${project["state"]},
      '${project["description"]}',
      '${project["startDate"]}',
      '${project["endDate"]}'
    )
  `);

  return true;
  // }
};
