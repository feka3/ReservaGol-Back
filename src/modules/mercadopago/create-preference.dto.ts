import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePreferenceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
