import AppDataSource from "../databases";
import { UrlsEntity } from "../databases/entity/urls.entity";
import AppError from "../erros/appError";
import UrlInterface from "../interface/url.interface";
import IUrlRepositories from "./IUrl.repositories";
interface Query {
  url_original: string;
  url_encurtada: string;
  user?: {
    id?: number;
  };
}

export default class UrlRepositories implements IUrlRepositories {
  private app = AppDataSource.getRepository(UrlsEntity);
  async registrar(
    url: string,
    urlEncurtada: string,
    id: number | null = null
  ): Promise<UrlInterface> {
    const query: Query = {
      url_original: url,
      url_encurtada: urlEncurtada,
    };
    if (id) {
      query.user = { id };
    }
    await this.app.save(query);
    return { url_original: url, url_encurtada: urlEncurtada };
  }
  async listarUrls(id: number): Promise<UrlInterface[]> {
    const urls = await this.app
      .createQueryBuilder("url")
      .leftJoinAndSelect("url.user", "usuario")
      .where({ user: { id } })
      .select([
        "url.id",
        "url.url_original",
        "url.url_encurtada",
        "url.data_create",
        "url.data_delete",
      ])
      .getMany();

    return urls;
  }

  async editarUrl(
    id: number,
    idUsuario: number,
    novaUrl: string
  ): Promise<UrlInterface> {
    const url = await this.app
      .createQueryBuilder("url")
      .leftJoinAndSelect("url.user", "usuario")
      .where({ id, user: { id: idUsuario } })
      .getOne();
    if (!url) {
      throw new AppError("Url não encontrada", 400);
    }
    url.url_original = novaUrl;
    const nova = (await this.app.save(url)) as UrlInterface;
    delete nova.user;
    return nova;
  }
  async deletarUrl(id: number, idUsuario: number): Promise<UrlInterface> {
    const url = await this.app
      .createQueryBuilder("url")
      .leftJoinAndSelect("url.user", "usuario")
      .where({ id, user: { id: idUsuario } })
      .getOne();
    if (!url) {
      throw new AppError("Url não encontrada", 400);
    }
    url.data_delete = new Date();
    const retorno = (await this.app.save(url)) as UrlInterface;
    delete retorno.user;
    return retorno;
  }
  async procurarPorUrl(url: string) {
    const retorno = await this.app.findOne({ where: { url_encurtada: url } });
    return retorno;
  }
  async adicionarVisualizacao(id: number): Promise<void> {
    const url = await this.app.findOne({ where: { id } });
    if (url) {
      url.qtdVisualicao = url.qtdVisualicao + 1;
      this.app.save(url);
    }
  }
}
