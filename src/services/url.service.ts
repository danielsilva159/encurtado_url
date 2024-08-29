import UrlRepositories from "../repositories/url.repositories";
import md5 from "md5";
import UsuarioRepositories from "../repositories/usuario.repositories";
import UsuarioInterface from "../interface/usuario.interface";
export default class UrlService {
  private urlRepositories: UrlRepositories;
  private usuarioRepositories: UsuarioRepositories;
  constructor(
    urlRepositories: UrlRepositories,
    usuarioRepositories: UsuarioRepositories
  ) {
    this.urlRepositories = urlRepositories;
    this.usuarioRepositories = usuarioRepositories;
  }
  async criarUrlEncurtada(url: string, baseUrl: string, email: string = "") {
    let id: number | null = null;
    if (email) {
      const usuario = await this.usuarioRepositories.procurarUsuarioPorEmail(
        email
      );
      id = usuario?.id || null;
    }

    const urlEncurtada = md5(`${new Date()}${url}`);
    const hash6 = urlEncurtada.slice(0, 6);
    const urls = this.urlRepositories.registrar(
      url,
      `${baseUrl}/api/v1/url/${hash6}`,
      id
    );
    return urls;
  }
}
