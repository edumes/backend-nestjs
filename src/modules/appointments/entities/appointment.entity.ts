import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Service } from '../../services/entities/service.entity';
import { Stylist } from '../../stylists/entities/stylist.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  client: User;

  @ManyToOne(() => Service)
  @JoinColumn()
  service: Service;

  @ManyToOne(() => Stylist)
  @JoinColumn()
  stylist: Stylist;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ default: 'scheduled' })
  status: string;
}