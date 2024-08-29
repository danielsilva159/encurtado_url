import { Router } from "express";
import usuarioRouter from "./usuario.router";
import urlRouter from "./url.router";
import sessaoRouter from "./sessao.router";
import Auth from "../config/auth";

const routes = Router();
const prefixRoutes = "/api/v1";
routes.use(`${prefixRoutes}/usuario`, usuarioRouter);
routes.use(`${prefixRoutes}/url`, urlRouter);
routes.use(`${prefixRoutes}/sessao`, sessaoRouter);
export default routes;
