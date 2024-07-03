import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CancheroDto, LoginAut0, UserDto } from './auth.dto';
import { UserController } from '../user/user.controller';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly jwtservice: JwtService,
  ) { }

  async singIn(email, password) {
    if (!email || !password) return 'Datos incompletos';

    const userDb = await this.usersRepo.getUserEmail(email);
    //console.log(userDb,' prueba');
    if (!userDb) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const user = await bcrypt.compare(password, userDb.password);
    if (!user) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const userPayload = {
      id: userDb.id,
      email: userDb.email,
      rol: userDb.rol,
    };
    delete userDb.password;

    const token = this.jwtservice.sign(userPayload);
    return { success: 'Usuario logueado', token, userDb  };
  }

  async signup(user) {
    const userEmail = await this.usersRepo.getUserEmail(user.email);

    if (userEmail) {
      throw new BadRequestException(`El usuario ya existe ${user.email}`);
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    if (!passwordHash) {
      throw new BadRequestException('Error al hashear la contraseña');
    }

    return await this.usersRepo.postUser({ ...user, password: passwordHash });
  }

  async authRegister( userData : any) {
    
    const validar= await this.usersRepo.getUserEmail(userData.email)
    if(validar){ await this.singIn(userData.email, userData.password)}

    return this.usersRepo.postUser(userData)
  }

  async signupCanchero(canchero:CancheroDto) {
    return await this.usersRepo.signupCanchero(canchero);
  }
}
