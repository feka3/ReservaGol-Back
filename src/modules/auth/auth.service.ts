import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly jwtservice: JwtService,
  ) {}

  async singIn(email, password) {
    if (!email || !password) return 'datos incompletos';

    const userDb = await this.usersRepo.getUserEmail(email);
    console.log(userDb);
    if (!userDb) {
      throw new BadRequestException('credenciales incorrectas');
    }

    const user = await bcrypt.compare(password, userDb.password);
    if (!user) {
      throw new BadRequestException('credenciales incorrectas');
    }

    const userPayload = {
      id: userDb.id,
      email: userDb.email,
      rol: userDb.rol,
    };
    delete userDb.password;

    const token = this.jwtservice.sign(userPayload);
    return { success: 'usuario logueado', token, userDb };
  }

  async signup(user) {
    const userEmail = await this.usersRepo.getUserEmail(user.email);

    if (userEmail) {
      throw new BadRequestException(`el usuario ya existe ${user.email}`);
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    if (!passwordHash) {
      throw new BadRequestException('Error al hashear la contraseña');
    }

    return await this.usersRepo.postUser({ ...user, password: passwordHash });
  }
  async signupCanchero(canchero) {
    return await this.usersRepo.signupCanchero(canchero);
  }
}
