import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sede } from './sede.entity';
import { CreateSedeDto, UpdateSedeDto } from './dto/createSede.dto';

@Injectable()
export class SedeRepository {
  constructor(
    @InjectRepository(Sede) private sedeRepository: Repository<Sede>,
  ) { }

  async getSedes(): Promise<Sede[]> {
    try {
      return await this.sedeRepository
        .createQueryBuilder('sede')
        .leftJoinAndSelect('sede.canchas', 'cancha')
        .leftJoinAndSelect('cancha.turnos', 'turnos')
        .leftJoinAndSelect('sede.user', 'user')
        .select(['sede', 'cancha', 'turnos', 'user.id']) // Seleccionar solo la ID del usuario
        .getMany();

    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getSedeById(id: string): Promise<Sede> {
    try {
      const sede = await this.sedeRepository.findOne({
        where: { id },
        relations: ['canchas', 'canchas.turnos', 'user'],
      });
      if (!sede) {
        throw new NotFoundException('Sede no encontrada');
      }
      return sede;

    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async createSede(sede: any & { imgUrl: string }) {
    try {
      const sedeExist = await this.sedeRepository.findOneBy({ name: sede.name });
      if (sedeExist) {
        throw new NotFoundException(`La sede ${sede.name} ya existe`);
      }
      const newSede = this.sedeRepository.create(sede);
      return await this.sedeRepository.save(newSede);

    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateSede(sede: UpdateSedeDto, id: string) {
    try {
      const sedeToUpdate = this.sedeRepository.findOne({ where: { id } });
      if (!sedeToUpdate) {
        throw new NotFoundException(`La sede con id: ${id} no ha sido encontrada`);
      }

      await this.sedeRepository.update(id, sede);
      return "La sede ha sido actualizada correctamente";

    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async deleteSedeByid(id: string) {
    try {
      if (await this.sedeRepository.findOneBy({ id })) {
        await this.sedeRepository.delete(id);
        return `La sede con id: ${id} ha sido eliminada correctamente`;
      } else {
        throw new NotFoundException(`La sede con id: ${id} ha sido encontrada`);
      }

    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
