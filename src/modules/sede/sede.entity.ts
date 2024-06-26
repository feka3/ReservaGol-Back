import { Court } from 'src/modules/cancha/cancha.entity';
import { User } from 'src/modules/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'sedes' })
export class Venue {
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
    default: 'https://ejemplo.com/imagen-por-defecto.jpg',
  })
  imgUrl: string;

  @ManyToOne(() => User, (user) => user.venues)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Court, (court) => court.venue)
  courts: Court[];
}
