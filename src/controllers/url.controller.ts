import { Request, Response } from "express";
import UrlRepositories from "../repositories/url.repositories";
import UrlService from "../services/url.service";
import Auth from "../config/auth";

export default class UrlController {
  async registrarUrl(request: Request, response: Response) {
    const auth = new Auth();

    const { url } = request.body;
    const urlRepositories = new UrlRepositories();
    const createUrlEncurtada = new UrlService(urlRepositories);
    const urls = await createUrlEncurtada.criarUrlEncurtada(
      url,
      request.headers.host as string
    );

    return response.json(urls);
  }
}
