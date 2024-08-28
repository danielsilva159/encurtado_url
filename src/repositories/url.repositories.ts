import AppDataSource from "../databases";
import { UrlsEntity } from "../databases/entity/urls.entity";
import UrlInterface from "../interface/url.interface";
import IUrlRepositories from "./IUrl.repositories";

export default class UrlRepositories implements IUrlRepositories {
  private app = AppDataSource.getRepository(UrlsEntity);
  async registrar(url: string, urlEncurtada: string): Promise<UrlInterface> {
    await this.app.save({
      url_original: url,
      url_encurtada: urlEncurtada,
    });
    return { url_original: url, url_encurtada: urlEncurtada };
  }
  listarUrls(): Promise<UrlInterface[]> {
    throw new Error("Method not implemented.");
  }
}
