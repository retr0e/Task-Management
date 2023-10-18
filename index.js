import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

// use node {fileName} to start listening on port
// Ctrl+C -> exit the server listening state