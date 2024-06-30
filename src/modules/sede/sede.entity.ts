import { Cancha } from '../cancha/cancha.entity';
import { User } from '../user/user.entity';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'sedes' })
export class Sede {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column({
    default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fclubflandria.com.ar%2F2023%2F09%2F10%2Fnueva-cancha-en-la-sede%2F&psig=AOvVaw2RDRQN2c-vK14is1izoJBa&ust=1719587209122000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjSwN-H_IYDFQAAAAAdAAAAABAR',
  })
  imgUrl?: string;

  @ManyToOne(() => User, (user) => user.sedes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Cancha, (cancha) => cancha.sede)
  @JoinColumn({ name: 'canchas_id' })
  canchas: Cancha[];
}
