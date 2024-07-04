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

@Module({
  imports: [TypeOrmModule.forFeature([Sede, Cancha, User])],
  providers: [SedeRepository, CanchaRepository, UserRepository, SeederService, AuthService, EmailService],
})
export class SeederModule { }
