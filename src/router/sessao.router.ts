import { Router } from "express";
import SessaoController from "../controllers/sessao.controller";
import Auth from "../config/auth";

const sessaoRouter = Router();
const auth = new Auth();
const sessaoController = new SessaoController();
sessaoRouter.post("/", sessaoController.criarSessao);
sessaoRouter.get("/", sessaoController.verificarToken);

export default sessaoRouter;
