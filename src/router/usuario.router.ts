import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";

const usuarioRouter = Router();

const usuarioController = new UsuarioController();

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um novo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Daniel"
 *               email:
 *                 type: email
 *                 example: "daniel@email.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *
 */
usuarioRouter.post("/", usuarioController.registrar);

export default usuarioRouter;
