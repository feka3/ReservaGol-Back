import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CancheroDto } from './auth.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtservice: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async signIn(email, password) {
    try {
      if (!email || !password) {
        return 'Datos incompletos';
      }

      const userDb = await this.usersRepository.getUserEmail(email);

      if (!userDb.isActive)
        return new NotFoundException(
          'El usuario no se encuentra habilitado para ingresar.',
        );

      if (!userDb) {
        console.log('no hay usuario');
        throw new BadRequestException('Credenciales incorrectas');
      }

      const user = await bcrypt.compare(password, userDb.password);
      if (!user) {
        console.log('no match de bcrypt');
        throw new BadRequestException('Credenciales incorrectas');
      }

      const userPayload = {
        id: userDb.id,
        email: userDb.email,
        rol: userDb.rol,
      };
      delete userDb.password;
      const token = this.jwtservice.sign(userPayload);
      console.log(token, userDb);
      return { success: 'Usuario logueado', token, userDb };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error en el servidor');
    }
  }

  async signup(user) {
    const userEmail = await this.usersRepository.getUserEmail(user.email);

    if (userEmail) {
      throw new BadRequestException(`El usuario ya existe ${user.email}`);
    }


    return await this.usersRepository.postUser(user);
  }

  async authRegister(userData: any) {
    const validar = await this.usersRepository.getUserEmail(userData.email);

    if (validar) {
      return await this.signIn(userData.email, userData.password);
    }

    return this.usersRepository.postUser(userData);
  }

  async signupCanchero(canchero: CancheroDto) {
    return await this.usersRepository.signupCanchero(canchero);
  }
}
