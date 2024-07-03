import { Injectable } from '@nestjs/common';
import { SedeRepository } from './sede.repository';
import { CreateSedeDto, UpdateSedeDto } from './dto/createSede.dto';

@Injectable()
export class SedeService {
  constructor(private sedeRepository: SedeRepository) { }

  async getSedes() {
    return await this.sedeRepository.getSedes();
  }

  async getSedeById(id: string) {
    return await this.sedeRepository.getSedeById(id);
  }

  async createSede(sede: CreateSedeDto & { imgUrl: string }) {
    return await this.sedeRepository.createSede(sede);
  }

  async updateSede(sede: UpdateSedeDto & { imgUrl: string }, id: string) {
    return await this.sedeRepository.updateSede(sede, id);
  }

  async deleteSedeByid(id: string) {
    return await this.sedeRepository.deleteSedeByid(id);
  }
}
