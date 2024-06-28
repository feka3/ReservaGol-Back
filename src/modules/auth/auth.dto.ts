import {
  IsDateString,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  Max,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { PasswordConfirmation } from 'src/decorator/confirmacionPassword';
import { IsArgentinePhoneNumber } from 'src/decorator/validatePhone';

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
  @IsDateString()
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
  rol: string;
}

export class UserDto {
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

  @IsNotEmpty()
  @Validate(IsArgentinePhoneNumber)
  phone: string;
}
