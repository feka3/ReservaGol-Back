import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class TurnoDto{

    @IsNotEmpty()
    @IsString()
    date: string

    @IsNotEmpty()
    @IsString()
    time: string
  
    @IsNotEmpty()
    @IsString()
    canchaId: string

    @IsNotEmpty()
    @IsString()
    userId: string
}