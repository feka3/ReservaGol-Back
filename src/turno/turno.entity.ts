import { Court } from 'src/cancha/cancha.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity({
  name: 'turnos',
})
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
  date: Date;
  @ManyToOne(() => Court, (court) => court.appointments)
  court = Court;
  @ManyToOne(() => User, (user) => user.appointments)
  user = User;
}
