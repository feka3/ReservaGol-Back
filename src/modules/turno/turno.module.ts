import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { TurnoRepository } from './turno.repository';
import { User } from '../user/user.entity';
import { Cancha } from '../cancha/cancha.entity';
import { EmailService } from '../email/email.service';
import { TurnoGeneratorService } from './turnoGenerator.service';
import { TurnoCleanupService } from './turnClear.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, User, Cancha])],
  providers: [
    TurnoService,
    TurnoRepository,
    EmailService,
    TurnoGeneratorService,
    TurnoCleanupService,
  ],
  controllers: [TurnoController],
  exports: [TypeOrmModule],
})
export class TurnoModule {}
