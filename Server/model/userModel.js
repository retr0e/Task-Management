import mysql from "mysql2";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import validator from "email-validator";

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

export const addAccountAndEmployee = async (data) => {
  try {
    const { name, surname, pesel, position, username, email, password } = data;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const loginCorrectness = validator.validate(email);
    const duplicationCorrectness = await checkLogin(email);

    if (loginCorrectness && duplicationCorrectness) {
      await pool.query(`
      INSERT INTO
          Pracownicy (Imie, Nazwisko, Stanowisko, PESEL)
      VALUES (
          '${name}',
          '${surname}',
          '${position}',
          '${pesel}'
      )`);

      const employee = await pool.query(
        `SELECT Id FROM Pracownicy WHERE PESEL=${pesel}`
      );

      const employeeId = employee[0][0]["Id"];

      await pool.query(`
      INSERT INTO 
          Konta (Id_pracownika, Nazwa, Login, Haslo, Uprawnienia) 
      VALUES (
          ${employeeId},
          '${username}',
          '${email}',
          '${hashedPassword}',
          4
      )`);
    }
  } catch (error) {
    console.log(error);
    console.log("Error Occured when adding a employee");
  }
};

export const getAllEmployees = async () => {
  const employees = pool.query(`
  SELECT *
  FROM Pracownicy
  JOIN Konta ON Pracownicy.Id = Konta.Id_pracownika;
  `);
  return employees[0];
};
