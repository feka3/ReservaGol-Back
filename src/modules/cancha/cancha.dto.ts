import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class canchaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre de la cancha',
    example: 'Cancha 1',
  })
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'Precio por turno de la cancha',
    example: '20000',
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @IsIn([1, 2, 3], {
    message:
      'El deporte debe ser una de estas opciones: 1 (Futbol), 2 (Tennis), 3 (Paddel)',
  })
  @ApiProperty({
    description: 'Tipo de deporte Futbol(1)-Tennis(2)-Paddel(3)',
    example: '1',
  })
  sport: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
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
  @Type(() => Boolean)
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
  imgUrl: any;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre de la sede',
    example: 'Sede norte',
  })
  sedeName: string;
}
export class updatecanchaDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Nombre de la cancha',
    example: 'cancha 1',
  })
  name: string;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'Precio por turno de la cancha',
    example: '20000',
  })
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsIn([1, 2, 3], {
    message:
      'El deporte debe ser una de estas opciones: 1 (Futbol), 2 (Tennis), 3 (Paddel)',
  })
  @ApiProperty({
    description: 'Tipo de deporte Futbol(1)-Tennis(2)-Paddel(3)',
    example: '1',
  })
  sport: number;

  @IsOptional()
  @ApiProperty({
    description: 'Que tipo de cancha es',
    example: 'sintetico, pasto, etc ...',
  })
  type: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'Cantidad de jugadores',
    example: '10',
  })
  player: number;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'El formato deberia de ser "HH:MM"',
  })
  @ApiProperty({
    description: 'Horario de apertura',
    example: '09:00',
  })
  timeopen: string;
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'El formato deberia de ser "HH:MM"',
  })
  @ApiProperty({
    description: 'Horario de apertura',
    example: '09:00',
  })
  timeclose: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
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
  imgUrl: any;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Nombre de la sede',
    example: 'Sede norte',
  })
  sedeName: string;
}
