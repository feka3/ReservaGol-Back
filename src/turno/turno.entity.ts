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

@Entity({
  name: 'turnos',
})
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string 
  @Column()
  date: Date;
  @ManyToOne(() => Court, (court) => court.appointments)
  court = Court;
  @ManyToOne(() => User, (user) => user.appointments)
  user = User;
}
