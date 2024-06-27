import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancha } from './cancha.entity';
import { Sede } from '../sede/sede.entity';

@Injectable()
export class canchaRepository {
  constructor(
    @InjectRepository(Cancha)
    private canchaRepository: Repository<Cancha>,
    @InjectRepository(Sede)
    private sedeRepository: Repository<Sede>,
  ) {}
  async createCancha(cancha, imgUrl) {
    const sede = await this.sedeRepository.findOne({
      where: { id: cancha.sedeId },
    });
    if (!sede) {
      throw new NotFoundException('Sede not found');
    }
    if (imgUrl != null) {
      cancha.imgUrl = imgUrl;
    }
    const canchadb = this.canchaRepository.create({
      ...cancha,
      sede: sede,
    });
    await this.canchaRepository.save(canchadb);
    return 'Cancha created';
  }
  async getCanchas() {
    return await this.canchaRepository.find();
  }
  async getCanchaById(id) {
    const cancha = await this.canchaRepository.findOne({
      where: { id: id },
      relations: ['sede'],
    });
    return cancha;
  }
  async updateCancha(id, cancha: Cancha) {
    await this.canchaRepository.update(id, cancha);
    return 'Cancha updated';
  }
  async deleteCancha(id) {
    await this.canchaRepository.delete(id);
    return 'Cancha deleted';
  }
}
