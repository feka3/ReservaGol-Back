import { Court } from 'src/cancha/cancha.entity';
import { User } from 'src/user/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity({ name: 'sede' })
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
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
  user: User;
  @OneToMany(() => Court, (court) => court.venue)
  courts: Court[];
}
