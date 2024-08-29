import { Request, Response } from "express";
import UrlRepositories from "../repositories/url.repositories";
import UrlService from "../services/url.service";
import UsuarioRepositories from "../repositories/usuario.repositories";

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
}
