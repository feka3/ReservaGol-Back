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
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres' })
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  name: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @Length(8, 15, {
    message: 'La contraseña debe tener entre 8 y 15 caracteres',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    },
  )
  password: string;

  @IsNotEmpty({ message: 'La confirmación de contraseña es obligatoria' })
  @Validate(PasswordConfirmation, ['password'], {
    message: 'Las contraseñas no coinciden',
  })
  confirmPassword: string;

  @IsOptional()
  @IsString({ message: 'La fecha de nacimiento debe ser una cadena de texto' })
  birthdate: string;

  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @IsNumberString(
    {},
    { message: 'El DNI debe ser una cadena de texto numérica' },
  )
  @MinLength(7, { message: 'El DNI debe tener al menos 7 caracteres' })
  @MaxLength(8, { message: 'El DNI no puede tener más de 8 caracteres' })
  dni: string;

  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  phone: string;

  @IsNotEmpty({ message: 'La ciudad es obligatoria' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres' })
  city: string;

  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @Length(3, 50, { message: 'La dirección debe tener entre 3 y 50 caracteres' })
  address: string;

  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen no es válida' })
  imgUrl: string;

  @IsOptional()
  @IsEnum(Role, { message: 'El rol no es válido' })
  rol: Role = Role.Pendiente;
}
export class UserDto extends PickType(CancheroDto, [
  'name',
  'email',
  'password',
  'confirmPassword',
  'phone',
]) {}

export class LoginAut0 extends PickType(CancheroDto, [
  'email',
  'name',
  'password',
]) {}

export class LoginDto extends PickType(CancheroDto, ['email', 'password']) {}
