import { Injectable } from '@nestjs/common';
import { SedeRepository } from './sede.repository';
import { CreateSedeDto } from './dto/createSede.dto';

@Injectable()
export class SedeService {
  constructor(private sedeRepository: SedeRepository) { }

  async getSedes() {
    return await this.sedeRepository.getSedes();
  }

  async getSedeById(id: string) {
    return await this.sedeRepository.getSedeById(id);
  }

  async createSede(sede: CreateSedeDto) {
    return await this.sedeRepository.createSede(sede);
  }

  async deleteSedeByid(id: string) {
    return await this.sedeRepository.deleteSedeByid(id);
  }
}
