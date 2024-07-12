import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SedeRepository } from 'src/modules/sede/sede.repository';
import { SeederService } from './seeder.service';
import { Sede } from 'src/modules/sede/sede.entity';
import { CanchaRepository } from 'src/modules/cancha/cancha.repository';
import { Cancha } from 'src/modules/cancha/cancha.entity';
import { User } from 'src/modules/user/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';
import { AuthService } from 'src/modules/auth/auth.service';
import { EmailService } from 'src/modules/email/email.service';
import { TurnoRepository } from 'src/modules/turno/turno.repository';
import { Turno } from 'src/modules/turno/turno.entity';
import { TurnoCleanupService } from 'src/modules/turno/turnClear.service';
import { TurnoGeneratorService } from 'src/modules/turno/turnoGenerator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sede, Cancha, User, Turno])],
  providers: [
    SedeRepository,
    CanchaRepository,
    UserRepository,
    SeederService,
    AuthService,
    EmailService,
    TurnoRepository,
    TurnoCleanupService,
    TurnoGeneratorService,
  ],
})
export class SeederModule {}
