import AppDataSource from "../databases";
import { UrlsEntity } from "../databases/entity/urls.entity";
import { UsuarioEntity } from "../databases/entity/usuario.entity";
import UrlInterface from "../interface/url.interface";
import UsuarioInterface from "../interface/usuario.interface";
import IUrlRepositories from "./IUrl.repositories";

export default class UrlRepositories implements IUrlRepositories {
  private app = AppDataSource.getRepository(UrlsEntity);
  async registrar(
    url: string,
    urlEncurtada: string,
    id: number | null = null
  ): Promise<UrlInterface> {
    const query: any = {
      url_original: url,
      url_encurtada: urlEncurtada,
    };
    if (id) {
      query.user = { id };
    }
    await this.app.save(query);
    return { url_original: url, url_encurtada: urlEncurtada };
  }
  listarUrls(): Promise<UrlInterface[]> {
    const urls = this.app.find();
    return urls;
  }
}
