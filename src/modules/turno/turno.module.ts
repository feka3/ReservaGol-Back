import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { TurnoRepository } from './turno.repository';
import { User } from '../user/user.entity';
import { Cancha } from '../cancha/cancha.entity';
import { EmailService } from 'src/common/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, User, Cancha])],
  providers: [TurnoService, TurnoRepository, EmailService],
  controllers: [TurnoController]
})
export class TurnoModule {}
