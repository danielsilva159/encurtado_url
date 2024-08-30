import { Router } from "express";
import sessaoRouter from "./sessao.router";
import urlRouter from "./url.router";
import usuarioRouter from "./usuario.router";
import swaggerJsDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Defina as opções do Swagger
const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de encurtar url",
      version: "1.0.0",
      description:
        "Sistema de encurtar url com cadastramento de usuario e o crud da url encurtada",
    },
    servers: [
      {
        url: "http://localhost:3333/api/v1", // URL do seu servidor
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/router/*.ts"], // Caminho para seus arquivos de rotas
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const routes = Router();
const prefixRoutes = "/api/v1";
routes.use(`${prefixRoutes}/usuario`, usuarioRouter);
routes.use(`${prefixRoutes}/url`, urlRouter);
routes.use(`${prefixRoutes}/sessao`, sessaoRouter);
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
export default routes;
