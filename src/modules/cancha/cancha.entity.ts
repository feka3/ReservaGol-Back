import { Venue } from "../sede/sede.entity";
import { Appointment } from 'src/modules/turno/turno.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'canchas',
})
export class Court {
  @PrimaryGeneratedColumn('uuid')
  id: string;
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
  @Column()
  techado: boolean;
  @Column({
    default: 'https://ejemplo.com/imagen-por-defecto.jpg',
    type: 'varchar',
  })
  imgUrl: string;

  @ManyToOne(() => Venue, (venue) => venue.courts)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @OneToMany(() => Appointment, (appointment) => appointment.court)
  @JoinColumn({ name: 'appointment_id' })
  appointments: Appointment[];
}
