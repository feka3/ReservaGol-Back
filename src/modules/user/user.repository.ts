import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CancheroDto } from '../auth/auth.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './roles.enum';
import { log } from 'console';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async getUsers() {
    return this.userRepository.find({ relations: ['sedes', 'turnos'] });
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['sedes', 'turnos', 'turnos.cancha', 'turnos.cancha.sede'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async postUser(user: Partial<User>) {
    const newUser = await this.userRepository.save(user);
    const dbUser = await this.userRepository.findOneBy({ id: user.id });

    const { password, ...noPassword } = dbUser;

    return noPassword;
  }

  async updateUserById(user: Partial<User> & { imgFile: string }, id: string) {
    const userFinded = await this.getUserById(id);

    if (!userFinded) return new NotFoundException('Usuario no encontrado');

    await this.userRepository.update(userFinded.id, user);

    return 'El usuario ha sido actualizado con exito';
  }

  async signupCanchero(canchero) {
    try {
      const cancheroFinded = await this.userRepository.findOne({
        where: { email: canchero.email },
      });

      if (cancheroFinded) {
        throw new NotFoundException("El canchero ya se encuentra registrado");
      }
      const { password } = canchero;
      canchero.password = await bcrypt.hash(password, 10);

      const newCanchero = await this.userRepository.create(canchero);
      await this.userRepository.save(newCanchero);
      return newCanchero;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getUserEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      relations: ['sedes'],
    });
  }

  async approveCanchero(cancheroId: string) {
    try {
      const canchero = await this.userRepository.findOne({
        where: { id: cancheroId },
      });

      if (!canchero) {
        throw new NotFoundException(
          `Canchero con id: ${cancheroId} no ha sido encontrado o ya ha sido aprobado`,
        );
      }

      canchero.rol = Role.Admin;

      await this.userRepository.save(canchero);

      return 'Canchero aprobado';
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getCancheros() {
    try {
      const cancheros = await this.userRepository.find({
        where: { rol: Role.Pendiente },
      });
      if (!cancheros.length) {
        throw new NotFoundException(
          `No hay cancheros pendientes de aprobacion`,
        );
      }
      return cancheros;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
