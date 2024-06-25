import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';

@Module({
  providers: [TurnoService],
  controllers: [TurnoController]
})
export class TurnoModule {}
