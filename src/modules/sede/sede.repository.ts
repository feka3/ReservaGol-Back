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
  async getSedes() {
    return await this.sedeRepository.find();
  }
  async createSede(venue: Venue) {
    await this.sedeRepository.save(venue);
    return 'Sede created';
  }
  async deleteSedeByid(id) {
    await this.sedeRepository.delete(id);
    return 'Sede deleted';
  }
  async getSedeById(id) {
    return await this.sedeRepository.findOne({ where: { id: id } });
  }
  async addSedesDefoult() {
    data?.map(async (element) => {
      const venue = new Venue();
      venue.name = element.name;
      venue.location = element.location;
      venue.description = element.description;
      venue.imgUrl = element.imgUrl;

      await this.sedeRepository
        .createQueryBuilder()
        .insert()
        .into(Venue)
        .values(venue)
        .orUpdate(['description', 'location', 'imgUrl'], ['name'])
        .execute();
    });
    return 'sedes cargadas';
  }
}
