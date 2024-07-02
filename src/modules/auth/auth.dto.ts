import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { PasswordConfirmation } from 'src/decorator/confirmacionPassword';
import { IsArgentinePhoneNumber } from 'src/decorator/validatePhone';
import { Role } from '../user/roles.enum';
import { PickType } from '@nestjs/swagger';

export class CancheroDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @Matches(/^[a-zA-Z ]+$/)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    },
  )
  password: string;

  @IsNotEmpty()
  @Validate(PasswordConfirmation, ['password'])
  confirmPassword: string;

  @IsOptional()
  @IsString()
  birthdate: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(7)
  @MaxLength(8)
  dni: string;

  @IsNotEmpty()
  @Validate(IsArgentinePhoneNumber)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  address: string;

  @IsOptional()
  @IsUrl()
  imgUrl: string;

  @IsOptional()
  @IsEnum(Role)
  rol: Role = Role.User;
}

export class UserDto extends PickType(CancheroDto, ["name", "email", "password", "confirmPassword", "phone"]) {
}

export class LoginDto extends PickType(CancheroDto, ["email", "password"]) {
}
