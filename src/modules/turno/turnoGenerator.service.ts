import { Repository, In } from 'typeorm';
import { Turno } from './turno.entity';
import { Cancha } from '../cancha/cancha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Status } from './status.enum';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TurnoGeneratorService {
  constructor(
    @InjectRepository(Turno) private turnoRepository: Repository<Turno>,
    @InjectRepository(Cancha) private canchaRepository: Repository<Cancha>,
  ) {}
  @Cron('0 0 */2 * *')
  async generateTurnos() {
    const canchas = await this.canchaRepository.find();
    const dates = this.getNext10Days();

    const turnosExistentes = await this.turnoRepository.find({
      where: {
        date: In(dates),
      },
    });

    const turnosMap = new Map<string, boolean>();
    for (const turno of turnosExistentes) {
      const key = `${turno.date}-${turno.cancha.id}`;
      turnosMap.set(key, true);
    }

    const newTurnos = [];
    for (const cancha of canchas) {
      const open = parseInt(cancha.timeopen.split(':')[0], 10);
      const close = parseInt(cancha.timeclose.split(':')[0], 10);

      for (const date of dates) {
        const key = `${date}-${cancha.id}`;
        if (turnosMap.has(key)) {
          continue;
        }

        for (let i = open; i < close; i++) {
          const time = `${i < 10 ? '0' + i : i}:00`;
          const turno = {
            date: date,
            time: time,
            cancha: cancha,
            status: Status.Libre,
          };
          newTurnos.push(turno);
        }
      }
    }

    if (newTurnos.length > 0) {
      await this.turnoRepository.save(newTurnos);
    }

    return 'Turnos generados exitosamente';
  }

  private getNext10Days() {
    const dates = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }
}
