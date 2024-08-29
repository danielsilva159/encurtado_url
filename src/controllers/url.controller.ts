import { Request, Response } from "express";
import UrlRepositories from "../repositories/url.repositories";
import UrlService from "../services/url.service";
import UsuarioRepositories from "../repositories/usuario.repositories";
import AppError from "../erros/appError";

export default class UrlController {
  async registrarUrl(request: Request, response: Response) {
    const id = request.user ? request.user.id : null;
    const { url } = request.body;
    const createUrlEncurtada = new UrlService();

    const urls = await createUrlEncurtada.criarUrlEncurtada(
      url,
      request.headers.host as string,
      id
    );

    return response.json(urls);
  }

  async listarUrls(request: Request, response: Response) {
    if (!request.user) {
      throw new AppError("Usuario não logado", 400);
    }
    const id = request.user.id;
    const urlService = new UrlService();
    const urls = await urlService.listarUrls(id);
    return response.json(urls);
  }

  async editarUrl(request: Request, response: Response) {
    const { id } = request.params;
    const { novaUrl } = request.body;
    const idUsuario = request.user.id;
    const urlService = new UrlService();
    const retorno = await urlService.editarUrl(Number(id), idUsuario, novaUrl);
    return response.json(retorno);
  }
  async deletarUrl(request: Request, response: Response) {
    const { id } = request.params;
    const idUsuario = request.user.id;
    const urlService = new UrlService();
    const retorno = await urlService.deleteUrl(Number(id), idUsuario);
    return response.json(retorno);
  }
}
