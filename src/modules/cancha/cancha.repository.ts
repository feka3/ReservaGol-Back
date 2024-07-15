import {
  ConflictException,
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
import { canchaDto, updateCanchaDto } from './cancha.dto';
import { Turno } from '../turno/turno.entity';
import { Status } from '../turno/status.enum';
import { TurnoRepository } from '../turno/turno.repository';
import { TurnoCleanupService } from '../turno/turnClear.service';
import { TurnoGeneratorService } from '../turno/turnoGenerator.service';

@Injectable()
export class CanchaRepository {
  constructor(
    @InjectRepository(Cancha) private canchaRepository: Repository<Cancha>,
    @InjectRepository(Sede) private sedeRepository: Repository<Sede>,
    @InjectRepository(Turno) private turnoRepository: Repository<Turno>,
    private turnoService: TurnoCleanupService,
    private turnoCreateService: TurnoGeneratorService,
  ) {}

  async createCancha(cancha: canchaDto, imgUrl) {
    const sede = await this.sedeRepository.findOne({
      where: { name: cancha.sedeName },
      relations: ['canchas'],
    });
    if (!sede) {
      throw new NotFoundException('Sede no encontrada');
    }
    const canchas = sede.canchas;
    canchas.forEach((c) => {
      if (c.name === cancha.name) {
        throw new HttpException(
          'Cancha ya existente en esta sede',
          HttpStatus.CONFLICT,
        );
      }
    });

    if (imgUrl) {
      cancha.imgUrl = imgUrl;
    }
    const turnos = await this.createTurnos(
      cancha.timeopen,
      cancha.timeclose,
      10,
    );
    await this.turnoRepository.save(turnos);

    const newCancha = this.canchaRepository.create({
      ...cancha,
      sede: sede,
      turnos: turnos,
    });
    newCancha.id;
    const savedCancha = await this.canchaRepository.save(newCancha);
    console.log(turnos);
    return {
      message: 'creada',
      savedCancha,
    };
  }

  async createTurnos(
    timeopen: string,
    timeclose: string,
    days,
  ): Promise<Turno[]> {
    const turnos = [];
    let [openHour, openMinute] = timeopen.split(':').map(Number);
    let [closeHour, closeMinute] = timeclose.split(':').map(Number);
    let today = new Date();
    let horaInicio = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      openHour,
      openMinute,
    );
    let horaFin = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      closeHour,
      closeMinute,
    );
    const duracionTurno = 60 * 60 * 1000;

    for (let dayOffset = 0; dayOffset < days; dayOffset++) {
      let today = new Date();
      today.setDate(today.getDate() + dayOffset); // Incrementa el día actual por el offset
      let horaInicio = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        openHour,
        openMinute,
      );
      let horaFin = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        closeHour,
        closeMinute,
      );

      while (horaInicio.getTime() < horaFin.getTime()) {
        const turno = this.turnoRepository.create({
          date: horaInicio.toISOString().split('T')[0], // YYYY-MM-DD
          time: horaInicio.toISOString().split('T')[1].slice(0, 5), // HH:MM
          status: Status.Libre,
        });
        turnos.push(turno);
        horaInicio = new Date(horaInicio.getTime() + duracionTurno);
      }
    }
    return turnos;
  }

  async getCanchas() {
    return await this.canchaRepository.find({ relations: ['sede', 'turnos'] });
  }

  async getCanchaById(id: string) {
    const cancha = await this.canchaRepository.findOne({
      where: { id: id },
      relations: ['sede', 'turnos'],
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
    const canchaDb = await this.canchaRepository.findOne({
      where: { id: id },
      relations: ['turnos'],
    });
    if (!canchaDb) {
      throw new HttpException('Cancha no encontrada', HttpStatus.NOT_FOUND);
    }
    const arrayTurnoId = canchaDb.turnos
      .filter((turno) => turno.status === Status.Libre)
      .map((turno) => turno.id);
    if (arrayTurnoId.length > 0) {
      await this.turnoService.deleteTurno(arrayTurnoId);
      await this.canchaRepository.update(id, cancha);
      await this.turnoCreateService.genereteTurnosid(id);
      return { message: 'Cancha actualizada' };
    }
  }
  async deleteCancha(id: string) {
    try {
      const cancha = await this.canchaRepository.findOne({
        where: { id: id },
        relations: ['turnos'],
      });
      if (!cancha) {
        throw new NotFoundException(
          `La cancha con id: ${id} no ha sido encontrada`,
        );
      }
      if (cancha.turnos.length === 0) {
        await this.sedeRepository.delete(id);
        return `La cancha : ${cancha.name} ha sido eliminada correctamente`;
      } else {
        throw new ConflictException(
          `La cancha : ${cancha.name} aun tiene turnos disponibles`,
        );
      }
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  async pausarCancha(canchaId: string) {
    const cancha = await this.canchaRepository.findOne({
      where: { id: canchaId },
      relations: ['turnos'],
    });

    if (!cancha) {
      throw new NotFoundException('Cancha no encontrada');
    }

    if (cancha.paused) {
      cancha.paused = false;
      await this.canchaRepository.save(cancha);
      await this.turnoCreateService.genereteTurnosid(cancha.id);
      return {
        message:
          'La cancha ha sido reactivada exitosamente. Se han generado automáticamente nuevos turnos disponibles.',
      };
    } else {
      cancha.paused = true;
      await this.canchaRepository.save(cancha);
      const arrayTurnoId = cancha.turnos
        .filter((turno) => turno.status === Status.Libre)
        .map((turno) => turno.id);
      if (arrayTurnoId.length > 0) {
        return await this.turnoService.deleteTurno(arrayTurnoId);
      }
    }
  }
}
