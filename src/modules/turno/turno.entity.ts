import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Cancha } from '../cancha/cancha.entity';
import { Status } from './status.enum';

@Entity({
  name: 'turnos',
})
export class Turno {

  /** 
  * El ID del turno se genera de forma automática.
  * - Es del tipo UUID.
  */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** 
   * Fecha del turno.
  */
  @Column()
  date: string;

  /** 
   * Horario del turno.
  */
  @Column()
  time: string;

  /** 
  * - libre: El turno se escuentra disponible para reservar.
  * - pendiente: El turno ya fue reservado, pero todavia no abonado.
  * - ocupado: El turno ya fue reservado y abonado.
  * - Por defecto los turnos se encuentran en estado libre, listos para reservar.
  */
  @Column({type:"enum", enum: Status, default: Status.Libre})
  status: Status

  /**
   * Cancha asociada al turno.
   */
  @ManyToOne(() => Cancha, (cancha) => cancha.turnos)
  @JoinColumn({ name: "cancha_id" })
  cancha: Cancha;

  /**
   * Usuario asociado al turno.
   */
  @ManyToOne(() => User, (user) => user.turnos)
  @JoinColumn({ name: "user_id" })
  user: User;
}
