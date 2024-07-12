import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CancheroDto, LoginAut0, LoginDto, UserDto } from './auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly serviceAuth: AuthService) {}

  /**
   * Petición para el logueo de usuario.
   * - Se requieren como credenciales email y contraseña.
   */
  @ApiOperation({ summary: 'Login de un usuario.' })
  @Post('signin')
  async singIn(@Body() credential: LoginDto) {
    const { email, password } = credential;
    return this.serviceAuth.signIn(email, password);
  }

  /**
   * Petición para el registro de usuario.
   */
  @ApiOperation({ summary: 'Creación de un nuevo usuario.' })
  @HttpCode(201)
  @Post('signup')
  async signup(@Body() user: UserDto) {
    return this.serviceAuth.signup(user);
  }

  /**
   * Petición para el registro de usuario por medio de Google.
   */
  @HttpCode(201)
  @ApiOperation({ summary: 'Creación de un usuario por Google' })
  @Post('authRegister')
  async authRegister(@Body() dataGoogle: any) {
    const userData = {
      ...dataGoogle,
      name: dataGoogle.displayName,
      password: dataGoogle.uid,
    };
    return this.serviceAuth.authRegister(userData);
  }

  /**
   * Petición para la creación de un canchero.
   * - Se crea con rol pendiente
   */
  @ApiOperation({ summary: 'Creación de un nuevo canchero.' })
  @Post('signup/admin')
  async signupCanchero(@Body() data: CancheroDto) {
    return this.serviceAuth.signupCanchero(data);
  }
}
