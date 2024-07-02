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
export class Turno {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @ManyToOne(() => Cancha, (cancha) => cancha.turnos)
  @JoinColumn({ name: "cancha_id" })
  cancha = Cancha;

  @ManyToOne(() => User, (user) => user.turnos)
  @JoinColumn({ name: "user_id" })
  user = User;
}
