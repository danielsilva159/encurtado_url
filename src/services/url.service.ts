import md5 from "md5";
import UrlRepositories from "../repositories/url.repositories";
export default class UrlService {
  private urlRepositories: UrlRepositories = new UrlRepositories();
  async criarUrlEncurtada(
    url: string,
    baseUrl: string,
    id: number | null = null
  ) {
    const urlEncurtada = md5(`${new Date()}${url}`);
    const hash6 = urlEncurtada.slice(0, 6);
    const urls = this.urlRepositories.registrar(
      url,
      `${baseUrl}/api/v1/url/${hash6}`,
      id
    );
    return urls;
  }

  async listarUrls(id: number) {
    const urls = await this.urlRepositories.listarUrls(id);
    return urls;
  }

  async editarUrl(id: number, idUsuario: number, novaUrl: string) {
    return await this.urlRepositories.editarUrl(id, idUsuario, novaUrl);
  }

  async deleteUrl(id: number, idUsuario: number) {
    return await this.urlRepositories.deletarUrl(id, idUsuario);
  }
}
