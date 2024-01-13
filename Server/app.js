import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import overallRoutes from "./routes/overallRoutes.js";

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

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
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/overall", overallRoutes);

// START SERVER
export default app;
