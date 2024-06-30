import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SedeRepository } from 'src/modules/sede/sede.repository';
import { SeederService } from './seeder.service';
import { Sede } from 'src/modules/sede/sede.entity';
import { canchaRepository } from 'src/modules/cancha/cancha.repository';
import { Cancha } from 'src/modules/cancha/cancha.entity';
import { User } from 'src/modules/user/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';
import { AuthService } from 'src/modules/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sede, Cancha, User])],
  providers: [SedeRepository, canchaRepository, UserRepository, SeederService, AuthService],
})
export class SeederModule { }
