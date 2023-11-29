import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES

app.use("/api/v1/users", userRouter);

// START SERVER
// module.exports = app;
export default app;
