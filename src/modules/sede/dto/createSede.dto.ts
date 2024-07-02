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
