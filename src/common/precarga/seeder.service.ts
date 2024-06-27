import { Injectable, OnModuleInit } from '@nestjs/common';
import { SedeRepository } from 'src/modules/sede/sede.repository';
import * as data from '../../common/precarga/data.json';


@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly sedeRepository: SedeRepository) {}

  async onModuleInit() {
    await this.seedSedes();
  }

  async seedSedes() {
    for (const element of data) {
      await this.sedeRepository.createSede({
        name: element.name,
        location: element.location,
        description: element.description,
        imgUrl: element.imgUrl
      })
    }
    return 'Precarga de sedes realizada con exito.';
  }

}