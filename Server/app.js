import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import overviewRouter from "./routes/overviewRoutes.js";

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES

app.use("/api/v1/users", userRouter);
app.use("/overview", overviewRouter);

// START SERVER
export default app;
