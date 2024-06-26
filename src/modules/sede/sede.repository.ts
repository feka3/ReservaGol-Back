import { Injectable } from '@nestjs/common';
import { Venue } from './sede.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../../common/precarga/sedes.json';
@Injectable()
export class SedeRepository {
  constructor(
    @InjectRepository(Venue)
    private sedeRepository: Repository<Venue>,
  ) { }

  async onModuleInit() {
    if ((await this.sedeRepository.find()).length === 0) {
      await this.addSedesDefault();
    }
  }

  async getSedes() {
    return await this.sedeRepository.find();
  }

  async getSedeById(id) {
    return await this.sedeRepository.findOne({ where: { id: id } });
  }

  async createSede(venue: Venue) {
    await this.sedeRepository.save(venue);
    return 'Sede created';
  }
  async deleteSedeByid(id) {
    await this.sedeRepository.delete(id);
    return 'Sede deleted';
  }

  async addSedesDefault() {
    for (const element of data) {
      await this.sedeRepository
        .createQueryBuilder()
        .insert()
        .into(Venue)
        .values(element)
        .orUpdate(['description', 'location', 'imgUrl'], ['name'])
        .execute();
    }
    return 'Precarga de sedes realizada con exito.';
  }
}
