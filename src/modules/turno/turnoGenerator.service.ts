import { Repository } from 'typeorm';
import { Turno } from './turno.entity';
import { Cancha } from '../cancha/cancha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Status } from './status.enum';

@Injectable()
export class TurnoGeneratorService {
  constructor(
    @InjectRepository(Turno) private turnoRepository: Repository<Turno>,
    @InjectRepository(Cancha) private canchaRepository: Repository<Cancha>,
  ) {}

  async generateTurnos() {
    const canchas = await this.canchaRepository.find();
    const dates = this.getNext15Days();
    for (const cancha of canchas) {
      const open = parseInt(cancha.timeopen.split(':')[0], 10);
      const close = parseInt(cancha.timeclose.split(':')[0], 10);

      for (const date of dates) {
        for (let i = open; i < close; i++) {
          const turno = this.turnoRepository.create({
            date: date,
            time: `${i < 10 ? '0' + i : i}:00`,
            cancha: cancha,
            status: Status.Libre,
          });

          await this.turnoRepository.save(turno);
        }
      }
    }
    return 'Turnos generados exitosamente';
  }

  private getNext15Days() {
    const dates = [];
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }
}
