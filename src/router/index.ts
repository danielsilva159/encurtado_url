import { Router } from "express";
import usuarioRouter from "./usuario.router";
import urlRouter from "./url.router";

const routes = Router();
const prefixRoutes = "/api/v1";

routes.use(`${prefixRoutes}/usuario`, usuarioRouter);
routes.use(`${prefixRoutes}/url`, urlRouter);
export default routes;
