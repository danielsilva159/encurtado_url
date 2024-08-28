import { UsuarioEntity } from "../databases/entity/usuario.entity";
import UsuarioInterface from "../interface/usuario.interface";

export default interface IUsuarioRepositories {
  procurarTodos(): Promise<UsuarioEntity[]>;
  registrar(usuario: UsuarioInterface): Promise<UsuarioInterface>;
  procurarUsuarioPorEmail(email: string): Promise<UsuarioInterface | null>;
}
