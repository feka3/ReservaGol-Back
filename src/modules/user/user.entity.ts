import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './roles.enum';
import { Appointment } from 'src/modules/turno/turno.entity';
import { Sede } from '../sede/sede.entity';

@Entity({
  name: 'usuarios',
})
export class User {

  /** 
  * El ID de usuario se genera de forma automatica
  * - Es del tipo UUID
  */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /** 
  * @example TestUser
  */  
  @Column()
  name: string;

  /** 
  * @example testuser@example.com
  */  
  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
  })
  email: string;

  /** 
  * @example aaBBcc123!
  */
  @Column()
  password: string;

  /** 
  * @example 01/01/1999
  */
  @Column()
  birthdate: string;

  /** 
  * @example 12345678
  */
  @Column()
  dni: number;

  /** 
  * @example +5491112345678
  */
  @Column()
  phone: string;

  /** 
  * @example Ejemplo
  */
  @Column({ length: 50 })
  city: string

  /** 
  * @example CalleEjemplo
  */
  @Column()
  address: string;

    /** 
    *  Por defecto se asigna imagen descriptiva "sin foto disponible" 
    * @example "https://test.com/test.png"
    */  
  @Column({
    default: 'https://ejemplo.com/imagen-por-defecto.jpg',
  })
  imgUrl: string;

  /** 
  * - admin: El usario tiene permisos de administrador
  * - user: El usuario solo tiene permisos de usuario
  * - Por defecto es user
  */
  @Column({ default: 'user' })
  rol: Role;

  /**
   * Listado de Sedes asociadas al usuario
   */
  @OneToMany(() => Sede, (sede) => sede.user)
  sedes: Sede[];

  /**
   * Listado de Reservas asociadas al usuario
   */
  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
