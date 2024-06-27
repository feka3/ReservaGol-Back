import { Module } from '@nestjs/common';
import { SedeController } from './sede.controller';
import { SedeService } from './sede.service';
import { SedeRepository } from './sede.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sede } from './sede.entity';
import { Cancha } from '../cancha/cancha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sede, Cancha])],
  controllers: [SedeController],
  providers: [SedeService, SedeRepository],
})
export class SedeModule { }
