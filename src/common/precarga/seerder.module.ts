import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SedeRepository } from 'src/modules/sede/sede.repository';
import { SeederService } from './seeder.service';
import { Sede } from 'src/modules/sede/sede.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sede])],
  providers: [SedeRepository, SeederService],
})
export class SeederModule { }
