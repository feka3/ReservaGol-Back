import { Injectable } from '@nestjs/common';
import { Court } from './cancha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class canchaRepository {
  constructor(
    @InjectRepository(Court)
    private canchaRepository: Repository<Court>,
  ) {}
  async createCancha(court: Court) {
    const courtdb = this.canchaRepository.create({
      ...court,
      venue: court.venue,
    });
    await this.canchaRepository.save(courtdb);
    return 'Cancha created';
  }
  async getCanchas() {
    return await this.canchaRepository.find();
  }
  async getCanchaById(id) {
    return await this.canchaRepository.findOne({
      where: { id: id },
      relations: ['venue'],
    });
  }
  async updateCancha(id, cancha: Court) {
    await this.canchaRepository.update(id, cancha);
    return 'Cancha updated';
  }
  async deleteCancha(id) {
    await this.canchaRepository.delete(id);
    return 'Cancha deleted';
  }
}
