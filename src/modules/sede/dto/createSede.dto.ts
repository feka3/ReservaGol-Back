import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

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
    @IsUUID()
    user: UUID

    @IsOptional()
    imgUrl: string;
}

export class UpdateSedeDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    location: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    imgUrl: string;
}