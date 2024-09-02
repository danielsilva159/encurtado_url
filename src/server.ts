import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import Auth from "./config/auth";
import "./config/env";
import AppDataSource from "./databases/index";
import AppError from "./erros/appError";
import routes from "./router";

AppDataSource.initialize()
  .then(() => {
    console.log("Base de Dado iniciada com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });
const app = express();
const auth = new Auth();
app.use(express.json());
app.use(auth.verificarToken);
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: "error", message: err.message });
    }
    return response.status(500).json({
      err,
      status: "error",
      message: err.message,
    });
  }
);
app.listen(process.env.PORT_SERVER, () => {
  console.log(`Server iniciado na porta ${process.env.PORT_SERVER}`);
});
