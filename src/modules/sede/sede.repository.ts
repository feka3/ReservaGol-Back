import { Injectable, NotFoundException } from '@nestjs/common';
import { Venue } from './sede.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSedeDto } from './dto/createSede.dto';

@Injectable()
export class SedeRepository {
  constructor(
    @InjectRepository(Venue)
    private sedeRepository: Repository<Venue>,
  ) { }

  async getSedes(): Promise<Venue[]> {
    return await this.sedeRepository.find({
      relations: ['courts']
    });
  }

  async getSedeById(id: string): Promise<Venue> {
    const sede = await this.sedeRepository.findOne({ where: { id }, relations: ['courts'] });
    if (!sede) {
      throw new NotFoundException('Sede not found');
    }
    return sede;
  }

  async createSede(venue: CreateSedeDto): Promise<Venue> {
    const newSede = this.sedeRepository.create(venue);
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
