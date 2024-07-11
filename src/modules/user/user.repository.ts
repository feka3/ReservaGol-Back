import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './roles.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtservice: JwtService,
  ) {}

  async getUsers() {
    try {
      return this.userRepository.find({ relations: ['sedes', 'turnos'] });
    } catch (error) {
      throw new NotFoundException('No hay usuarios registrados');
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: [
          'sedes',
          'turnos',
          'turnos.cancha',
          'turnos.cancha.sede',
          'sedes.canchas',
        ],
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async postUser(user: Partial<User>) {
    try {
      const { password } = user;
      user.password = await bcrypt.hash(password, 10);

      const newUser = await this.userRepository.save(user);
      const dbUser = await this.userRepository.findOneBy({ id: user.id });
      delete dbUser.password;
      const userPayload = {
        id: dbUser.id,
        email: dbUser.email,
        rol: dbUser.rol,
      };
      const token = this.jwtservice.sign(userPayload);
      return { token, dbUser };
    } catch (error) {
      throw new NotFoundException('No se ha podido registrar el usuario');
    }
  }

  async updateUserById(user: Partial<User> & { imgFile: string }, id: string) {
    try {
      const userFinded = await this.getUserById(id);

      if (!userFinded) return new NotFoundException('Usuario no encontrado');

      await this.userRepository.update(userFinded.id, user);

      return 'El usuario ha sido actualizado con exito';
    } catch (error) {
      throw new NotFoundException('No se ha podido actualizar el usuario');
    }
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
      throw new NotFoundException('No se ha podido registrar el canchero');
    }
  }

  async getUserEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email: email },
        relations: ['sedes', 'turnos'],
      });
    } catch (error) {
      throw new NotFoundException('No existe el usuario registrado');
    }
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
      throw new NotFoundException('No se ha podido aprobar el canchero');
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
      throw new NotFoundException('No se han podido obtener los cancheros');
    }
  }

  async deleteUser(userId) {
    try {
      const user = await this.getUserById(userId);

      if (user.isActive) {
        user.isActive = false;
        await this.userRepository.save(user);
        return 'Usuario deshabilitado correctamente';
      } else {
        user.isActive = true;
        await this.userRepository.save(user);
        return 'Usuario habilitado correctamente';
      }
    } catch (error) {
      throw new NotFoundException('No se ha podido realizar la operación');
    }
  }

  async getRegistroUsuariosEstadistica() {
    try {
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
    } catch (error) {
      throw new NotFoundException('No se han podido obtener las estadísticas');
    }
  }
}
