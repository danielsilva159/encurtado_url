import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity()
export class UrlsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url_original: string;
  @Column()
  url_encurtada: string;
  @Column({ default: new Date() })
  data_create: Date;
  @OneToOne(() => UsuarioEntity)
  @JoinColumn()
  user: UsuarioEntity;
}
