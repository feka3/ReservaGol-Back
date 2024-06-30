import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sede } from './sede.entity';
import { User } from '../user/user.entity';
import { CreateSedeDto } from './dto/createSede.dto';

@Injectable()
export class SedeRepository {
  constructor(
    @InjectRepository(Sede) private sedeRepository: Repository<Sede>,
  ) {}

  async getSedes(): Promise<Sede[]> {
    return await this.sedeRepository.find({
      relations: ['canchas'],
    });
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

  
  async createSede(sede:any & { imgUrl: string }) {
    const newSede = this.sedeRepository.create(sede);
    return await this.sedeRepository.save(newSede);
  }

  async deleteSedeByid(id: string) {
    if (await this.sedeRepository.findOneBy({ id })) {
      await this.sedeRepository.delete(id);
      return `La sede con id: ${id} ha sido eliminada correctamente`;
    } else {
      throw new NotFoundException(`Sede with ${id} not found`);
    }
  }
}
