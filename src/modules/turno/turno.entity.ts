import { Court } from 'src/modules/cancha/cancha.entity';

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({
  name: 'turnos',
})
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  date: Date;

  @ManyToOne(() => Court, (court) => court.appointments)
  @JoinColumn({ name: "court_id" })
  court = Court;

  @ManyToOne(() => User, (user) => user.appointments)
  user = User;
}
