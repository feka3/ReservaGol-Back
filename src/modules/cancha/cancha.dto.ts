import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PrimaryGeneratedColumn } from 'typeorm';

export class canchaDto {

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
  @IsNotEmpty()
  @IsString()
  name: string;

    /**
   * Precio de alquiler de la cancha por hora.
   * @example 20000
   */
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  /**
   * Deporte al cual pertenece la cancha.
   * -  1: Fútbol
   * -  2: Tenis
   * -  3: Padel
   * @example 4
   */
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @IsIn([1, 2, 3], {
    message:
      'El deporte debe ser una de estas opciones: 1 (Futbol), 2 (Tenis), 3 (Padel)',
  })
  sport: number;

    /**
   * Composición de la cancha (arcilla, cemento, cesped etc.).
   * @example test
   */
  @IsNotEmpty()
  type: string;

    /**
   * Horario de apertura de la chancha.
   * - A partir de este horario es que se generaran los turnos para reservas.
   * @example 00:00
   */
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'El formato deberia de ser: "HH:MM"',
  })
  timeopen: string;

    /**
   * Horario de cierre de la chancha.
   * - Hasta este horario es que se generaran los turnos para reservas.
   * @example 00:00
   */
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'El formato deberia de ser: "HH:MM"',
  })
  timeclose: string;

    /**
   * Cantidad de jugadores.
   * @example 00
   */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  player: number;

    /**
   * Indica si la cancha es techada o descubierta
   * - Se hace por medio de un booleano: true o false (si o no)
   * @example false
   */
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  techado: boolean;

  /** 
  *  Por defecto se asigna imagen de perfil genérica.  
  * @example "https://test.com/test.png"
  */ 
  @IsOptional()
  imgUrl: any;

  /**
   * Sede asociada a la cancha.
   * @example SedeTest
   */
  @IsNotEmpty()
  @IsString()
  sedeName: string;

}

export class updateCanchaDto {

  /**
 * Nombre de la cancha.
 * @example CanchaTest
 */
  @IsOptional()
  @IsString()
  name: string;

  /**
   * Precio de alquiler de la cancha por hora.
   * @example 20000
   */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price: number;

    /**
   * Deporte al cual pertenece la cancha.
   * -  1: Fútbol
   * -  2: Tenis
   * -  3: Padel
   * @example 4
   */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsIn([1, 2, 3], {
    message:
      'El deporte debe ser una de estas opciones: 1 (Futbol), 2 (Tennis), 3 (Paddel)',
  })
  sport: number;

  /**
   * Composición de la cancha (arcilla, cemento, cesped etc.).
   * @example test
   */
  @IsOptional()
  @ApiProperty({
    description: 'Que tipo de cancha es',
    example: 'sintetico, pasto, etc ...',
  })
  type: string;

    /**
   * Horario de apertura de la chancha.
   * - A partir de este horario es que se generaran los turnos para reservas.
   * @example 00:00
   */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  player: number;

  /**
   * Horario de apertura de la chancha.
   * - A partir de este horario es que se generaran los turnos para reservas.
   * @example 00:00
   */
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'El formato deberia de ser: "HH:MM"',
  })
  timeopen: string;

  /**
   * Horario de cierre de la chancha.
   * - Hasta este horario es que se generaran los turnos para reservas.
   * @example 00:00
   */
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'El formato deberia de ser: "HH:MM"',
  })
  timeclose: string;

  /**
   * Indica si la cancha es techada o descubierta
   * - Se hace por medio de un booleano: true o false (si o no)
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  techado: boolean;

  /** 
  *  Por defecto se asigna imagen de perfil genérica.  
  * @example "https://test.com/test.png"
  */ 
  @IsOptional()
  imgUrl: any;

  /**
   * Sede asociada a la cancha.
   * @example SedeTest
   */
  @IsOptional()
  @IsString()
  sedeName: string;
}