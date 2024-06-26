import { Injectable } from '@nestjs/common';
import { Venue } from './sede.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../../common/precarga/sedes.json';
import { UUID } from 'crypto';
import { CreateSedeDto } from './dto/createSede.dto';
@Injectable()
export class SedeRepository {
  constructor(
    @InjectRepository(Venue)
    private sedeRepository: Repository<Venue>,
  ) { }

  // async onModuleInit() {
  //   if ((await this.sedeRepository.find()).length == 0) {
  //     await this.addSedesDefault();
  //   }
  // }

  async getSedes(): Promise<Venue[]> {
    return await this.sedeRepository.find();
  }

  async getSedeById(id: UUID): Promise<Venue> {
    const sede = await this.sedeRepository.findOne({ where: { id }, relations: ['canchas'] });
    if (!sede) {
      throw new Error('Sede not found');
    }
    return sede;
  }

  async createSede(venue: CreateSedeDto): Promise<Venue> {
    const newSede = this.sedeRepository.create(venue);
    await this.sedeRepository.save(newSede);
    return newSede;
  }
  async deleteSedeByid(id) {
    await this.sedeRepository.delete(id);
    return 'Sede deleted';
  }

  //! SI ROMI NO LO UTILIZA SE BORRA
  // async addSedesDefault() {
  //   for (const element of data) {
  //     await this.sedeRepository
  //       .createQueryBuilder()
  //       .insert()
  //       .into(Venue)
  //       .values(element)
  //       .orUpdate(['description', 'location', 'imgUrl'], ['name'])
  //       .execute();
  //   }
  //   return 'Precarga de sedes realizada con exito.';
  // }
}
