import { Router } from "express";
import UrlController from "../controllers/url.controller";

const urlRouter = Router();
const urlController = new UrlController();

/**
 * @swagger
 * /url:
 *   post:
 *     summary: Cria uma nova url encurtada
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://www.youtube.com"
 *
 *     responses:
 *       201:
 *         description: url criada com sucesso
 *       400:
 *         description: Dados inválidos
 *
 */
urlRouter.post("/", urlController.registrarUrl);
/**
 * @swagger
 * /url:
 *   get:
 *     summary: Listar urls encurtadas do usuário logado
 *     responses:
 *       201:
 *         description: listar urls do usuário
 *       400:
 *         description: Dados inválidos
 *
 */
urlRouter.get("/", urlController.listarUrls);
/**
 * @swagger
 * /url/${id}:
 *   post:
 *     summary: Abrir url encurtada
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da url a ser atualizado
 *     responses:
 *       201:
 *         description: usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *
 */
urlRouter.get("/:id", urlController.urlAcessada);
/**
 * @swagger
 * /atualizar-item/{id}:
 *   put:
 *     summary: Atualiza url original da Url encurtada
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da url a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Nome"
 *               descricao:
 *                 type: string
 *                 example: "Nova descrição do item"
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Item não encontrado
 */
urlRouter.put("/:id", urlController.editarUrl);
/**
 * @swagger
 * /url/{id}:
 *   delete:
 *     summary: Deleta uma url encurtada
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da url a ser deletado
 *     responses:
 *       200:
 *         description: url deletada com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Item não encontrado
 */
urlRouter.delete("/:id", urlController.deletarUrl);

export default urlRouter;
