import { Router } from "express";
import SessaoController from "../controllers/sessao.controller";
import Auth from "../config/auth";

const sessaoRouter = Router();
const auth = new Auth();
const sessaoController = new SessaoController();

/**
 * @swagger
 * /sessao:
 *   post:
 *     summary: Cria uma nova sessao, gerando token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: email
 *                 example: "daniel@email.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Sessão iniciada
 *       400:
 *         description: Dados inválidos
 *
 */
sessaoRouter.post("/", sessaoController.criarSessao);

export default sessaoRouter;
