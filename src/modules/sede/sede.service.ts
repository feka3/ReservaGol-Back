import { Injectable } from '@nestjs/common';
import { SedeRepository } from './sede.repository';
import { Venue } from './sede.entity';

@Injectable()
export class SedeService {
  constructor(private sedeRepository: SedeRepository) { }

  async getSedes() {
    return await this.sedeRepository.getSedes();
  }

  async getSedeById(id) {
    return await this.sedeRepository.getSedeById(id);
  }

  async createSede(venue: Venue) {
    return await this.sedeRepository.createSede(venue);
  }

  async deleteSedeByid(id) {
    return await this.sedeRepository.deleteSedeByid(id);
  }
}
