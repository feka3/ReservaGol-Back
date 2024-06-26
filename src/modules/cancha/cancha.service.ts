import { Injectable } from '@nestjs/common';
import { canchaRepository } from './cancha.repository';

@Injectable()
export class CanchaService {
  constructor(private readonly canchaRepository: canchaRepository) {}

  async getCanchaByid(id) {
    return await this.canchaRepository.getCanchaById(id);
  }
}
