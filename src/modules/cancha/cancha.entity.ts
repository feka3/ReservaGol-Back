import { Sede } from '../sede/sede.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'canchas',
})
export class Cancha {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  sport: number;

  @Column()
  type: string;

  @Column()
  player: number;

  @Column()
  timeopen: string;

  @Column()
  timeclose: string;

  @Column()
  techado: boolean;
  
  @Column({
    default: 'https://ejemplo.com/imagen-por-defecto.jpg',
    type: 'varchar',
  })
  imgUrl: string;

  @ManyToOne(() => Sede, (sede) => sede.canchas)
  @JoinColumn({ name: 'sede_id' })
  sede: Sede;

  // @OneToMany(() => Appointment, (appointment) => appointment.court)
  // @JoinColumn({ name: 'appointment_id' })
  // appointments: Appointment[];
}
