import { IsNotEmpty, IsEmail, MinLength, MaxLength, Matches, IsString, IsNumber } from 'class-validator';

export class CreateSedeDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    imgUrl: string;
}