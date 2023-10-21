import express from "express";
import mysql from "mysql2";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'pbw_base'
}).promise();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Client/index.html");
});

// Express server will start listening on the port in port variable
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

