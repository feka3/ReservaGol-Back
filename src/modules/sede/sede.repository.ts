import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSedeDto } from './dto/createSede.dto';
import { Sede } from './sede.entity';

@Injectable()
export class SedeRepository {
  constructor(
    @InjectRepository(Sede)
    private sedeRepository: Repository<Sede>,
  ) { }

  async getSedes(): Promise<Sede[]> {
    return await this.sedeRepository.find({
      relations: ['canchas']
    });
  }

  async getSedeById(id: string): Promise<Sede> {
    const sede = await this.sedeRepository.findOne({ where: { id }, relations: ['canchas'] });
    if (!sede) {
      throw new NotFoundException('Sede not found');
    }
    return sede;
  }

  async createSede(sede: CreateSedeDto): Promise<Sede> {
    const newSede = this.sedeRepository.create(sede);
    await this.sedeRepository.save(newSede);
    return newSede;
  }
  async deleteSedeByid(id: string) {
    if (await this.sedeRepository.findOneBy({ id })) {
      await this.sedeRepository.delete(id);
      return `Sede with id ${id} deleted successfully`;
    } else {
      throw new NotFoundException(`Sede with ${id} not found`);
    }
  }
}
