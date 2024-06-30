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
import { updateCanchaDto } from './cancha.dto';

@Injectable()
export class CanchaRepository {
  constructor(
    @InjectRepository(Cancha) private canchaRepository: Repository<Cancha>,
    @InjectRepository(Sede) private sedeRepository: Repository<Sede>) {}

  async createCancha(cancha, imgUrl) {
    const sede = await this.sedeRepository.findOne({
      where: { name: cancha.sedeName },
      relations: ['canchas'],
    });
    if (!sede) {
      throw new NotFoundException('Sede no encontrada');
    }
    const canchas = sede.canchas;
    canchas.map((c) => {
      if (c.name === cancha.name && sede.name === cancha.sedeName) {
        throw new HttpException(
          'Cancha ya existente en esta sede',
          HttpStatus.CONFLICT,
        );
      }
    });
    if (imgUrl != null) {
      cancha.imgUrl = imgUrl;
    }

    const canchadb = this.canchaRepository.create({
      ...cancha,
      sede: sede,
    });
    await this.canchaRepository.save(canchadb);
    return 'Cancha creada';
  }
  
  async getCanchas() {
    return await this.canchaRepository.find();
  }

  async getCanchaById(id:string) {
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

  async updateCancha(id: string, cancha: updateCanchaDto) {
    const canchaDb = await this.canchaRepository.findOne({ where: { id: id } });
    if (!canchaDb) {
      throw new HttpException('Cancha no encontrada', HttpStatus.NOT_FOUND);
    }
    await this.canchaRepository.update(id, cancha);
    return 'Cancha actualizada';
  }

  async deleteCancha(id: string) {
    await this.canchaRepository.delete(id);
    return 'Cancha eliminada';
  }
}
