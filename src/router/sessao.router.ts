import { Router } from "express";
import SessaoController from "../controllers/sessao.controller";

const sessaoRouter = Router();
const sessaoController = new SessaoController();
sessaoRouter.post("/", sessaoController.criarSessao);

export default sessaoRouter;
