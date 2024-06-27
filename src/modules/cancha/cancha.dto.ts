import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class canchaDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Precio por turno de la cancha',
    example: '20000',
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2, 3], {
    message:
      'El deporte debe ser una de estas opciones: 1 (Futbol), 2 (Tennis), 3 (Paddel)',
  })
  @ApiProperty({
    description: 'Tipo de deporte Futbol(1)-Tennis(2)-Paddel(3)',
    example: '1',
  })
  sport: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Que tipo de cancha es',
    example: 'sintetico, pasto, etc ...',
  })
  type: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Cantidad de jugadores',
    example: '10',
  })
  player: number;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d) a ([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'El formato deberia de ser: "HH:MM a HH:MM"',
  })
  @ApiProperty({
    description: 'Rango horario de apertura de local',
    example: '09:00 a 23:00',
  })
  time: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Si la cancha esta techada o no',
    example: 'true',
  })
  techado: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'Imagen de la cancha',
    type: 'string',
    format: 'binary',
  })
  imgUrl?: any;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'ID de la sede',
    example: ' "id": "4985cfcb-a320-41e5-8f40-d6c283f289be"',
  })
  sedeId: string;
}
