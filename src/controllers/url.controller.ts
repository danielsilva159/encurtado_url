import { Request, Response } from "express";
import AppError from "../erros/appError";
import UrlService from "../services/url.service";

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
      throw new AppError("Usuario não logado", 401);
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

  async urlAcessada(request: Request, response: Response) {
    const url = `${request.headers.host as string}/api/v1/url/${
      request.params.id
    }`;
    const urlService = new UrlService();
    const urlEncontrada = await urlService.abrirURL(url);

    return response.redirect(urlEncontrada);
  }
}
