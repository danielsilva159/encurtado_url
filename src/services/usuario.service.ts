import { hash } from "bcryptjs";
import UsuarioRepositories from "../repositories/usuario.repositories";
import AppError from "../erros/appError";

interface Request {
  nome: string;
  email: string;
  senha: string;
}

export default class UsuarioService {
  private usuarioRepositories: UsuarioRepositories;

  constructor(usuarioRepositories: UsuarioRepositories) {
    this.usuarioRepositories = usuarioRepositories;
  }
  public async criarUsuario({ nome, email, senha }: Request) {
    try {
      const senhaHash = await hash(senha, 8);
      const usuario = this.usuarioRepositories.registrar({
        nome,
        email,
        senha: senhaHash,
      });
      return usuario;
    } catch (error) {
      throw error;
    }
  }
}
