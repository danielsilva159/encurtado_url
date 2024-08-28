import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";

const usuarioRouter = Router();

const usuarioController = new UsuarioController();

usuarioRouter.post("/", usuarioController.registrar);

export default usuarioRouter;
