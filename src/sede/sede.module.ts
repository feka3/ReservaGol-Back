import { Module } from '@nestjs/common';
import { SedeController } from './sede.controller';
import { SedeService } from './sede.service';

@Module({
  controllers: [SedeController],
  providers: [SedeService]
})
export class SedeModule {}
