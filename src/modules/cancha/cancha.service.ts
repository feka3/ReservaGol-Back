import { Injectable } from '@nestjs/common';
import { canchaRepository } from './cancha.repository';

@Injectable()
export class CanchaService {
  constructor(private readonly canchaRepository: canchaRepository) {}

  async getCanchaByid(id) {
    return await this.canchaRepository.getCanchaById(id);
  }
  async getCanchas() {
    return await this.canchaRepository.getCanchas();
  }
  async createCancha(cancha, imgUrl) {
    return await this.canchaRepository.createCancha(cancha, imgUrl);
  }
  async updateCancha(id, cancha) {
    return await this.canchaRepository.updateCancha(id, cancha);
  }
  async deleteCancha(id) {
    return await this.canchaRepository.deleteCancha(id);
  }
}
