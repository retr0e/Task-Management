import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Client/index.html");
});

app.post("/signup", (req, res) => {
    console.log(req.body);
    pool.query('INSERT INTO Users (Login, Password) VALUES (?,?)', [req.body.login,req.body.password]);
    res.redirect("/");
});

app.post("/signin", async (req, res) => {
    const dbValues = await pool.query(`SELECT *
    FROM Users
    WHERE login = ? AND password = ?`, [req.body.login,req.body.password]);
    if (req.body.login == dbValues[0][0].Login && req.body.password == dbValues[0][0].Password) {
        res.redirect("/Client/main_page.html");
    } else {
        console.log('dane logowania sie nie zgadzaja');
        res.redirect("/");
    }
    
});

app.get("/Client/main_page.html", (req, res) => {
    res.sendFile(__dirname + "/Client/main_page.html");
});

// Express server will start listening on the port in port variable
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

