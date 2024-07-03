import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sede } from './sede.entity';

@Injectable()
export class SedeRepository {
  constructor(
    @InjectRepository(Sede) private sedeRepository: Repository<Sede>,
  ) { }

  async getSedes(): Promise<Sede[]> {
    return await this.sedeRepository
      .createQueryBuilder('sede')
      .leftJoinAndSelect('sede.canchas', 'cancha')
      .leftJoinAndSelect('sede.user', 'user')
      .select(['sede', 'cancha', 'user.id']) // Seleccionar solo la ID del usuario
      .getMany();
  }

  async getSedeById(id: string): Promise<Sede> {
    const sede = await this.sedeRepository.findOne({
      where: { id },
      relations: ['canchas'],
    });
    if (!sede) {
      throw new NotFoundException('Sede no encontrada');
    }
    return sede;
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

  async deleteSedeByid(id: string) {
    if (await this.sedeRepository.findOneBy({ id })) {
      await this.sedeRepository.delete(id);
      return `La sede con id: ${id} ha sido eliminada correctamente`;
    } else {
      throw new NotFoundException(`La sede con id: ${id} ha sido encontrada`);
    }
  }
}
