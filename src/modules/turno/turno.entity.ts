import { Court } from 'src/modules/cancha/cancha.entity';
import { User } from 'src/modules/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'turnos',
})
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  date: Date;

  // @ManyToOne(() => Court, (court) => court.appointments)
  // @JoinColumn({ name: "court_id" })
  // court = Court;

  @ManyToOne(() => User, (user) => user.appointments)
  user = User;
}
