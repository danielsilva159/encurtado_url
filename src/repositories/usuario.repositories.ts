import AppDataSource from "../databases";
import { UsuarioEntity } from "../databases/entity/usuario.entity";
import AppError from "../erros/appError";
import UsuarioInterface from "../interface/usuario.interface";
import IUsuarioRepositories from "./IUsuario.repositories";

export default class UsuarioRepositories implements IUsuarioRepositories {
  private app = AppDataSource.getRepository(UsuarioEntity);
  procurarTodos(): Promise<UsuarioEntity[]> {
    throw new Error("Method not implemented.");
  }
  async registrar(usuario: UsuarioInterface): Promise<UsuarioInterface> {
    try {
      const user = {
        nome: usuario.nome,
        senha: usuario.senha,
        email: usuario.email,
      };
      const usuarioExiste = await this.procurarUsuarioPorEmail(usuario.email);

      if (usuarioExiste) {
        throw new AppError("usuario já existe", 301);
      }
      await this.app.save(user);
      delete user.senha;
      return user;
    } catch (error) {
      throw error;
    }
  }
  async procurarUsuarioPorEmail(
    email: string
  ): Promise<UsuarioInterface | null> {
    const usuario = await this.app.findOne({ where: { email } });
    return usuario;
  }
}
