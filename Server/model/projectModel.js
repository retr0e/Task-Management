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
