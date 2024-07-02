import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class TurnoDto{

    @IsNotEmpty()
    @IsDate()
    date: Date

    @IsNotEmpty()
    time: string
  
    @IsNotEmpty()
    @IsString()
    canchaId: string

    @IsNotEmpty()
    @IsString()
    userId: string
}