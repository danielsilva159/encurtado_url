import { DataSource } from "typeorm";
import { UrlsEntity } from "./entity/urls.entity";
import { UsuarioEntity } from "./entity/usuario.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USUARIO,
  password: process.env.POSTGRES_SENHA,
  database: process.env.POSTGRES_DATABASE,
  entities: [UsuarioEntity, UrlsEntity],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
