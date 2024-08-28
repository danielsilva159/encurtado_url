import { DataSource } from "typeorm";
import { UrlsEntity } from "./entity/urls.entity";
import { UsuarioEntity } from "./entity/usuario.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "encurtador",
  entities: [UsuarioEntity, UrlsEntity],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
