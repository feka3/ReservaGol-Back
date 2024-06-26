import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import { Venue } from '../sede/sede.entity';
import { ApiProperty } from '@nestjs/swagger';

export class canchasDto {
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
      'sport must be one of the following values: 1 (Futbol), 2 (Tennis), 3 (Paddel)',
  })
  @ApiProperty({
    description: 'Tipo de deporte Futbol(1)-Tennis(2)-Paddel(3)',
    example: '1',
  })
  sport: number;
  type: string;
  player: number;
  time: Date;
  techado: boolean;
  imgUrl: string;
  venue: Venue;
}
