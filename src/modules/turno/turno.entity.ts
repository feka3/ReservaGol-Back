import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Cancha } from '../cancha/cancha.entity';

@Entity({
  name: 'turnos',
})
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  date: Date;

  @ManyToOne(() => Cancha, (cancha) => cancha.appointments)
  @JoinColumn({ name: "cancha_id" })
  cancha = Cancha;

  @ManyToOne(() => User, (user) => user.appointments)
  user = User;
}
