import UrlInterface from "../interface/url.interface";

export default interface IUrlRepositories {
  registrar(url: string, urlEncurtada: string): Promise<UrlInterface>;
  listarUrls(id: number): Promise<UrlInterface[]>;
  editarUrl(
    id: number,
    idUsuario: number,
    novaUrl: string
  ): Promise<UrlInterface>;
  deletarUrl(id: number, idUsuario: number): Promise<UrlInterface>;
  adicionarVisualizacao(id: number): void;
}
