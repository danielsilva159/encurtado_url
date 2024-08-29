import AppDataSource from "../databases";
import { UrlsEntity } from "../databases/entity/urls.entity";
import { UsuarioEntity } from "../databases/entity/usuario.entity";
import UrlInterface from "../interface/url.interface";
import UsuarioInterface from "../interface/usuario.interface";
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
    console.log(id);

    const urls = await this.app
      .createQueryBuilder("url")
      .leftJoinAndSelect("url.user", "usuario")
      .where({ user: { id } })
      .getMany();

    return urls;
  }
}
