import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @Column({ default: 0 })
  qtdVisualicao: number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.urls)
  user: UsuarioEntity;

  @CreateDateColumn()
  data_create: Date;
  @UpdateDateColumn()
  data_update: Date;
  @DeleteDateColumn()
  data_delete: Date;
}
