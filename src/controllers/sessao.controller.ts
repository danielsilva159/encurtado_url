import { Request, Response } from "express";
import UsuarioRepositories from "../repositories/usuario.repositories";
import SessaoService from "../services/sessao.service";

export default class SessaoController {
  async criarSessao(request: Request, response: Response) {
    const { email, senha } = request.body;
    const usuarioRepositories = new UsuarioRepositories();
    const sessaoService = new SessaoService(usuarioRepositories);
    const sessao = await sessaoService.registrar({ email, senha });
    console.log(sessao);

    return response.json(sessao);
  }
}
