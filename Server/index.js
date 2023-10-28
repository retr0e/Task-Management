import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import validator from 'email-validator';

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

async function checkLogin(providedLogin) {
    const dbFetchLogin = await pool.query(`SELECT Login FROM Users`);
    const logins = dbFetchLogin[0];
    
    for(const element of logins) {
        if (element.Login == providedLogin) {
            // The user with provided login is present in data base
            console.log('Found!');
            return false;
        }
    };

    return true;
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Client/index.html");
});

app.post("/signup", async (req, res) => {
    const loginCorrectness = validator.validate(req.body.login);
    const duplicationCorrectness = await checkLogin(req.body.login);
    const plainPassword = req.body.password;

    console.log(loginCorrectness);
    console.log(duplicationCorrectness);
    // Check if the email address is valid and there is no other user with the same e-mail address
    if (loginCorrectness && duplicationCorrectness) {
        bcrypt.hash(plainPassword, 10, function(err, hash) {
            pool.query('INSERT INTO Users (Login, Password) VALUES (?,?)', [req.body.login,hash]);
        });
    }
    res.redirect("/");
});

app.post("/signin", async (req, res) => {
    const dbValues = await pool.query(`SELECT 
    Login
    FROM Users
    WHERE login = ?`, [req.body.login]);

    console.log(dbValues);
    // Check the authorization
    let passwordValid = false;

    bcrypt.compare(req.body.password, dbValues[0].Password, function(err, result) {
        console.log(result);
        if (result) {
            console.log(result);
            passwordValid = true;
        }
    })

    console.log(`Login: ${dbValues.Login}`);
    if (req.body.login == dbValues[0].Login && passwordValid) {
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
