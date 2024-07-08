import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CancheroDto} from './auth.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepoitory: UserRepository,
    private readonly jwtservice: JwtService,
    private readonly emailService: EmailService) { }

  async singIn(email, password) {
    if (!email || !password) return 'Datos incompletos';

    const userDb = await this.usersRepoitory.getUserEmail(email);
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
    const userEmail = await this.usersRepoitory.getUserEmail(user.email);

    if (userEmail) {
      throw new BadRequestException(`El usuario ya existe ${user.email}`);
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    if (!passwordHash) {
      throw new BadRequestException('Error al hashear la contraseña');
    }

    const emailSubject = 'Registro Exitoso';
    const emailText = `Hola ${user.name}, has sido registrado con éxito! Ya podes empezar a disfrutar de nuestros servicios de reservas`;
    const emailHtml = `<p>Hola ${user.name}</p><p>Has sido registrado con éxito! Ya podes empezar a disfrutar de nuestros servicios de reservas.</p>`;

    await this.emailService.sendEmail(user.email, emailSubject, emailText, emailHtml);


    return await this.usersRepoitory.postUser({ ...user, password: passwordHash });
  }

  async authRegister( userData : any) {
    
    const validar= await this.usersRepoitory.getUserEmail(userData.email)
    if(validar){ await this.singIn(userData.email, userData.password)}

    return this.usersRepoitory.postUser(userData)
  }

  async signupCanchero(canchero:CancheroDto) {
    return await this.usersRepoitory.signupCanchero(canchero);
  }
}
