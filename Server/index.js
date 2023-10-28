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
            return false;
        }
    };

    return true;
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Client/login.html");
});

app.post("/signup", async (req, res) => {
    const loginCorrectness = validator.validate(req.body.login);
    const duplicationCorrectness = await checkLogin(req.body.login);
    const plainPassword = req.body.password;

    // Check if the email address is valid and there is no other user with the same e-mail address
    if (loginCorrectness && duplicationCorrectness) {
        bcrypt.hash(plainPassword, 10, function(err, hash) {
            pool.query('INSERT INTO Users (Login, Password) VALUES (?,?)', [req.body.login,hash]);
        });
    }
    res.redirect("/");
});

app.post("/signin", async (req, res) => {
    const dbValues = await pool.query(`SELECT Login,Password FROM Users WHERE login = ?`, [req.body.login]);

    if (dbValues[0].length === 0) {
        console.log('User not found!');
        res.redirect('/');
        return;
    }

    // Check the authorization
    const passwordMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(req.body.password, dbValues[0][0].Password, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });


    if (req.body.login == dbValues[0][0].Login && passwordMatch) {
        res.redirect("/Client/main_page.html");
    } else {
        console.log('Login Data is incorrect!');
        res.redirect("/");
    }
    
});

app.get("/Client/main_page.html", (req, res) => {
    res.sendFile(__dirname + "/Client/main_page.html");
});

app.post("/signout", (req, res) => {
    res.redirect("/");
})

// Express server will start listening on the port in port variable
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
