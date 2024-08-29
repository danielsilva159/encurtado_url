import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.urls)
  user: UsuarioEntity;
  @CreateDateColumn({ default: new Date() })
  data_create: Date;
  @DeleteDateColumn()
  data_delete: Date;
}
