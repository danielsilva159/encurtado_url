import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "./config/env.ts";
import "express-async-errors";
import routes from "./router";
import AppError from "./erros/appError.ts";
import AppDataSource from "./databases/index.ts";

AppDataSource.initialize()
  .then(() => {
    console.log("Base de Dado iniciada com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });
const app = express();
app.use(express.json());

app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: "error", message: err.message });
    } else {
      return response
        .status(500)
        .json({ status: "error", message: "Interval server error" });
    }
  }
);
app.listen(3333, () => {
  console.log("Server iniciado na porta 3333");
});
