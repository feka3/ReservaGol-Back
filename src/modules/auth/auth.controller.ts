import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CancheroDto, LoginDto, UserDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly serviceAuth: AuthService) {}

  @Post('signin')
  async singIn(@Body() credential: LoginDto) {
    const { email, password } = credential;
    return this.serviceAuth.singIn(email, password);
  }

  @HttpCode(201)
  @Post('signup')
  async signup(@Body() user: UserDto) {
    return this.serviceAuth.signup(user);
  }
  @Post('signupAdmin')
  async signupCanchero(@Body() canchero: CancheroDto) {
    console.log(`debug de canchero ${canchero}`);
    return this.serviceAuth.signupCanchero(canchero);
  }
}
