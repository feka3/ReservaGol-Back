import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";


export class LoginDto {

  @ApiProperty({
    description: 'Este es el email',
    example: 'testuser@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Este la contraseña',
    example: 'passwordExample123@',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*'
  })
  password: string;
}