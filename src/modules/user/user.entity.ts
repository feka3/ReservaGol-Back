import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './roles.enum';
import { Turno } from 'src/modules/turno/turno.entity';
import { Sede } from '../sede/sede.entity';

@Entity({
  name: 'usuarios',
})
export class User {

  /** 
  * El ID de usuario se genera de forma automática.
  * - Es del tipo UUID.
  */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /** 
   * Nombre del usuario.
  * @example ExampleUser
  */
  @Column()
  name: string;

  /** 
   * Email del usuario.
   * - Si al momento de probar el registro da error por duplicación de mail, agregue algo aleatorio al comienzo manteniendo la estructura despues del @
  * @example exampleuser@example.com
  */
  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
  })
  email: string;

  /** 
   * Contraseña.
  * @example aaBBcc123!
  */
  @Column()
  password: string;

  /** 
   * Fecha de nacimiento.
  * @example 01/01/1999
  */
  @Column({ nullable: true })
  birthdate: string;

  /** 
   * Documento de Identificación.
  * @example 12345678
  */
  @Column({ nullable: true })
  dni: number;

  /** 
   * Numero de telefono.
  * @example +5491112345678
  */
  @Column({ nullable: true })
  phone: string;

  /** 
   * Ciudad de residencia.
  * @example Ejemplo
  */
  @Column({ length: 50, nullable: true })
  city: string

  /** 
   * Dirección de residencia.
  * @example CalleEjemplo
  */
  @Column({ nullable: true })
  address: string;

  /** 
  *  Por defecto se asigna imagen de perfil genérica.  
  * @example "https://test.com/test.png"
  */
  @Column({
    default: 'https://static.vecteezy.com/system/resources/previews/007/226/475/non_2x/user-account-circle-glyph-color-icon-user-profile-picture-userpic-silhouette-symbol-on-white-background-with-no-outline-negative-space-illustration-vector.jpg',
  })
  imgUrl: string;

  /** 
  * - superadmin: Este rol permite asignar administradores.
  * - admin: Este rol tiene permisos para crear sedes y canchas.
  * - user: Este rol tiene permisos para reservar canchas.
  * - Por defecto cuando se crea un usuario se le asigna el rol de user.
  */
  @Column({ type: 'enum', enum: Role, default: Role.User })
  rol: Role;

  /** 
   * Por defecto se indica que el futuro admin/canchero no ha sido aprobado.
  */
  // @Column({ default: false })
  // isAproved: boolean;

  /**
   * Listado de Sedes asociadas al usuario.
   */
  @OneToMany(() => Sede, (sede) => sede.user)
  @JoinColumn({ name: "sede_id" })
  sedes: Sede[];

  /**
   * Listado de Reservas asociadas al usuario.
   */
  @OneToMany(() => Turno, (turno) => turno.user)
  @JoinColumn({ name: "turno_id" })
  turnos: Turno[];
}
