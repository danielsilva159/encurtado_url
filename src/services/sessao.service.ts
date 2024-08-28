import AppDataSource from "../databases";
import { UsuarioEntity } from "../databases/entity/usuario.entity";
import AppError from "../erros/appError";
import UsuarioInterface from "../interface/usuario.interface";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import UsuarioRepositories from "../repositories/usuario.repositories";

interface Request {
  email: string;
  senha: string;
}

interface response {
  token: string;
  usuario: UsuarioInterface;
}

export default class SessaoService {
  private usuario: UsuarioRepositories;
  constructor(usuario: UsuarioRepositories) {
    this.usuario = usuario;
  }
  async registrar({ email, senha }: Request) {
    const usuario = await this.usuario.procurarUsuarioPorEmail(email);
    if (!usuario) {
      throw new AppError("Usuário não encontrado", 400);
    }
    const verificarSenha = await compare(senha, usuario.senha as string);

    if (!verificarSenha) {
      throw new AppError("Credenciais invalidas", 401);
    }
    const segredo = process.env.APP_SECRET as string;

    const token = sign({ email: usuario.email, nome: usuario.nome }, segredo, {
      expiresIn: 3000,
    });
    return token;
  }
}
