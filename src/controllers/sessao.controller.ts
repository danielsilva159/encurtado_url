import { NextFunction, Request, Response } from "express";
import UsuarioRepositories from "../repositories/usuario.repositories";
import SessaoService from "../services/sessao.service";
import AppError from "../erros/appError";
import { verify } from "jsonwebtoken";

export default class SessaoController {
  async criarSessao(request: Request, response: Response) {
    const { email, senha } = request.body;
    const usuarioRepositories = new UsuarioRepositories();
    const sessaoService = new SessaoService(usuarioRepositories);
    const sessao = await sessaoService.registrar({ email, senha });

    return response.json(sessao);
  }

  async verificarToken(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const token = request.headers.authorization?.split("Bearer")[1].trim();
    if (!token) {
      throw new AppError("Usuario não autorizado", 401);
    }
    const secret = process.env.APP_SECRET || "";
    console.log(token);

    verify(token, "secret", (error, decoded) => {
      console.log("error", error);
      console.log("decoded", decoded);

      if (error) {
        throw new AppError("Falha na autenticação", 500);
      }
    });
    console.log("Passou");
    next();
  }
}
