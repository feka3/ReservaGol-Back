import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

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
        throw new NotFoundException('El canchero ya se encuentra registrado');
      }
      const { password } = canchero;
      canchero.password = await bcrypt.hash(password, 10);

      const newCanchero = await this.userRepository.create(canchero);
      await this.userRepository.save(newCanchero);
      return {
        message: 'UserAdmin creado',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getUserEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      relations: ['sedes', 'turnos'],
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

  async deleteUser(userId) {
    const user = await this.getUserById(userId);
    await this.userRepository.remove(user);
    return 'Usuario eliminado correctamente';
  }

  async getRegistroUsuariosEstadistica() {
    const groupData = await this.userRepository
      .createQueryBuilder('user')
      .select('EXTRACT(YEAR FROM user.createdAt)', 'year')
      .addSelect('EXTRACT(MONTH FROM user.createdAt)', 'month')
      .addSelect('user.rol', 'role')
      .addSelect('COUNT(user.id)', 'count')
      .groupBy('year')
      .addGroupBy('month')
      .addGroupBy('role')
      .orderBy('year', 'ASC')
      .addOrderBy('month', 'ASC')
      .getRawMany();

    const formateoData = groupData.reduce((acc, data) => {
      const { year, month, role, count } = data;
      const key = `${year}-${month.toString().padStart(2, '0')}`;

      if (!acc[key]) {
        acc[key] = {
          year,
          month,
          usuarios: 0,
          cancheros: 0,
          superAdministrador: 0,
          totalUsuarios: 0,
        };
      }

      if (role === 'user') {
        acc[key].usuarios = parseInt(count, 10);
      } else if (role === 'admin') {
        acc[key].cancheros = parseInt(count, 10);
      } else if (role === 'superadmin') {
        acc[key].superAdministrador = parseInt(count, 10);
      }

      acc[key].totalUsuarios += parseInt(count, 10);

      return acc;
    }, {});

    return Object.values(formateoData);
  }
}
