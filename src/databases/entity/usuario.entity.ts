import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UrlsEntity } from "./urls.entity";

@Entity({ name: "usuario" })
export class UsuarioEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column()
  senha: string;
  @Column()
  email: string;
  @OneToMany(() => UrlsEntity, (url) => url.user)
  urls: UrlsEntity[];
}
