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

  /** 
   * Nombre del usuario.
  * @example ExampleUser
  */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  @Matches(/^[a-zA-Z ]+$/)
  name: string;

  /** 
   * Email del usuario.
   * - Si al momento de probar el registro da error por duplicación de mail, agregue algo aleatorio al comienzo manteniendo la estructura despues del @
  * @example exampleuser@example.com
  */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /** 
   * Contraseña.
  * @example aaBBcc123!
  */
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

  /** 
   * Confirmacion de Contraseña. Debe coincidir con la anterior.
  * @example aaBBcc123!
  */
  @IsNotEmpty()
  @Validate(PasswordConfirmation, ['password'])
  confirmPassword: string;

  /** 
   * Fecha de nacimiento.
  * @example 01/01/1999
  */
  @IsOptional()
  @IsString()
  birthdate: string;

  /** 
   * Documento de Identificación.
  * @example 12345678
  */
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(7)
  @MaxLength(8)
  dni: string;

  /** 
   * Numero de telefono.
  * @example +5491112345678
  */
  @IsNotEmpty()
  @Validate(IsArgentinePhoneNumber)
  phone: string;

  /** 
   * Ciudad de residencia.
  * @example Ejemplo
  */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  city: string;

  /** 
   * Dirección de residencia.
  * @example CalleEjemplo
  */
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  address: string;

  /** 
  *  Por defecto se asigna imagen de perfil genérica.  
  * @example "https://test.com/test.png"
  */
  @IsOptional()
  @IsUrl()
  imgUrl: string;

  /** 
  * - superadmin: Este rol permite asignar administradores.
  * - admin: Este rol tiene permisos para crear sedes y canchas.
  * - user: Este rol tiene permisos para reservar canchas.
  * - Por defecto cuando se crea un usuario se le asigna el rol de user.
  */
  @IsOptional()
  @IsEnum(Role)
  rol: Role = Role.Pendiente;
}

export class UserDto extends PickType(CancheroDto, ["name", "email", "password", "confirmPassword", "phone"]) {
}

export class LoginAut0 extends PickType(CancheroDto, ["email", "name", "password"]) {
}

export class LoginDto extends PickType(CancheroDto, ["email", "password"]) {
}
