import UsuarioInterface from "./usuario.interface";

export default interface UrlInterface {
  id?: number;
  url_original: string;
  url_encurtada: string;
  user?: UsuarioInterface;
  data_create?: Date;
  data_delete?: Date;
}
