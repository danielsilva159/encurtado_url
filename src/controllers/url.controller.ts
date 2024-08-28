import { Request, Response } from "express";
import UrlRepositories from "../repositories/url.repositories";
import UrlService from "../services/url.service";

export default class UrlController {
  async registrarUrl(request: Request, response: Response) {
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
