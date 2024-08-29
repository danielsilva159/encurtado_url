import { Router } from "express";
import UrlController from "../controllers/url.controller";

const urlRouter = Router();
const urlController = new UrlController();

urlRouter.post("/", urlController.registrarUrl);
urlRouter.get("/", urlController.listarUrls);

export default urlRouter;
