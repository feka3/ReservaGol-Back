import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

    @IsOptional()
    imgUrl: string;
}
