import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
