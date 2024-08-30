import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "./config/env";
import "express-async-errors";
import routes from "./router";
import AppError from "./erros/appError";
import AppDataSource from "./databases/index";
import Auth from "./config/auth";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../public/swagger.json";

AppDataSource.initialize()
  .then(() => {
    console.log("Base de Dado iniciada com sucesso");
  })
  .catch((error) => {
    console.log("senha", Number(process.env.POSTGRES_PORT));

    console.log(error);
  });
const app = express();
const auth = new Auth();
app.use(express.json());
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      url: "public/swagger.json",
    },
  })
);
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
app.listen(3333, () => {
  console.log("Server iniciado na porta 3333");
});
