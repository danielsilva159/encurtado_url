import UrlRepositories from "../repositories/url.repositories";
import md5 from "md5";
export default class UrlService {
  private urlRepositories: UrlRepositories;
  constructor(urlRepositories: UrlRepositories) {
    this.urlRepositories = urlRepositories;
  }
  async criarUrlEncurtada(url: string) {
    const urlEncurtada = md5(`${new Date()}${url}`);
    const hash6 = urlEncurtada.slice(0, 6);
    const urls = this.urlRepositories.registrar(url, hash6);
    return urls;
  }
}
