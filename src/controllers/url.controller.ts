import { Request, Response } from "express";
import UrlRepositories from "../repositories/url.repositories";
import UrlService from "../services/url.service";
import UsuarioRepositories from "../repositories/usuario.repositories";
import AppError from "../erros/appError";

export default class UrlController {
  async registrarUrl(request: Request, response: Response) {
    const email = request.user ? request.user.email : "";
    const { url } = request.body;
    const urlRepositories = new UrlRepositories();
    const usuarioRepositories = new UsuarioRepositories();
    const createUrlEncurtada = new UrlService(
      urlRepositories,
      usuarioRepositories
    );
    console.log("email", email);

    const urls = await createUrlEncurtada.criarUrlEncurtada(
      url,
      request.headers.host as string,
      email
    );

    return response.json(urls);
  }

  async listarUrls(request: Request, response: Response) {
    if (!request.user) {
      throw new AppError("Usuario não logado", 400);
    }
    const email = request.user.email;
    const urlRepositories = new UrlRepositories();
    const usuarioRepositories = new UsuarioRepositories();
    const urlService = new UrlService(urlRepositories, usuarioRepositories);
    const urls = await urlService.listarUrls(email);
    return response.json(urls);
  }
}
