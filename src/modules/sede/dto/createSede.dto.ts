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
    @Matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp))$/i, {
        message: 'imgUrl must be a valid image URL (http/https and png, jpg, jpeg, gif, webp, bmp)',
    })
    imgUrl: string;
}