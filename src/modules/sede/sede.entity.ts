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

  /** 
  * El ID de la sede se genera de forma automática.
  * - Es del tipo UUID.
  */ 
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nombre de la sede.
   * @example SedeTest
   */
  @Column({
    unique: true,
  })
  name: string;

  /**
  * Ubicacion de la sede.
  * @example Ejemplo
  */
  @Column()
  location: string;

  /**
  * Descripción de la sede.
  * @example Descripcion
  */
  @Column()
  description: string;

  /** 
  *  Por defecto se asigna imagen genérica.  
  * @example "https://test.com/test.png"
  */
  @Column({
    default: 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
  })
  imgUrl?: string;

  /**
   * Usuario asociado a la sede.
   */
  @ManyToOne(() => User, (user) => user.sedes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * Listado de canchas asociadas a la sede.
   */
  @OneToMany(() => Cancha, (cancha) => cancha.sede, {
    cascade: true,
  })
  @JoinColumn({ name: 'canchas_id' })
  canchas: Cancha[];
}
