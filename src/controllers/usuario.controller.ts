import { Request, Response } from "express";
import UsuarioRepositories from "../repositories/usuario.repositories";
import UsuarioService from "../services/usuario.service";

export default class UsuarioController {
  async registrar(request: Request, response: Response) {
    const { nome, senha, email } = request.body;
    const usuarioRepositories = new UsuarioRepositories();
    const novoUsuario = new UsuarioService(usuarioRepositories);
    const usuario = await novoUsuario.criarUsuario({ nome, email, senha });

    return response.json(usuario);
  }
}
