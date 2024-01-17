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

export const getProfileInfo = async (employeeId) => {
  const profileInfo = await pool.query(`
    SELECT 
        Pracownicy.Imie AS Imie,
        Pracownicy.Nazwisko AS Nazwisko,
        Pracownicy.Stanowisko AS Stanowisko,
        Konta.Nazwa,
        Konta.Login,
        Konta.Uprawnienia 
    FROM Pracownicy 
    INNER JOIN Konta on Konta.Id_pracownika = Pracownicy.Id
    WHERE Konta.Id_konta='${employeeId}';`);

  return profileInfo[0][0];
};

export const changePassword = async (hashed, userId) => {
  await pool.query(
    `UPDATE Konta SET Haslo='${hashed}' WHERE Id_konta='${userId}';`
  );
};

export const fetchActiveAccounts = async (people) => {
  for (let i = 0; i < people.length; i++) {
    let checkActivation = await pool.query(
      `SELECT Aktywny FROM Konta WHERE Id_pracownika='${people[i]["Id"]}'`
    );
    checkActivation = checkActivation[0][0]["Aktywny"];

    if (checkActivation == 1) {
      people[i]["isActive"] = true;
    } else {
      people[i]["isActive"] = false;
    }
  }

  return people;
};

export const deactivateAccount = async (people) => {
  for (let i = 0; i < people.length; i++) {
    if (!people[i]["isActive"]) {
      const privilegeLevel = await pool.query(
        `SELECT Uprawnienia FROM Konta WHERE Id_pracownika='${people[i]["Id"]}'`
      );

      // CANNOT DEACTIVATE ADMIN!
      if (privilegeLevel[0][0]["Uprawnienia"] == 1) {
        people[i]["isActive"] = true;
        continue;
      }

      await pool.query(
        `UPDATE Konta SET Aktywny='0' WHERE Id_pracownika=${people[i]["Id"]}`
      );
    }
  }

  return people;
};
