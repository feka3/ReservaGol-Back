import { Venue } from 'src/sede/sede.entity';
import { Appointment } from 'src/turno/turno.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'canchas',
})
export class Court {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  price: number;
  @Column()
  sport: string;
  @Column()
  type: string;
  @Column()
  player: number;
  @Column()
  time: Date;
  @Column({
    default: 'https://ejemplo.com/imagen-por-defecto.jpg',
    type: 'varchar',
  })
  imgUrl: string;
  @ManyToOne(() => Venue, (venue) => venue.courts)
  venue: Venue;
  @OneToMany(() => Appointment, (appointment) => appointment.court)
  appointments: Appointment[];
}
