import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './turno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [TurnoService],
  controllers: [TurnoController]
})
export class TurnoModule {}
