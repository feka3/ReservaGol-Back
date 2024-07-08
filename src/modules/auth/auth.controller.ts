import { Body, Controller, HttpCode, HttpException, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CancheroDto, LoginAut0, LoginDto, UserDto } from './auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly serviceAuth: AuthService) { }

  @ApiOperation({ summary: 'Login de un usuario.' })
  @Post('signin')
  async singIn(@Body() credential: LoginDto) {
    const { email, password } = credential;
    return this.serviceAuth.singIn(email, password);
  }

  @ApiOperation({ summary: 'Creacion de un nuevo usuario.' })
  @HttpCode(201)
  @Post('signup')
  async signup(@Body() user: UserDto) {
    return this.serviceAuth.signup(user);
  }

  @HttpCode(201)
  @ApiOperation({ summary: 'Creacion de un usuario por Google' })
  @Post('authRegister')
  async authRegister(@Body() dataGoogle: any) {
    console.log(dataGoogle, 'aca')

    const userData = {
      ...dataGoogle,
      name: dataGoogle.displayName,
      password: dataGoogle.uid,
    }
    return this.serviceAuth.authRegister(userData);
  }

  @ApiOperation({ summary: 'Creacion de un nuevo canchero. (Con el rol pendiente)' })
  @Post('signup/admin')
  async signupCanchero(@Body() canchero: CancheroDto) {
    return this.serviceAuth.signupCanchero(canchero);
  }
}
