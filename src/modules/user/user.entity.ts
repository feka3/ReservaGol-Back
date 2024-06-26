import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './roles.enum';
import { Appointment } from 'src/modules/turno/turno.entity';
import { Venue } from '../sede/sede.entity';

@Entity({
  name: 'usuarios',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  name: string;
  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
  })
  email: string;
  @Column()
  password: string;
  @Column()
  birthdate: Date;
  @Column()
  dni: number;
  @Column()
  phone: number;
  @Column()
  address: string;
  @Column({
    default: 'https://ejemplo.com/imagen-por-defecto.jpg',
  })
  imgUrl: string;

  @Column()
  rol: Role;
  @OneToMany(() => Venue, (venue) => venue.user)
  venues: Venue[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
