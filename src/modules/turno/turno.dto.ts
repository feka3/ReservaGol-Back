import { IsNotEmpty, IsString } from 'class-validator';

export class TurnoDto {
  /**
   * Fecha del turno.
   */
  @IsNotEmpty()
  @IsString()
  date: string;

  /**
   * Fecha del turno.
   */
  @IsNotEmpty()
  @IsString()
  time: string;

  /**
   * Cancha asociada al turno.
   */
  @IsNotEmpty()
  @IsString()
  canchaId: string;

  /**
   * Usuario asociado al turno.
   */
  @IsNotEmpty()
  @IsString()
  userId: string;
}
