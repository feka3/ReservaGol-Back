import { Injectable } from '@nestjs/common';
import { Court } from './cancha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from '../sede/sede.entity';

@Injectable()
export class canchaRepository {
  constructor(
    @InjectRepository(Court)
    private canchaRepository: Repository<Court>,
    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,
  ) {}
  async createCancha(court) {
    const venue = await this.venueRepository.findOne({
      where: { id: court.venueId },
    });
    console.log(venue);
    console.log(court);
    const courtdb = this.canchaRepository.create({
      ...court,
      venue: venue,
    });
    await this.canchaRepository.save(courtdb);
    return 'Cancha created';
  }
  async getCanchas() {
    return await this.canchaRepository.find();
  }
  async getCanchaById(id) {
    const cancha = await this.canchaRepository.findOne({
      where: { id: id },
      relations: ['venue'],
    });
    return cancha;
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
