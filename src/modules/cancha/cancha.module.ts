import { Module } from '@nestjs/common';
import { CanchaController } from './cancha.controller';
import { CanchaService } from './cancha.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanchaRepository } from './cancha.repository';
import { Cancha } from './cancha.entity';
import { Sede } from '../sede/sede.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { SedeRepository } from '../sede/sede.repository';
import { TurnoRepository } from '../turno/turno.repository';
import { Turno } from '../turno/turno.entity';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.entity';
import { EmailService } from '../email/email.service';
import { TurnoCleanupService } from '../turno/turnClear.service';
import { TurnoGeneratorService } from '../turno/turnoGenerator.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cancha, Sede, Turno, User]),
    CloudinaryModule,
  ],
  controllers: [CanchaController],
  providers: [
    CanchaService,
    CanchaRepository,
    TurnoRepository,
    UserRepository,
    EmailService,
    TurnoCleanupService,
    TurnoGeneratorService,
  ],
  exports: [TypeOrmModule],
})
export class CanchaModule {}
