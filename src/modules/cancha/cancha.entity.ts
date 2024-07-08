import { Sede } from '../sede/sede.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Turno } from '../turno/turno.entity';

@Entity({
  name: 'canchas',
})
export class Cancha {
  /**
   * El ID de la cancha se genera de forma automática.
   * - Es del tipo UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nombre de la cancha.
   * @example CanchaTest
   */
  @Column()
  name: string;

  /**
   * Precio de alquiler de la cancha por hora.
   * @example 20000
   */
  @Column()
  price: number;

  /**
   * Deporte al cual pertenece la cancha.
   * -  1: Fútbol
   * -  2: Tenis
   * -  3: Padel
   * @example 4
   */
  @Column()
  sport: number;

  /**
   * Composición de la cancha (arcilla, cemento, cesped etc.).
   * @example test
   */
  @Column()
  type: string;

  /**
   * Cantidad de jugadores.
   * @example 00
   */
  @Column()
  player: number;

  /**
   * Horario de apertura de la chancha.
   * - A partir de este horario es que se generaran los turnos para reservas.
   * @example 00:00
   */
  @Column()
  timeopen: string;

  /**
   * Horario de cierre de la chancha.
   * - Hasta este horario es que se generaran los turnos para reservas.
   * @example 00:00
   */
  @Column()
  timeclose: string;

  /**
   * Indica si la cancha es techada o descubierta
   * - Se hace por medio de un booleano: true o false (si o no)
   * @example false
   */
  @Column()
  techado: boolean;

  /**
   *  Por defecto se asigna imagen de perfil genérica.
   * @example "https://test.com/test.png"
   */
  @Column({
    default:
      'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
    type: 'varchar',
  })
  imgUrl: string;

  /**
   * Sede asociada a la cancha.
   */
  @ManyToOne(() => Sede, (sede) => sede.canchas)
  @JoinColumn({ name: 'sede_id' })
  sede: Sede;

  /**
   * Listado de turnos asociados a la cancha.
   */
  @OneToMany(() => Turno, (turno) => turno.cancha)
  @JoinColumn({ name: 'turno_id' })
  turnos: Turno[];
}
