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

app.post("/signin", (req, res) => {
    // Connection to the db and redirecting to the home page
    pool.query('INSERT INTO Users (Login, Password) VALUES (?,?)', [req.body.login,req.body.password]);
    console.log(req.body);
    console.log(`Login: ${req.body.login}`);
    console.log(`Hasło: ${req.body.password}`);
    res.redirect("/");
});

// Express server will start listening on the port in port variable
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

