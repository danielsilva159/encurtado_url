import md5 from "md5";
import UrlRepositories from "../repositories/url.repositories";
import AppError from "../erros/appError";
export default class UrlService {
  private urlRepositories: UrlRepositories = new UrlRepositories();
  async criarUrlEncurtada(
    url: string,
    baseUrl: string,
    id: number | null = null
  ) {
    const regex = /^https?:\/\/.*/i;

    if (!regex.test(url)) {
      throw new AppError(
        "Sua url não tem http ou https, por favor coloque",
        400
      );
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
  async abrirURL(url: string) {
    const urlEncontrada = await this.urlRepositories.procurarPorUrl(url);

    if (!urlEncontrada) {
      throw new AppError("Essa url não existe", 400);
    }
    await this.urlRepositories.adicionarVisualizacao(urlEncontrada.id);
    return urlEncontrada.url_original;
  }
}
