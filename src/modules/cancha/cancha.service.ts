import { Injectable } from '@nestjs/common';
import { CanchaRepository } from './cancha.repository';
import { updateCanchaDto } from './cancha.dto';

@Injectable()
export class CanchaService {
  constructor(private readonly canchaRepository: CanchaRepository) {}

  async getCanchaByid(id: string) {
    return await this.canchaRepository.getCanchaById(id);
  }

  async getCanchas() {
    return await this.canchaRepository.getCanchas();
  }

  async getCanchaDeporte(deporte: number) {
    return await this.canchaRepository.getCanchaDeporte(deporte);
  }

  async createCancha(cancha, imgUrl) {
    return await this.canchaRepository.createCancha(cancha, imgUrl);
  }

  async updateCancha(id: string, cancha: updateCanchaDto) {
    return await this.canchaRepository.updateCancha(id, cancha);
  }

  async deleteCancha(id: string) {
    return await this.canchaRepository.deleteCancha(id);
  }
  async pausarCancha(canchaId: string) {
    return await this.canchaRepository.pausarCancha(canchaId);
  }
}
