import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancha } from './cancha.entity';
import { Sede } from '../sede/sede.entity';
import { UUID } from 'crypto';
import { updatecanchaDto } from './cancha.dto';

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
      where: { name: cancha.sedeName },
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
  async getCanchaDeporte(deporte: number) {
    return await this.canchaRepository
      .createQueryBuilder('cancha')
      .leftJoinAndSelect('cancha.sede', 'sede')
      .select(['cancha', 'sede.location'])
      .where('cancha.sport = :deporte', { deporte })
      .getMany();
  }
  async updateCancha(id: UUID, cancha: updatecanchaDto) {
    const canchaDb = await this.canchaRepository.findOne({ where: { id: id } });
    if (!canchaDb) {
      throw new HttpException('Cancha not found', HttpStatus.NOT_FOUND);
    }
    console.log('ID:', id);
    console.log('Datos recibidos para actualizar:', cancha);
    await this.canchaRepository.update(id, cancha);
    return 'Cancha updated';
  }

  async deleteCancha(id) {
    await this.canchaRepository.delete(id);
    return 'Cancha deleted';
  }
}
