import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Service } from '../../services/entities/service.entity';

@Entity()
export class Stylist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];
}