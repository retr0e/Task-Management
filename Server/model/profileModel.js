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
