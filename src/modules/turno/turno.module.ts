import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { TurnoRepository } from './turno.repository';
import { User } from '../user/user.entity';
import { Cancha } from '../cancha/cancha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, User, Cancha])],
  providers: [TurnoService, TurnoRepository],
  controllers: [TurnoController]
})
export class TurnoModule {}
