import { Injectable, OnModuleInit } from '@nestjs/common';
import { SedeRepository } from 'src/modules/sede/sede.repository';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly sedeRepository: SedeRepository) {}

  async onModuleInit() {
    await this.sedeRepository.addSedesDefoult();
  }
}