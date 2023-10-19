import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

// use node {fileName} to start listening on port
// Ctrl+C -> exit the server listening state
