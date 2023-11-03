require("dotenv").config();
const app = require("express")();
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";

import { ErrorHandler, globalErrorHandler } from "./utils/errorHandler";
import router from "./routes/route";
import AppDataSource from "./config/database.config";
import { ERROR_CODES } from "../common/statusCode";

const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(error.name, error.message);
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression({ level: 6, threshold: 1000 }));

app.use("/", router);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(
    new ErrorHandler(
      `Route ${req.originalUrl} not found!`,
      ERROR_CODES["NOT FOUND"]
    )
  );
});

app.use(globalErrorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("Data source has been initiaised!");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((error: Error) => {
    console.log(error.message);
  });

process.on("unhandledRejection", (error: Error) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(error.name, error.message);
  app.close(() => process.exit(1));
});
