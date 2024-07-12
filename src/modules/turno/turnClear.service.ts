import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TurnoGeneratorService } from './turnoGenerator.service';
import { Turno } from './turno.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TurnoCleanupService {
  constructor(
    private readonly turnoService: TurnoGeneratorService,
    @InjectRepository(Turno) private turnoRepository: Repository<Turno>,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.turnoService.deleteOldTurnos();
  }
  async deleteTurno(arrayTurnoId: string[]) {
    await this.turnoRepository.delete(arrayTurnoId);
    return 'Turnos eliminados correctamente';
  }
}
