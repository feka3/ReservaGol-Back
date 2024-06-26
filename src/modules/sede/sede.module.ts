import { Module } from '@nestjs/common';
import { SedeController } from './sede.controller';
import { SedeService } from './sede.service';
import { SedeRepository } from './sede.repository';
import { Venue } from './sede.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from '../cancha/cancha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venue, Court])],
  controllers: [SedeController],
  providers: [SedeService, SedeRepository],
})
export class SedeModule { }
