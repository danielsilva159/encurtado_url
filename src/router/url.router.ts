import { Router } from "express";
import UrlController from "../controllers/url.controller";

const urlRouter = Router();
const urlController = new UrlController();

urlRouter.post("/", urlController.registrarUrl);

export default urlRouter;
