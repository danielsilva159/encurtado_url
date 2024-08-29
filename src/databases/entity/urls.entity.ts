import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity({ name: "urls" })
export class UrlsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url_original: string;
  @Column()
  url_encurtada: string;
  @Column({ default: new Date() })
  data_create: Date;
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.urls)
  user: UsuarioEntity;
}
