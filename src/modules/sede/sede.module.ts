import { Module } from '@nestjs/common';
import { SedeController } from './sede.controller';
import { SedeService } from './sede.service';
import { SedeRepository } from './sede.repository';
import { Venue } from './sede.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Venue])],
  controllers: [SedeController],
  providers: [SedeService, SedeRepository],
})
export class SedeModule {}
