import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SedeRepository } from 'src/modules/sede/sede.repository';
import { SeederService } from './seeder.service';
import { Sede } from 'src/modules/sede/sede.entity';
import { canchaRepository } from 'src/modules/cancha/cancha.repository';
import { Cancha } from 'src/modules/cancha/cancha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sede, Cancha])],
  providers: [SedeRepository, canchaRepository, SeederService],
})
export class SeederModule { }
