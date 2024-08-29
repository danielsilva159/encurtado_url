import { Router } from "express";
import UrlController from "../controllers/url.controller";

const urlRouter = Router();
const urlController = new UrlController();

urlRouter.post("/", urlController.registrarUrl);
urlRouter.get("/", urlController.listarUrls);
urlRouter.get("/:id", urlController.urlAcessada);
urlRouter.put("/:id", urlController.editarUrl);
urlRouter.delete("/:id", urlController.deletarUrl);

export default urlRouter;
