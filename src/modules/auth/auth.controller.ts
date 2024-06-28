import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CancheroDto, UserDto } from './auth.dto';
import { LoginDto } from './loginDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly serviceAuth: AuthService) {}

  @Post('singin')
  async singIn(@Body() credential: LoginDto) {
    const { email, password } = credential;
    return this.serviceAuth.singIn(email, password);
  }

  @HttpCode(201)
  @Post('singup')
  async signup(@Body() user: UserDto) {
    return this.serviceAuth.signup(user);
  }
  @Post('signupAdmin')
  async signupCanchero(@Body() canchero: any) {
    console.log(`debug de canchero ${canchero}`);
    return this.serviceAuth.signupCanchero(canchero);
  }
}
