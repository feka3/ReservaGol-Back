import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TurnoGeneratorService } from './turnoGenerator.service';

@Injectable()
export class TurnoCleanupService {
  constructor(private readonly turnoService: TurnoGeneratorService) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.turnoService.deleteOldTurnos();
  }
}
