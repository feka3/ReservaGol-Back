import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from 'src/modules/sede/sede.entity';
import { SedeRepository } from 'src/modules/sede/sede.repository';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Venue])],
  providers: [SedeRepository, SeederService],
})
export class SeederModule {}
