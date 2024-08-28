import UrlInterface from "../interface/url.interface";

export default interface IUrlRepositories {
  registrar(url: string, urlEncurtada: string): Promise<UrlInterface>;
  listarUrls(): Promise<UrlInterface[]>;
}
